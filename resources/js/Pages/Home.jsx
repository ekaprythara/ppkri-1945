import Button from "@/Components/Button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { FaTicketAlt, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Title from "@/Components/Title";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <GuestLayout>
                <div className="h-full z-10 absolute flex flex-col items-center justify-center w-full">
                    <Title className="text-white text-center font-extrabold">
                        Monumen <br /> Pahlawan Perang <br /> Kemerdekaan
                        Republik Indonesia 1945
                    </Title>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="text-stone-100 text-center font-caudex text-xl"
                    >
                        Monumen penghormatan kejadian Perang Kemerdekaan 1945.{" "}
                        <br /> Monumen ini memperingati salah satu peristiwa
                        paling penting dalam sejarah Bali.
                    </motion.p>
                    <Button>
                        <a href="/ticket">RENCANA KUNJUNGAN</a>
                    </Button>
                </div>
                <div className="relative h-[calc(100vh-64px)] -z-10 w-full">
                    <div className="bg-black/40 h-full w-full absolute" />
                    <div className="bg-monumen bg-cover bg-center bg-no-repeat h-full w-full" />
                </div>
                <section className="px-20 py-10 bg-white text-center">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="text-3xl font-bold font-caudex"
                    >
                        Selamat datang di Monumen <br /> Pahlawan Perang
                        Kemerdekaan Republik Indonesia 1945
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="mt-5 font-caudex text-xl"
                    >
                        Situs resmi Monumen PPKRI 1945, salah satu monumen yang
                        paling disukai, yang menawarkan pemandangan candi.
                    </motion.p>
                    <Button>
                        <a href="/collections">LIHAT KOLEKSI</a>
                    </Button>
                </section>
                <section className="px-20 py-10 bg-blue-00 text-white text-center bg-blue-800">
                    <div className="w-10/12 mx-auto">
                        <h2 className="text-3xl font-bold font-caudex">
                            Informasi Berguna
                        </h2>
                        <div className="grid grid-cols-3 grid-rows-none gap-10 mt-5">
                            <div className="flex h-fit gap-4">
                                <div className="border-l-4 border-blue-400" />
                                <div className="flex justify-center items-start gap-4">
                                    <FaTicketAlt size={70} />
                                    <div className="flex flex-col text-start gap-2">
                                        <span className="text-xl font-bold font-caudex">
                                            Tiket dan Harga
                                        </span>
                                        <div className="flex flex-col font-caudex text-base">
                                            <span>Dewasa Rp. 40.000</span>
                                            <span>Anak Rp. 20.000</span>
                                        </div>
                                        <a
                                            href="#"
                                            className="font-caudex text-base underline"
                                        >
                                            Tampilkan Lebih Banyak
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex h-fit gap-4">
                                <div className="border-l-4 border-blue-400" />
                                <div className="flex justify-center items-start gap-4">
                                    <FaRegClock size={70} />
                                    <div className="flex flex-col text-start gap-2">
                                        <span className="text-xl font-bold font-caudex">
                                            Waktu Buka
                                        </span>
                                        <div className="flex flex-col font-caudex text-base">
                                            <span>Buka Senin-Jumat</span>
                                            <span>08:00 - 17:00</span>
                                        </div>
                                        <a
                                            href="#"
                                            className="font-caudex text-base underline"
                                        >
                                            Tampilkan Lebih Banyak
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex h-fit gap-4">
                                <div className="border-l-4 border-blue-400" />
                                <div className="flex justify-center items-start gap-4">
                                    <FaMapMarkerAlt size={70} />
                                    <div className="flex flex-col text-start gap-2">
                                        <span className="text-xl font-bold font-caudex">
                                            Lokasi
                                        </span>
                                        <div className="flex flex-col font-caudex text-base">
                                            <span>
                                                Jalan Bypass Ngurah Rai,
                                                Jimbaran, Badung
                                            </span>
                                        </div>
                                        <a
                                            href="#"
                                            className="font-caudex text-base underline"
                                        >
                                            Tampilkan Lebih Banyak
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
}
