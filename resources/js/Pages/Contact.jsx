import Title from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    PiMapPinLight,
    PiPhoneLight,
    PiEnvelopeOpenThin,
    PiClockThin,
} from "react-icons/pi";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <>
            <Head title="Hubungi Kami" />
            <GuestLayout>
                <div className="bg-[#222] text-white">
                    <div className="w-9/12 mx-auto flex flex-col justify-center items-center py-20">
                        <Title>Hubungi Kami</Title>
                        <div className="grid grid-cols-4 grid-rows-none gap-5">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="grid grid-rows-3 grid-cols-none place-items-center"
                            >
                                <PiMapPinLight size={60} />
                                <h2 className="font-caudex text-2xl">Lokasi</h2>
                                <a
                                    href="https://maps.app.goo.gl/behGgJ2wZos7nQ5j9"
                                    target="_blank"
                                    className="text-center text-base text-stone-400 font-lato place-self-start justify-self-center tracking-widest"
                                >
                                    Jalan Bypass Ngurah Rai, Jimbaran, Badung
                                </a>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="grid grid-rows-3 grid-cols-none place-items-center"
                            >
                                <PiPhoneLight size={60} />
                                <h2 className="font-caudex text-2xl">Kontak</h2>
                                <a
                                    href="tel:+6281353427277"
                                    target="_blank"
                                    className="text-center text-base text-stone-400 font-lato place-self-start justify-self-center tracking-widest"
                                >
                                    +(62) 813 5342 7277
                                </a>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="grid grid-rows-3 grid-cols-none place-items-center"
                            >
                                <PiEnvelopeOpenThin size={60} />
                                <h2 className="font-caudex text-2xl">Email</h2>
                                <a
                                    href="mailto:monumenppkri1945@gmail.com"
                                    target="_blank"
                                    className="text-center text-base text-stone-400 font-lato place-self-start justify-self-center tracking-widest"
                                >
                                    monumenppkri1945@gmail.com
                                </a>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="grid grid-rows-3 grid-cols-none place-items-center"
                            >
                                <PiClockThin size={60} />
                                <h2 className="font-caudex text-2xl">
                                    Waktu Buka
                                </h2>
                                <p className="text-center text-base text-stone-400 font-lato place-self-start justify-self-center tracking-widest">
                                    Senin - Jumat 08:00 - 17:00
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Contact;
