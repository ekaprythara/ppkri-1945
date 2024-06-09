import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "../DataTables/DataTable";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { LiaTimesSolid } from "react-icons/lia";
import { LuFilter, LuFilterX } from "react-icons/lu";

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Label,
    Select,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import InputLabel from "@/Components/InputLabel";

const ParkingGuestReport = ({ auth, parkingGuests, vehicleTypes }) => {
    const dateToday = new Date().toLocaleDateString("en-CA");

    // ! Print
    const [startDate, setStartDate] = useState(dateToday);
    const [endDate, setEndDate] = useState(dateToday);

    // ! Sorting Date
    const [from, setFrom] = useState(dateToday);
    const [to, setTo] = useState(dateToday);

    const [sortedData, setSortedData] = useState([]);

    const [isSorted, setIsSorted] = useState(false);

    const [isModalPrintOpen, setIsModalPrintOpen] = useState(false);
    const [isModalExportOpen, setIsModalExportOpen] = useState(false);

    const formatToIDR = (number) => {
        const formattedNumber = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
        return formattedNumber;
    };

    // ! Filter the data to today's date
    const [thisDayData, setThisDayData] = useState([]);
    useEffect(() => {
        /*
            Filters an array of "parkingGuest" based
            on a date range and then sorts the filtered data
            based on the "created_at" property in descending order.
        */
        const filteredData = parkingGuests.filter((item) => {
            const itemDate = item.date;
            return itemDate >= from && itemDate <= to;
        });

        const sortedFilteredData = filteredData.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        setThisDayData(sortedFilteredData);
    }, [parkingGuests]);

    const handleSortDate = (event) => {
        event.preventDefault();

        const filteredData = parkingGuests.filter((item) => {
            const itemDate = item.date;
            return itemDate >= from && itemDate <= to;
        });

        const sortedFilteredData = filteredData.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        setSortedData(sortedFilteredData);
        setIsSorted(true);
    };

    const columns = [
        {
            accessorFn: (row) => {
                const date = new Date(row.date);
                const day = date.toLocaleDateString("id-ID", {
                    day: "2-digit",
                });
                const month = date.toLocaleDateString("id-ID", {
                    month: "2-digit",
                });
                const year = date.toLocaleDateString("id-ID", {
                    year: "numeric",
                });
                return `${year}-${month}-${day}`;
            },
            header: "Tanggal",
        },
        {
            accessorFn: (row) => {
                const name = vehicleTypes.filter(
                    (vehicleType) => vehicleType.id === row.vehicleType_id
                );
                return `${name[0].name}`;
            },
            header: "Tipe Kendaraan",
        },
        {
            accessorKey: "count",
            header: "Jumlah",
        },
        {
            accessorKey: "fee",
            header: "Harga",
            cell: (props) => {
                const value = props.getValue();
                const formattedValue = formatToIDR(value);
                return formattedValue;
            },
        },
        {
            accessorKey: "isCustomFee",
            accessorFn: (row) => (row.isCustomFee ? "YES" : "NO"),
            header: "Harga Khusus",
            cell: (props) => (
                <p>
                    {props.getValue() === "YES" ? (
                        <span className="bg-green-500 text-sm text-white py-1 px-2 rounded-md uppercase">
                            YES
                        </span>
                    ) : (
                        <span className="bg-red-500 text-sm text-white py-1 px-2 rounded-md uppercase">
                            NO
                        </span>
                    )}
                </p>
            ),
        },
        {
            accessorKey: "description",
            header: "Keterangan",
        },
    ];

    const onFromDateHandler = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setFrom(formattedDate);
    };

    const onToDateHandler = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setTo(formattedDate);
    };

    const onResetHandler = () => {
        setIsSorted(false);
        setFrom(dateToday);
        setTo(dateToday);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Laporan Data Parkir">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex justify-center items-center gap-2">
                        <form
                            onSubmit={handleSortDate}
                            className="flex justify-center items-center gap-2"
                        >
                            <Field className="flex justify-center items-center gap-1">
                                <Label htmlFor="from">Dari: </Label>
                                <DatePicker
                                    id="from"
                                    selected={from}
                                    onChange={onFromDateHandler}
                                    className="rounded-md font-chivoMono"
                                    dateFormat={"YYYY-MM-dd"}
                                />
                            </Field>
                            <Field className="flex justify-center items-center gap-1">
                                <Label htmlFor="to">Sampai: </Label>
                                <DatePicker
                                    id="to"
                                    selected={to}
                                    onChange={onToDateHandler}
                                    className="rounded-md font-chivoMono"
                                    dateFormat={"YYYY-MM-dd"}
                                />
                            </Field>
                            <button
                                title="Sortir berdasarkan tanggal"
                                className="py-2 px-4 rounded-lg text-lg bg-blue-700 text-white font-lato"
                            >
                                <LuFilter size={28} />
                            </button>
                        </form>
                        {isSorted ? (
                            <button
                                title="Reset sortir"
                                onClick={onResetHandler}
                                className="py-2 px-4 rounded-lg text-lg focus:border-indigo-500 focus:ring-indigo-500 bg-red-600 text-white font-lato"
                            >
                                <LuFilterX size={28} />
                            </button>
                        ) : null}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => setIsModalExportOpen(true)}
                            className="py-2 px-4 rounded-lg text-lg bg-green-600 text-white font-lato"
                        >
                            Ekspor
                        </button>
                        <button
                            onClick={() => setIsModalPrintOpen(true)}
                            className="py-2 px-4 rounded-lg text-lg bg-green-600 text-white font-lato"
                        >
                            Cetak
                        </button>
                    </div>
                </div>
                <Transition show={isModalExportOpen}>
                    <Dialog
                        className="relative z-10"
                        onClose={setIsModalExportOpen}
                    >
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <DialogPanel className="relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <div className="font-lato text-2xl px-5 py-4 flex justify-between items-center">
                                                    <DialogTitle>
                                                        Ekspor Laporan Data
                                                        Parkir
                                                    </DialogTitle>
                                                    <button
                                                        onClick={() =>
                                                            setIsModalOpen(
                                                                false
                                                            )
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        <LiaTimesSolid
                                                            size={25}
                                                        />
                                                    </button>
                                                </div>
                                                <hr className="border border-gray-200" />
                                            </div>
                                            <form action="/report/parking-guest/export">
                                                <div className="font-lato text-base px-5 py-4 flex justify-center items-center flex-col gap-2">
                                                    <div className="flex gap-1">
                                                        <Field className="flex flex-col justify-start items-start gap-1">
                                                            <Label
                                                                htmlFor="start"
                                                                className="font-medium text-sm text-gray-700"
                                                            >
                                                                Dari:{" "}
                                                            </Label>
                                                            <DatePicker
                                                                id="start"
                                                                name="start"
                                                                selected={
                                                                    startDate
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    setStartDate(
                                                                        date.toLocaleDateString(
                                                                            "en-CA"
                                                                        )
                                                                    )
                                                                }
                                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full font-chivoMono"
                                                                dateFormat={
                                                                    "YYYY-MM-dd"
                                                                }
                                                            />
                                                        </Field>
                                                        <Field className="flex flex-col justify-start items-start gap-1">
                                                            <Label
                                                                htmlFor="end"
                                                                className="font-medium text-sm text-gray-700"
                                                            >
                                                                Sampai:{" "}
                                                            </Label>
                                                            <DatePicker
                                                                id="end"
                                                                name="end"
                                                                selected={
                                                                    endDate
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    setEndDate(
                                                                        date.toLocaleDateString(
                                                                            "en-CA"
                                                                        )
                                                                    )
                                                                }
                                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full font-chivoMono"
                                                                dateFormat={
                                                                    "YYYY-MM-dd"
                                                                }
                                                            />
                                                        </Field>
                                                    </div>
                                                    <div className="w-full">
                                                        <InputLabel
                                                            htmlFor="format"
                                                            value="Pilih Format"
                                                        />
                                                        <Select
                                                            id="format"
                                                            name="format"
                                                            defaultValue={"ods"}
                                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mt-1"
                                                        >
                                                            <option value="ods">
                                                                ODS
                                                            </option>
                                                            <option value="xls">
                                                                XLS
                                                            </option>
                                                            <option value="xlsx">
                                                                XLSX
                                                            </option>
                                                            <option value="pdf">
                                                                PDF
                                                            </option>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className="border border-gray-200" />
                                                    <div className="font-lato text-2xl px-5 py-4 flex justify-end items-center">
                                                        <button
                                                            type="submit"
                                                            className="py-2 px-4 rounded-lg text-lg bg-green-600 text-white font-lato disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                                                        >
                                                            Ekspor
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition show={isModalPrintOpen}>
                    <Dialog
                        className="relative z-10"
                        onClose={setIsModalPrintOpen}
                    >
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <DialogPanel className="relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <div className="font-lato text-2xl px-5 py-4 flex justify-between items-center">
                                                    <DialogTitle>
                                                        Cetak Laporan Data
                                                        Parkir
                                                    </DialogTitle>
                                                    <button
                                                        onClick={() =>
                                                            setIsModalOpen(
                                                                false
                                                            )
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        <LiaTimesSolid
                                                            size={25}
                                                        />
                                                    </button>
                                                </div>
                                                <hr className="border border-gray-200" />
                                            </div>
                                            <form action="/report/parking-guest/print">
                                                <div className="font-lato text-base px-5 py-4 flex justify-center items-center">
                                                    <div className="flex gap-1">
                                                        <Field className="flex flex-col justify-start items-start gap-1">
                                                            <Label htmlFor="start">
                                                                Dari:{" "}
                                                            </Label>
                                                            <DatePicker
                                                                id="start"
                                                                name="start"
                                                                selected={
                                                                    startDate
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    setStartDate(
                                                                        date.toLocaleDateString(
                                                                            "en-CA"
                                                                        )
                                                                    )
                                                                }
                                                                className="rounded-md font-chivoMono"
                                                                dateFormat={
                                                                    "YYYY-MM-dd"
                                                                }
                                                            />
                                                        </Field>
                                                        <Field className="flex flex-col justify-start items-start gap-1">
                                                            <Label htmlFor="end">
                                                                Sampai:{" "}
                                                            </Label>
                                                            <DatePicker
                                                                id="end"
                                                                name="end"
                                                                selected={
                                                                    endDate
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    setEndDate(
                                                                        date.toLocaleDateString(
                                                                            "en-CA"
                                                                        )
                                                                    )
                                                                }
                                                                className="rounded-md font-chivoMono"
                                                                dateFormat={
                                                                    "YYYY-MM-dd"
                                                                }
                                                            />
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className="border border-gray-200" />
                                                    <div className="font-lato text-2xl px-5 py-4 flex justify-end items-center">
                                                        <button
                                                            type="submit"
                                                            className="py-2 px-4 rounded-lg text-lg bg-green-600 text-white font-lato disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                                                        >
                                                            Cetak
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable
                        columns={columns}
                        data={isSorted ? sortedData : thisDayData}
                    />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default ParkingGuestReport;
