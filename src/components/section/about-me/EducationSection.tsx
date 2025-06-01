'use client';

import { motion } from 'framer-motion';
import { educationData } from '@/lib/constants/education';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function EducationSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Education</h2>

            <div className="space-y-6">
                {educationData.map((edu) => (
                    <motion.div
                        key={edu.id}
                        variants={fadeIn}
                        className={`pl-4 border-l-4 ${edu.borderColor}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="md:text-xl mt-1">{edu.icon}</span>
                            <div>
                                <h3 className="md:text-xl font-semibold">{edu.degree}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                    {edu.status}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}