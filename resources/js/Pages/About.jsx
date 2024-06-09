import Title from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { motion } from "framer-motion";
import chartImg from "../../../public/assets/image/org-chart.svg";

const About = () => {
    return (
        <>
            <Head title="Tentang Kami" />
            <GuestLayout>
                <div className="bg-[#222] text-white">
                    <div className="w-9/12 mx-auto flex flex-col justify-center items-center py-20">
                        <Title>Tentang Monumen PPKRI 1945</Title>
                        <div className="flex flex-col gap-3 font-caudex text-lg text-center">
                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                Semuanya berawal dari kedatangan Belanda pada 20
                                November 1946 untuk menaklukkan Bali. Pada saat
                                itu, sebenarnya Indonesia telah merdeka pada
                                tanggal 17 Agustus 1945. Namun Belanda tidak
                                terima akan kemerdekaan tersebut dan tidak mau
                                mengakui kemerdekaan Indonesia. Akhirnya Belanda
                                melakukan penaklukan kembali pada daerah-daerah
                                di Indonesia termasuk Bali.
                            </motion.p>
                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                Pada saat itu Belanda mendapat bantuan dari
                                pasukan NICA. Namun pahlawan perjuangan yang ada
                                di Bali melakukan berbagai cara untuk
                                menghalangi niat Belanda tersebut. Hingga
                                akhirnya Bali berhasil mengusir Belanda dan
                                Indonesia merdeka seutuhnya. Hal inilah yang
                                membuat pemerintah dan warga Bali mendirikan
                                Monumen Pahlawan Perjuangan Kemerdekaan Republik
                                Indonesia 1945.
                            </motion.p>
                        </div>
                        <div className="text-center mt-20">
                            <Title>Struktur Organisasi</Title>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <img
                                    src={chartImg}
                                    alt="Organization Structures"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default About;
