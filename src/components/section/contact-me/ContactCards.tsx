'use client';

import { motion } from 'framer-motion'
import { FaLinkedin, FaTelegramPlane, FaWhatsapp, FaPhone } from 'react-icons/fa';
import ContactCard from './ContactCard';

export default function ContactCards() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <ContactCard
                        icon={<FaLinkedin size={24} />}
                        title="LinkedIn"
                        link="https://www.linkedin.com/in/sok-chetra/"
                        linkTitle='Sok Chetra'
                    />

                    <ContactCard
                        icon={<FaTelegramPlane size={24} />}
                        title="Telegram"
                        link="https://t.me/tra_6"
                        linkTitle='@tra_6'
                        qrCode="/telegram-qr.jpeg"
                    />

                    <ContactCard
                        icon={<FaWhatsapp size={24} />}
                        title="WhatsApp"
                        link="https://wa.me/85589450486"
                        linkTitle='+855 89 450 486'
                        qrCode="/whatsapp-qr.jpeg"
                    />

                    <ContactCard
                        icon={<FaPhone size={24} />}
                        title="Phone"
                        link="+855 89 450 486"
                        isPhone={true}
                    />
                </motion.div>
            </div>
        </section>
    );
}