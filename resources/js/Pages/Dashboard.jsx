import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BsCarFrontFill, BsCashStack, BsPeopleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState } from "react";
import { monthlyAgents, months } from "@/utils/chart-data";
import BarChart from "@/Components/Chart/BarChart";
import PieChart from "@/Components/Chart/PieChart";

export default function Dashboard({
    auth,
    agents,
    totalParkingIncome,
    totalGuestIncome,
    totalGuestInThisYear,
    totalGuestInLastYear,
    totalGuestInThisMonth,
}) {
    function sumPrices(data) {
        let totalPrice = 0;
        data.forEach((item) => {
            totalPrice += parseInt(item.price);
        });
        return totalPrice;
    }

    const lastYear = [
        {
            id: 1,
            month: "Januari",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 0
                )
            ),
        },
        {
            id: 2,
            month: "Februari",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 1
                )
            ),
        },
        {
            id: 3,
            month: "Maret",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 2
                )
            ),
        },
        {
            id: 4,
            month: "April",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 3
                )
            ),
        },
        {
            id: 5,
            month: "Mei",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 4
                )
            ),
        },
        {
            id: 6,
            month: "Juni",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 5
                )
            ),
        },
        {
            id: 7,
            month: "Juli",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 6
                )
            ),
        },
        {
            id: 8,
            month: "Agustus",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 7
                )
            ),
        },
        {
            id: 9,
            month: "September",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 8
                )
            ),
        },
        {
            id: 10,
            month: "Oktober",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 9
                )
            ),
        },
        {
            id: 11,
            month: "November",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 10
                )
            ),
        },
        {
            id: 12,
            month: "Desember",
            income: sumPrices(
                totalGuestInLastYear.filter(
                    (item) => new Date(item.date).getMonth() === 11
                )
            ),
        },
    ];

    const currentYear = [
        {
            id: 1,
            month: "Januari",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 0
                )
            ),
        },
        {
            id: 2,
            month: "Februari",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 1
                )
            ),
        },
        {
            id: 3,
            month: "Maret",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 2
                )
            ),
        },
        {
            id: 4,
            month: "April",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 3
                )
            ),
        },
        {
            id: 5,
            month: "Mei",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 4
                )
            ),
        },
        {
            id: 6,
            month: "Juni",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 5
                )
            ),
        },
        {
            id: 7,
            month: "Juli",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 6
                )
            ),
        },
        {
            id: 8,
            month: "Agustus",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 7
                )
            ),
        },
        {
            id: 9,
            month: "September",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 8
                )
            ),
        },
        {
            id: 10,
            month: "Oktober",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 9
                )
            ),
        },
        {
            id: 11,
            month: "November",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 10
                )
            ),
        },
        {
            id: 12,
            month: "Desember",
            income: sumPrices(
                totalGuestInThisYear.filter(
                    (item) => new Date(item.date).getMonth() === 11
                )
            ),
        },
    ];

    const [barChartData, setBarChartData] = useState({
        labels: months.map((item) => item.name),
        datasets: [
            {
                label: new Date().getFullYear() - 1,
                data: lastYear.map((item) => item.income),
            },
            {
                label: new Date().getFullYear(),
                data: currentYear.map((item) => item.income),
            },
        ],
    });

    // Objek baru untuk menyimpan hasil
    const result = {};

    // Loop melalui data dan gabungkan agent_id yang sama serta menjumlahkan count
    totalGuestInThisMonth.forEach((item) => {
        const { agent_id, count } = item;
        if (result[agent_id]) {
            result[agent_id].count += parseInt(count, 10); // Mengonversi count ke integer sebelum menjumlahkan
        } else {
            result[agent_id] = { agent_id, count: parseInt(count, 10) };
        }
    });

    // Konversi objek hasil ke dalam array
    const filteredMonthlyGuests = Object.values(result);

    const filteredGuests = filteredMonthlyGuests.filter((guest) => {
        const agent = agents.find((agent) => agent.id === guest.agent_id);
        if (agent) {
            guest.agent_name = agent.name; // Add agent's name to guest object
            return true; // Keep the guest
        }
        return false; // Discard the guest
    });

    const [pieChartData, setPieChartData] = useState({
        labels: filteredGuests.map((guest) => guest.agent_name),
        datasets: [
            {
                data: filteredMonthlyGuests.map((guest) => guest.count),
            },
        ],
    });

    const formatToIDR = (price) => {
        const formattedNumber = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
        return formattedNumber;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="pt-10 max-w-7xl mx-auto sm:px-6 lg:px-8 font-lato">
                <Head title="Dashboard" />
                <h2 className="font-semibold text-4xl text-gray-800 leading-tight mb-5">
                    Dashboard
                </h2>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start gap-5">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="max-w-md w-full rounded-md overflow-hidden shadow-lg bg-gradient-to-r from-purple-500 to-blue-500"
                    >
                        <div className="py-10 px-6">
                            <div className="grid grid-cols-[1.6fr_0.4fr] grid-rows-none">
                                <div>
                                    <h3 className="font-lato text-2xl text-white">
                                        Pendapatan Tamu
                                        <br />
                                        Harian
                                    </h3>
                                    <div className="mt-20 font-chivoMono text-2xl text-white">
                                        {formatToIDR(totalGuestIncome)}
                                    </div>
                                </div>
                                <div className="content-center text-white">
                                    <BsPeopleFill size={100} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1, delay: 0.1 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="max-w-md w-full rounded-md overflow-hidden shadow-lg bg-gradient-to-r from-green-500 to-teal-500"
                    >
                        <div className="py-10 px-6">
                            <div className="grid grid-cols-[1.6fr_0.4fr] grid-rows-none">
                                <div>
                                    <h3 className="font-lato text-2xl text-white">
                                        Pendapatan Parkir
                                        <br />
                                        Harian
                                    </h3>
                                    <div className="mt-20 font-chivoMono text-2xl text-white">
                                        {formatToIDR(totalParkingIncome)}
                                    </div>
                                </div>
                                <div className="content-center text-white">
                                    <BsCarFrontFill size={100} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="max-w-md w-full rounded-md overflow-hidden shadow-lg bg-gradient-to-r from-red-500 to-orange-500"
                    >
                        <div className="py-10 px-6">
                            <div className="grid grid-cols-[1.6fr_0.4fr] grid-rows-none">
                                <div>
                                    <h3 className="font-lato text-2xl text-white">
                                        Total Pendapatan
                                        <br />
                                        Harian
                                    </h3>
                                    <div className="mt-20 font-chivoMono text-2xl text-white">
                                        {formatToIDR(
                                            +totalGuestIncome +
                                                +totalParkingIncome
                                        )}
                                    </div>
                                </div>
                                <div className="content-center text-white">
                                    <BsCashStack size={100} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div
                initial="hidden"
                className="pt-5 max-w-7xl mx-auto sm:px-6 lg:px-8 font-lato"
            >
                <div className="grid grid-cols-3 gap-5 ">
                    <div className="bg-white overflow-hidden rounded-lg shadow-md sm:rounded-lg p-5 col-span-2">
                        <p className="mb-5 text-2xl">Pendapatan Tahunan</p>
                        <BarChart data={barChartData} />
                    </div>
                    <div className="bg-white overflow-hidden rounded-lg shadow-md sm:rounded-lg p-5">
                        <p className="mb-5 text-2xl">Kunjungan Bulan Ini</p>
                        {pieChartData.labels.length > 0 ? (
                            <PieChart data={pieChartData} />
                        ) : (
                            <p className="flex justify-center items-center h-full font-lato text-sm text-gray-500">
                                Data akan tampil disini
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
