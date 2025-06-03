'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/form/ContactForm';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export default function ContactFormSection() {
    return (
        <motion.section
            className="py-16 px-1.5 lg:px-8 bg-white dark:bg-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <div className="max-w-4xl mx-auto ">
                <motion.div className="text-center mb-12 px-4 sm:px-6" variants={itemVariants}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Send Me a Message</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Have a question or want to work together? Fill out the form below and I will get back to you as soon as possible.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ContactForm />
                </motion.div>
            </div>
        </motion.section>
    );
}