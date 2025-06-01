'use client'

import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const workExperience = [
    {
        id: 1,
        company: 'ZtoA Group',
        position: 'Full Stack Developer',
        period: 'Jan 2022 - June 2025',
        responsibilities: [
            'Developed web applications using WordPress, Next.js, and various frameworks including styling frameworks (Tailwind CSS) and component libraries (shadcn)',
            'Built mobile applications using React Native (Expo) with modern styling frameworks and component libraries',
            'Collaborated in team environments to design UI/UX and develop backend APIs to meet project requirements',
            'Implemented AI features including chatbot integrations in web and mobile applications',
            'Deployed and hosted websites using Cloudflare + Vercel with custom domain configuration',
            'Managed source code version control using Git with GitHub/Bitbucket'
        ],
        technologies: [
            'WordPress',
            'Next.js',
            'React Native',
            'Expo',
            'Tailwind CSS',
            'shadcn',
            'Node.js',
            'Git',
            'GitHub',
            'Bitbucket',
            'Cloudflare',
            'Vercel',
            'AI Integration'
        ]
    }
];

export default function WorkExperienceSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Work Experience</h2>
            <div className="space-y-8">
                {workExperience.map((job) => (
                    <motion.div
                        key={job.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="relative pl-8 pb-2 border-l-2 border-purple-500 group"
                    >
                        <div className="absolute w-4 h-4 rounded-full bg-purple-500 -left-2 top-1 group-hover:scale-150 transition-transform"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <h3 className="text-xl font-bold">{job.company}</h3>
                            <span className="hidden sm:block">•</span>
                            <p className="text-gray-600 dark:text-gray-400">{job.position}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{job.period}</p>

                        <ul className="space-y-3 mb-6">
                            {job.responsibilities.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-purple-500 mr-2 mt-1">•</span>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm md:text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* <div>
                            <h4 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-blue-100 dark:bg-gray-700 text-sm rounded-full flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div> */}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}