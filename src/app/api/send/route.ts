import { NextResponse } from "next/server";

import { sendMail } from "@/lib/mail/mailer";
import { TEST_SECRET_KEY, useTestKeys } from "@/lib/recaptcha";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 100, email: 254, message: 5000 } as const;

/** Escapes the five HTML-significant characters, not just angle brackets. */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/**
 * Resolves the verification secret. In development this falls back to Google's
 * test secret so the form works on localhost without registering a domain; a
 * production build never reaches that branch (see `useTestKeys`).
 */
function resolveSecretKey(): string | null {
    // Must mirror getRecaptchaSiteKey(): a token minted by the test site key
    // only validates against the test secret, so both sides switch together.
    if (useTestKeys) return TEST_SECRET_KEY;

    return process.env.RECAPTCHA_SECRET_KEY ?? null;
}

async function verifyCaptcha(token: string): Promise<boolean> {
    const secretKey = resolveSecretKey();

    if (!secretKey) {
        // Fail closed: a missing secret in production must reject, never allow.
        console.error("RECAPTCHA_SECRET_KEY is not configured — rejecting submission.");
        return false;
    }

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret: secretKey, response: token }),
        });

        if (!response.ok) {
            console.error("reCAPTCHA verification request failed");
            return false;
        }

        const data = await response.json();

        // v3 returns a score; v2 only returns success.
        if (typeof data.score === "number") {
            return data.success === true && data.score >= 0.5;
        }

        return data.success === true;
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        return false;
    }
}

function badRequest(error: string) {
    return NextResponse.json({ success: false, error }, { status: 400 });
}

export async function POST(request: Request) {
    try {
        const { name, email, message, captcha } = await request.json();

        if (!name || !email || !message) {
            return badRequest("All fields are required");
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof message !== "string"
        ) {
            return badRequest("Invalid field types");
        }

        if (
            name.length > MAX_LENGTHS.name ||
            email.length > MAX_LENGTHS.email ||
            message.length > MAX_LENGTHS.message
        ) {
            return badRequest("One or more fields exceed the maximum length");
        }

        if (!EMAIL_PATTERN.test(email)) {
            return badRequest("Invalid email format");
        }

        if (!captcha || typeof captcha !== "string") {
            return badRequest("Captcha token is required");
        }

        if (!(await verifyCaptcha(captcha))) {
            return badRequest("Captcha verification failed");
        }

        const html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `;

        const result = await sendMail({
            to: process.env.CONTACT_FORM_RECIPIENT || process.env.SMTP_GMAIL_USER || "",
            subject: `New message from ${escapeHtml(name)} - Portfolio Contact`,
            html,
            replyToEmail: email,
            replyToName: name,
        });

        if (!result.success) {
            console.error("Email sending failed:", result.error);
            return NextResponse.json(
                { success: false, error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in contact API:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
