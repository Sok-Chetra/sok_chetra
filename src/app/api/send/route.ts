// app/api/contact/route.ts
import { sendMail } from '@/lib/mail/mailer'
import { NextResponse } from 'next/server'

async function verifyCaptcha(token: string | null): Promise<boolean> {
    if (!token) return false

    // Get secret key from environment variables (not public)
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || ''
    if (!secretKey) {
        console.error('reCAPTCHA secret key is not configured.')
        return false
    }

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
            }
        )

        if (!response.ok) {
            console.error('reCAPTCHA verification request failed')
            return false
        }

        const data = await response.json()

        // For reCAPTCHA v3, you might want to check the score
        const isV3 = data.score !== undefined
        if (isV3) {
            return data.success && data.score >= 0.5 // Adjust threshold as needed
        }

        // For reCAPTCHA v2
        return data.success === true
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error)
        return false
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, message, captcha } = body

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Validate captcha
        if (!captcha) {
            return NextResponse.json(
                { success: false, error: 'Captcha token is required' },
                { status: 400 }
            )
        }

        const isCaptchaValid = await verifyCaptcha(captcha)
        if (!isCaptchaValid) {
            return NextResponse.json(
                { success: false, error: 'Captcha verification failed' },
                { status: 400 }
            )
        }

        // Sanitize inputs
        const sanitize = (str: string) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
        const sanitizedName = sanitize(name)
        const sanitizedEmail = sanitize(email)
        const sanitizedMessage = sanitize(message)

        const html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage}</p>
        `

        const result = await sendMail({
            to: process.env.CONTACT_FORM_RECIPIENT || process.env.SMTP_GMAIL_USER || '',
            subject: `New message from ${sanitizedName} - Portfolio Contact`,
            html,
            fromEmail: sanitizedEmail,
            fromName: sanitizedName,
        })

        if (!result.success) {
            console.error('Email sending failed:', result.error)
            return NextResponse.json(
                { success: false, error: result.error || 'Failed to send email' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error in contact API:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}