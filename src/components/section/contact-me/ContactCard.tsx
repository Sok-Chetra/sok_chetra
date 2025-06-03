import { motion } from 'framer-motion';
import { useState } from 'react';
import QrModal from './QrModal';
// import Image from 'next/image';

const cardVariants = {
    offscreen: {
        y: 100,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 1
        }
    }
};

const ContactCard = ({ icon, title, link, linkTitle, qrCode, isPhone = false }: {
    icon: React.ReactNode,
    title: string,
    link: string,
    linkTitle?: string;
    qrCode?: string,
    isPhone?: boolean
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={cardVariants}
            >
                <div className="p-6">
                    <div className="flex justify-center items-center mb-4">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                            {icon}
                        </div>
                    </div>

                    {/* {qrCode && (
                        <div
                            className="mb-4 flex justify-center cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Image
                                src={qrCode}
                                alt={`${title} QR Code`}
                                width={120}
                                height={120}
                                className="border border-gray-200 dark:border-gray-600 rounded"
                            />
                        </div>
                    )} */}

                    {isPhone ? (
                        <div className='flex justify-center'>
                            <a href={`tel:${link.replace(/\s+/g, '')}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-lg">
                                {linkTitle || link}
                            </a>
                        </div>
                    ) : (
                        <div className="text-center overflow-hidden">
                            <a
                                href={link.startsWith('http') ? link : `https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 break-words whitespace-pre-wrap"
                            >
                                {linkTitle || link}
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>

            {qrCode && (
                <QrModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    qrCode={qrCode}
                    title={title}
                />
            )}
        </>
    );
};

export default ContactCard;
