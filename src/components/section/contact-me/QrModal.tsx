'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function QrModal({
    isOpen,
    onClose,
    qrCode,
    title
}: {
    isOpen: boolean;
    onClose: () => void;
    qrCode: string;
    title: string;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold dark:text-white">{title} QR Code</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <Image
                                src={qrCode}
                                alt={`${title} QR Code`}
                                width={300}
                                height={300}
                                className="border border-gray-200 dark:border-gray-600 rounded"
                            />
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            Scan this QR code with your device
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}