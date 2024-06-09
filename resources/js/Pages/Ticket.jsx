import Title from "@/Components/Title";
import { Head } from "@inertiajs/react";
import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion } from "framer-motion";

const ticketPricing = [
    {
        title: "Personal",
        price: "Rp. 40.000,-",
        facilities: ["Toilet"],
        type: "Orang",
        delayAnimation: 0.3,
    },
    {
        title: "Foto Prewedding (Lokal)",
        price: "Rp. 350.000,-",
        facilities: ["Toilet", "Dressing Room"],
        type: "Couple",
        delayAnimation: 0.4,
    },
    {
        title: "Foto Prewedding (Asing)",
        price: "Rp. 600.000,-",
        facilities: ["Toilet", "Dressing Room"],
        type: "Couple",
        delayAnimation: 0.5,
    },
];

const Ticket = () => {
    return (
        <>
            <Head title="Tiket" />
            <GuestLayout>
                <div className="bg-[#222] text-white">
                    <div className="w-8/12 mx-auto flex flex-col justify-center items-center py-20">
                        <Title>Cara Membeli Tiket</Title>
                        <div className="mb-10">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{
                                    duration: 1,
                                }}
                                variants={{
                                    hidden: { opacity: 0, x: 100 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                                className="grid grid-cols-2 grid-rows-none gap-2"
                            >
                                <div className="bg-[#333] p-8">
                                    <span className="font-caudex text-3xl">
                                        Waktu Kunjungan
                                    </span>
                                    <div className="flex flex-col gap-2 mt-5">
                                        <p className="font-caudex text-base">
                                            Monumen PPKRI 1945 dibuka pada hari
                                            Senin - Jumat pada jam 08:00 -
                                            17:00.
                                        </p>
                                        <p className="font-caudex text-base">
                                            Bagi pengunjung yang berencana
                                            datang di luar hari dan jam
                                            tersebut, kami menyediakan layanan
                                            informasi melalui WhatsApp Admin.
                                            Silakan hubungi kami untuk
                                            mendapatkan informasi lebih lanjut
                                            dan bantuan terkait jadwal kunjungan
                                            alternatif.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-monumen bg-cover bg-center" />
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{
                                    duration: 1,
                                }}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                                className="grid grid-cols-2 grid-rows-none gap-2 mt-2"
                            >
                                <div className="bg-monumen bg-cover bg-center" />
                                <div className="bg-[#333] p-8">
                                    <span className="font-caudex text-3xl">
                                        Membeli Tiket
                                    </span>
                                    <div className="flex flex-col gap-2 mt-5">
                                        <p className="font-caudex text-base">
                                            Pengunjung yang ingin menikmati
                                            keindahan dan sejarah Monumen PPKRI
                                            1945 kini dapat membeli tiket
                                            langsung di loket yang telah
                                            disediakan.
                                        </p>
                                        <p className="font-caudex text-base">
                                            Kami berkomitmen untuk memberikan
                                            pengalaman terbaik bagi semua
                                            pengunjung, memastikan semua
                                            pengunjung memiliki kesempatan untuk
                                            mendapatkan tiket masuk.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <Title>Harga Tiket</Title>
                        <div className="grid grid-cols-3 grid-rows-none gap-5">
                            {ticketPricing.map((item, index) => {
                                return (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: item.delayAnimation,
                                        }}
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        key={index}
                                        className="bg-[#333] py-10"
                                    >
                                        <div className="px-10 font-caudex text-xl mb-10">
                                            {item.title}
                                        </div>
                                        <div className="bg-[#444] px-10 w-full font-caudex flex flex-col gap-2 py-5">
                                            <span className="text-3xl">
                                                {item.price}
                                            </span>
                                            <span className="text-xl">
                                                / {item.type}
                                            </span>
                                        </div>
                                        <div className="px-10 flex flex-col gap-2 mt-5 font-caudex">
                                            <span className="text-2xl">
                                                Fasilitas
                                            </span>
                                            {item.facilities.map(
                                                (facility, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-lg"
                                                    >
                                                        {facility}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Ticket;
