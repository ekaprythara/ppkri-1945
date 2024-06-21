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
    totalGuestIncome,
    totalParkingIncome,
    totalIncome,
    totalRegularGuestInThisYear,
    totalRegularGuestInLastYear,
    totalAgentGuestInThisYear,
    totalAgentGuestInLastYear,
}) {
    const sumPrice = (data) => {
        let totalPrice = 0;
        data.forEach((item) => {
            totalPrice += parseInt(item.price);
        });
        return totalPrice;
    };

    const formatToIDR = (price) => {
        const formattedNumber = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
        return formattedNumber;
    };

    const lastYear = [
        {
            id: 1,
            month: "Januari",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 0
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 0
                    )
                ),
        },
        {
            id: 2,
            month: "Februari",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 1
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 1
                    )
                ),
        },
        {
            id: 3,
            month: "Maret",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 2
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 2
                    )
                ),
        },
        {
            id: 4,
            month: "April",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 3
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 3
                    )
                ),
        },
        {
            id: 5,
            month: "Mei",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 4
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 4
                    )
                ),
        },
        {
            id: 6,
            month: "Juni",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 5
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 5
                    )
                ),
        },
        {
            id: 7,
            month: "Juli",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 6
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 6
                    )
                ),
        },
        {
            id: 8,
            month: "Agustus",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 7
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 7
                    )
                ),
        },
        {
            id: 9,
            month: "September",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 8
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 8
                    )
                ),
        },
        {
            id: 10,
            month: "Oktober",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 9
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 9
                    )
                ),
        },
        {
            id: 11,
            month: "November",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 10
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 10
                    )
                ),
        },
        {
            id: 12,
            month: "Desember",
            income:
                sumPrice(
                    totalRegularGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 11
                    )
                ) +
                sumPrice(
                    totalAgentGuestInLastYear.filter(
                        (item) => new Date(item.date).getMonth() === 11
                    )
                ),
        },
    ];

    const currentYear = [
        {
            id: 1,
            month: "Januari",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 0
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 0
                    )
                ),
        },
        {
            id: 2,
            month: "Februari",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 1
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 1
                    )
                ),
        },
        {
            id: 3,
            month: "Maret",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 2
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 2
                    )
                ),
        },
        {
            id: 4,
            month: "April",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 3
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 3
                    )
                ),
        },
        {
            id: 5,
            month: "Mei",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 4
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 4
                    )
                ),
        },
        {
            id: 6,
            month: "Juni",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 5
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 5
                    )
                ),
        },
        {
            id: 7,
            month: "Juli",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 6
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 6
                    )
                ),
        },
        {
            id: 8,
            month: "Agustus",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 7
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 7
                    )
                ),
        },
        {
            id: 9,
            month: "September",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 8
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 8
                    )
                ),
        },
        {
            id: 10,
            month: "Oktober",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 9
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 9
                    )
                ),
        },
        {
            id: 11,
            month: "November",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 10
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 10
                    )
                ),
        },
        {
            id: 12,
            month: "Desember",
            income:
                sumPrice(
                    totalRegularGuestInThisYear.filter(
                        (item) => new Date(item.date).getMonth() === 11
                    )
                ) +
                sumPrice(
                    totalAgentGuestInThisYear.filter(
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="pt-10 max-w-[1440px] mx-auto sm:px-6 lg:px-8 font-inter">
                <h2 className="font-semibold text-4xl text-gray-700 leading-tight mb-5">
                    Dashboard
                </h2>
                <div className="flex flex-col justify-center items-center gap-10">
                    <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start gap-5 w-full">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 1 }}
                            transition={{ duration: 1 }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="max-w-[1140px] w-full rounded-md overflow-hidden shadow-lg bg-gradient-to-r from-purple-500 to-blue-500"
                        >
                            <div className="py-10 px-6">
                                <div className="grid grid-cols-[1.6fr_0.4fr] grid-rows-none">
                                    <div>
                                        <h3 className="font-inter text-2xl text-white">
                                            Pendapatan Tamu
                                            <br />
                                            Harian
                                        </h3>
                                        <div className="mt-20 font-inter text-2xl text-white">
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
                            className="max-w-[1140px] w-full rounded-md overflow-hidden shadow-lg bg-gradient-to-r from-green-500 to-teal-500"
                        >
                            <div className="py-10 px-6">
                                <div className="grid grid-cols-[1.6fr_0.4fr] grid-rows-none">
                                    <div>
                                        <h3 className="font-inter text-2xl text-white">
                                            Pendapatan Parkir
                                            <br />
                                            Harian
                                        </h3>
                                        <div className="mt-20 font-inter text-2xl text-white">
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
                            className="max-w-[1140px] w-full rounded-md overflow-hidden shadow-lg bg-gradient-to-r from-red-500 to-orange-500"
                        >
                            <div className="py-10 px-6">
                                <div className="grid grid-cols-[1.6fr_0.4fr] grid-rows-none">
                                    <div>
                                        <h3 className="font-inter text-2xl text-white">
                                            Total Pendapatan
                                            <br />
                                            Harian
                                        </h3>
                                        <div className="mt-20 font-inter text-2xl text-white">
                                            {formatToIDR(totalIncome)}
                                        </div>
                                    </div>
                                    <div className="content-center text-white">
                                        <BsCashStack size={100} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full">
                        <div className="bg-white overflow-hidden shadow-md rounded-lg sm:rounded-lg p-5">
                            <p className="mb-5 text-2xl font-bold text-gray-700">
                                Pendapatan Tahunan
                            </p>
                            <BarChart data={barChartData} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
