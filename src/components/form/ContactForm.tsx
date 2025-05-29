'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = process.env.RECAPTCHA_SITE_KEY || ''

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        status: 'idle' | 'success' | 'error'
        message?: string
    }>({ status: 'idle' })

    const ref = useRef(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ status: 'idle' })

        if (!captchaToken) {
            setSubmitStatus({ status: 'error', message: 'Please complete the CAPTCHA.' })
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('https://sok-chetra.me/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ ...formData, captcha: captchaToken }),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to send message')
            }

            setSubmitStatus({ status: 'success', message: 'Message sent successfully!' })
            setFormData({ name: '', email: '', message: '' })
            setCaptchaToken(null)
        } catch (error) {
            setSubmitStatus({
                status: 'error',
                message: error instanceof Error ? error.message : 'Failed to send message',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token)
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    ref={ref}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-3xl sm:text-4xl font-bold mb-12 text-center dark:text-white"
                >
                    Get In Touch
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300"
                >
                    {submitStatus.status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-600 dark:text-gray-300">{submitStatus.message}</p>
                            <button
                                onClick={() => setSubmitStatus({ status: 'idle' })}
                                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {submitStatus.status === 'error' && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                                    {submitStatus.message}
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                />
                            </div>

                            {/* reCAPTCHA widget */}
                            <ReCAPTCHA
                                sitekey={SITE_KEY}
                                onChange={handleCaptchaChange}

                            />

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !captchaToken}
                                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
