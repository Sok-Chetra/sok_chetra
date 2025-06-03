'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/form/ContactForm';


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3, // Added initial delay before animation starts
        },
    },
};

const itemVariants = {
    hidden: {
        y: 30,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6, // Slightly longer duration
            ease: "easeOut", // Smoother easing
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
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }} // 👈 fast fade-in
                        viewport={{ once: true }}
                    >
                        Send Me a Message
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Have a question or want to work together? Fill out the form below and I will get back to you as soon as possible.
                    </motion.p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ContactForm />
                </motion.div>
            </div>
        </motion.section>
    );
}