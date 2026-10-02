"use server";

import { sendMail } from "@/lib/mail/mailer";
import { TEST_SECRET_KEY, useTestKeys } from "@/lib/recaptcha";

/**
 * The contact form's submission, as a Server Action.
 *
 * It replaces a Route Handler at /api/send that the form reached with a
 * hand-written fetch. As an action the form calls it directly and React tracks
 * the pending and error states, and Next checks that each request's Origin
 * matches the Host before it runs — a cross-site check the Route Handler never
 * had. That is no substitute for the checks below, though: an action is still
 * a public POST endpoint, so every field is validated and the CAPTCHA verified
 * here, on the server, regardless of what the form already enforced.
 *
 * There is deliberately no sign-in check. A contact form is meant to be open
 * to anyone; the CAPTCHA is what stands between it and abuse.
 */

export type ContactState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; message: string };

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

const fail = (message: string): ContactState => ({ status: "error", message });

export async function sendContactMessage(
    _previous: ContactState,
    formData: FormData
): Promise<ContactState> {
    try {
        // FormData values are strings or Files; anything that is not a string
        // did not come from this form's fields.
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");
        const captcha = formData.get("captcha");

        if (!name || !email || !message) {
            return fail("All fields are required");
        }

        if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
            return fail("Invalid field types");
        }

        if (
            name.length > MAX_LENGTHS.name ||
            email.length > MAX_LENGTHS.email ||
            message.length > MAX_LENGTHS.message
        ) {
            return fail("One or more fields exceed the maximum length");
        }

        if (!EMAIL_PATTERN.test(email)) {
            return fail("Invalid email format");
        }

        if (!captcha || typeof captcha !== "string") {
            return fail("Please complete the CAPTCHA.");
        }

        if (!(await verifyCaptcha(captcha))) {
            return fail("Captcha verification failed");
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
            return fail("Failed to send message. Please try again.");
        }

        return { status: "success" };
    } catch (error) {
        console.error("Error in contact action:", error);
        return fail("Failed to send message. Please try again.");
    }
}
