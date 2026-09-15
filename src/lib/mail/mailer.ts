import nodemailer from "nodemailer";

/**
 * Created once per server instance rather than per request, so the SMTP
 * connection pool is reused across submissions.
 */
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
    transporter ??= nodemailer.createTransport({
        service: "gmail",
        pool: true,
        auth: {
            user: process.env.SMTP_GMAIL_USER,
            pass: process.env.SMTP_GMAIL_APP_PASSWORD,
        },
    });

    return transporter;
}

/** Strips CR/LF so user input can never inject extra mail headers. */
function headerSafe(value: string): string {
    return value.replace(/[\r\n]+/g, " ").trim();
}

export type SendMailInput = {
    to: string;
    subject: string;
    html: string;
    /** The visitor's address — used for Reply-To, never for From. */
    replyToEmail: string;
    replyToName: string;
};

export async function sendMail({
    to,
    subject,
    html,
    replyToEmail,
    replyToName,
}: SendMailInput): Promise<{ success: boolean; error?: string }> {
    const sender = process.env.SMTP_GMAIL_USER;

    if (!sender) {
        return { success: false, error: "Mail sender is not configured." };
    }

    try {
        await getTransporter().sendMail({
            /**
             * From must be the authenticated mailbox. Putting the visitor's
             * address here (the previous behaviour) fails SPF/DKIM alignment,
             * so the message gets spam-filtered or rejected outright.
             */
            from: `"${headerSafe(replyToName)} via portfolio" <${sender}>`,
            to,
            subject: headerSafe(subject),
            html,
            // Replying in the mail client goes straight back to the visitor.
            replyTo: `"${headerSafe(replyToName)}" <${headerSafe(replyToEmail)}>`,
        });

        return { success: true };
    } catch (error) {
        console.error("SendMail error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}
