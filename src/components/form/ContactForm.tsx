"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import FormField from "./FormField";
import { sendContactForm } from "@/lib/api/sendContactForm";
import { getRecaptchaSiteKey } from "@/lib/recaptcha";

/**
 * Loaded on demand. The reCAPTCHA widget pulls ~347KB across two sequential
 * Google requests; mounting it eagerly made every visitor pay for it,
 * including on the home page where most never touch the form.
 *
 * Loading is warmed when the form nears the viewport rather than waiting for
 * a field interaction — measured cold, the widget needs ~570ms to appear, long
 * enough to read as a broken box if it starts once the visitor is already
 * typing. The form sits 1.2-2.5 screens below the fold on both pages that
 * render it, so scrolling is still a real signal of intent: a visitor who
 * never reaches it never pays, and neither does Lighthouse, which does not
 * scroll.
 */
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const SITE_KEY = getRecaptchaSiteKey();

const EMPTY_FORM = { name: "", email: "", message: "" };

type SubmitState =
    | { status: "idle" }
    | { status: "sending" }
    | { status: "success" }
    | { status: "error"; message: string };

export default function ContactForm() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
    const [captchaRequested, setCaptchaRequested] = useState(false);
    const [captchaReady, setCaptchaReady] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    /** Idempotent — the state setter short-circuits once already true. */
    const requestCaptcha = () => setCaptchaRequested(true);

    // Begin fetching before the form is actually on screen, so the widget is
    // usually in place by the time the visitor reaches the fields.
    useEffect(() => {
        const form = formRef.current;
        if (!form) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                setCaptchaRequested(true);
                observer.disconnect();
            },
            { rootMargin: "400px" }
        );

        observer.observe(form);
        return () => observer.disconnect();
    }, []);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!captchaToken) {
            setSubmit({ status: "error", message: "Please complete the CAPTCHA." });
            return;
        }

        setSubmit({ status: "sending" });

        try {
            await sendContactForm({ ...formData, captcha: captchaToken });
            setSubmit({ status: "success" });
            setFormData(EMPTY_FORM);
            setCaptchaToken(null);
        } catch (error) {
            setSubmit({
                status: "error",
                message: error instanceof Error ? error.message : "Failed to send message",
            });
        }
    };

    if (submit.status === "success") {
        return <SuccessPanel onReset={() => setSubmit({ status: "idle" })} />;
    }

    const isSending = submit.status === "sending";

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            /**
             * Any engagement with the form is the cue to fetch the CAPTCHA.
             * Focus alone is not enough: a visitor can focus a field before
             * hydration attaches the handler, in which case the focus event is
             * missed entirely. Keyboard and pointer input cover that race.
             */
            onFocusCapture={requestCaptcha}
            onPointerDownCapture={requestCaptcha}
            onKeyDownCapture={requestCaptcha}
            className="space-y-6"
        >
            {/* Announced to screen readers the moment a submission fails. */}
            <div role="status" aria-live="polite">
                {submit.status === "error" && (
                    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {submit.message}
                    </p>
                )}
            </div>

            <FormField
                id="name"
                name="name"
                label="Name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <FormField
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <FormField
                as="textarea"
                id="message"
                name="message"
                label="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
            />

            {/* Height reserved so the widget appearing causes no layout shift. */}
            <div className="relative min-h-[78px]">
                {/* Stand-in for the ~570ms before Google's iframe paints, so the
                    reserved space reads as loading rather than as broken. */}
                {!captchaReady && (
                    <div
                        aria-hidden
                        className="flex h-[78px] w-[304px] max-w-full items-center gap-3 rounded border border-gray-200 bg-gray-50 px-4 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <span className="h-7 w-7 animate-pulse rounded-sm bg-gray-200 dark:bg-gray-700" />
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                            Loading verification…
                        </span>
                    </div>
                )}

                {captchaRequested && (
                    <div className={captchaReady ? undefined : "absolute inset-0 opacity-0"}>
                        <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={setCaptchaToken}
                            size="normal"
                            asyncScriptOnLoad={() => setCaptchaReady(true)}
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isSending || !captchaToken}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
                {isSending ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
    return (
        <div className="py-8 text-center" role="status" aria-live="polite">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                    aria-hidden
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Message Sent!</h3>
            <p className="text-gray-600 dark:text-gray-300">
                Thanks for reaching out — I&apos;ll get back to you as soon as possible.
            </p>

            <button
                onClick={onReset}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
                Send Another Message
            </button>
        </div>
    );
}
