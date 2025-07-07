// lib/mail/mailer.ts
import nodemailer from 'nodemailer'


export async function sendMail({
    to,
    subject,
    html,
    fromEmail,
    fromName,
}: {
    to: string
    subject: string
    html: string
    fromEmail: string
    fromName: string
}): Promise<{ success: boolean; error?: string }> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_GMAIL_USER,
                pass: process.env.SMTP_GMAIL_APP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`, // <- from user input
            to: to,
            subject,
            html,
            replyTo: fromEmail, // <- helps you reply directly
        })

        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('SendMail error:', error)
            return { success: false, error: error.message }
        } else {
            // If it's not an Error object (rare, but possible)
            console.error('SendMail unknown error:', error)
            return { success: false, error: 'Unknown error occurred' }
        }
    }

}

