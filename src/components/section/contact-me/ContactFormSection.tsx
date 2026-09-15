import ContactForm from "@/components/form/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { staggerContainer, staggerItem } from "@/lib/animations";

/**
 * Server component wrapper — the heading and copy ship as HTML; only the form
 * itself (which owns state and the CAPTCHA) is client side.
 */
export default function ContactFormSection() {
    return (
        <Reveal
            as="section"
            variants={staggerContainer}
            className="bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-900"
            aria-labelledby="contact-form-heading"
        >
            <div className="mx-auto max-w-4xl">
                <Reveal variants={staggerItem} className="px-4 text-center sm:px-6">
                    <h2
                        id="contact-form-heading"
                        className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
                    >
                        Send Me a Message
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Have a question or want to work together? Fill out the form below and I will
                        get back to you as soon as possible.
                    </p>
                </Reveal>

                <Reveal
                    variants={staggerItem}
                    className="mt-8 rounded-xl bg-gray-50 p-4 shadow-md transition-colors duration-300 xs:p-6 sm:p-8 dark:bg-gray-800"
                >
                    <ContactForm />
                </Reveal>
            </div>
        </Reveal>
    );
}
