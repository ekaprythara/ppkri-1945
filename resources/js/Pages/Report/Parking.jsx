import React, { useEffect, useState } from "react";

import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "../DataTables/DataTable";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { LuFilter, LuFilterX } from "react-icons/lu";

import { Field, Label, Select } from "@headlessui/react";

import DangerButton from "@/Components/Button/DangerButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import SuccessButton from "@/Components/Button/SuccessButton";
import Modal from "@/Components/Modal";

const Parking = ({ auth, parking, vehicleTypes }) => {
    const dateToday = new Date().toLocaleDateString("en-CA");

    // State to manage the range of date for filtering
    const [from, setFrom] = useState(dateToday);
    const [to, setTo] = useState(dateToday);

    // State to store the sorted data
    const [isSorted, setIsSorted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    const [isModalPrintOpen, setIsModalPrintOpen] = useState(false);
    const [isModalExportOpen, setIsModalExportOpen] = useState(false);

    // State to store the data filtered by the selected date range
    const [dataToday, setDataToday] = useState([]);

    // Effect to filter and sort parking data based on the selected date range
    useEffect(() => {
        const filteredData = parking.filter((item) => {
            const date = item.date;
            return date >= from && date <= to;
        });
        const sortedData = filteredData.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        setDataToday(sortedData);
    }, [parking]);

    // Function to handle the start date change
    const handleStartDateChange = (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-CA");
        setFrom(formattedDate);
    };

    // Function to handle the end date change
    const handleEndDateChange = (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-CA");
        setTo(formattedDate);
    };

    // Function to handle sorting data by date
    const handleSortDate = (event) => {
        event.preventDefault();
        const filteredData = parking.filter((item) => {
            const date = item.date;
            return date >= from && date <= to;
        });
        const sortedData = filteredData.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        setSortedData(sortedData);
        setIsSorted(true);
    };

    // Function to reset the date filters and sorting state
    const handleReset = () => {
        setFrom(dateToday);
        setTo(dateToday);
        setIsSorted(false);
    };

    // Function to format a number to IDR format
    const formatToIDR = (number) => {
        const formattedNumber = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
        return formattedNumber;
    };

    const columns = [
        {
            accessorFn: (row) => {
                const date = new Date(row.date).toLocaleDateString("en-CA");
                return date;
            },
            header: "Tanggal",
        },
        {
            accessorFn: (row) => {
                const vehicleType = vehicleTypes.find(
                    (vehicleType) => vehicleType.id === row.vehicleType_id
                );
                return vehicleType.name;
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
                const fee = props.getValue();
                const formattedFee = formatToIDR(fee);
                return formattedFee;
            },
        },
        {
            accessorFn: (row) => {
                return row.description ? row.description : "";
            },
            header: "Keterangan",
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Laporan Data Parkir">
                <div className="flex flex-row justify-between items-center px-2">
                    <div className="flex justify-center items-center gap-2">
                        <form
                            onSubmit={handleSortDate}
                            className="flex justify-center items-center gap-2"
                        >
                            <Field className="flex justify-center items-center gap-1">
                                <Label
                                    htmlFor="from"
                                    className="font-inter text-base"
                                >
                                    Dari:{" "}
                                </Label>
                                <DatePicker
                                    selected={from}
                                    onChange={handleStartDateChange}
                                    dateFormat={"yyyy-MM-dd"}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter text-base"
                                />
                            </Field>
                            <Field className="flex justify-center items-center gap-1">
                                <Label
                                    htmlFor="to"
                                    className="font-inter text-base"
                                >
                                    Sampai:{" "}
                                </Label>
                                <DatePicker
                                    selected={to}
                                    onChange={handleEndDateChange}
                                    dateFormat={"yyyy-MM-dd"}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter text-base"
                                />
                            </Field>
                            <PrimaryButton>
                                <span className="flex justify-center items-center gap-2">
                                    <LuFilter size={20} />
                                    <span>Sortir</span>
                                </span>
                            </PrimaryButton>
                        </form>
                        {isSorted ? (
                            <DangerButton onClick={handleReset}>
                                <span className="flex justify-center items-center gap-2">
                                    <LuFilterX size={20} />
                                    <span>Batalkan Sortir</span>
                                </span>
                            </DangerButton>
                        ) : null}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <SuccessButton
                            onClick={() => setIsModalExportOpen(true)}
                        >
                            Ekspor
                        </SuccessButton>
                        <SuccessButton
                            onClick={() => setIsModalPrintOpen(true)}
                        >
                            Cetak
                        </SuccessButton>
                    </div>
                </div>

                <Modal
                    show={isModalExportOpen}
                    onClose={setIsModalExportOpen}
                    title="Ekspor"
                    submitButtonName="Ekspor"
                    accent="success"
                    action="/laporan/parkir/ekspor"
                >
                    <div className="font-inter text-base px-5 py-4 flex justify-center items-center flex-col gap-2">
                        <div className="flex justify-between items-center gap-2">
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="from"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Dari:
                                </Label>
                                <DatePicker
                                    id="from"
                                    name="from"
                                    selected={from}
                                    value={from}
                                    onChange={(date) =>
                                        setFrom(
                                            date.toLocaleDateString("en-CA")
                                        )
                                    }
                                    dateFormat={"yyyy-MM-dd"}
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter w-full"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="to"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Sampai:
                                </Label>
                                <DatePicker
                                    id="to"
                                    name="to"
                                    selected={to}
                                    value={to}
                                    onChange={(date) =>
                                        setTo(date.toLocaleDateString("en-CA"))
                                    }
                                    dateFormat={"yyyy-MM-dd"}
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter w-full"
                                />
                            </Field>
                        </div>
                        <Field className="flex flex-col gap-1 w-full">
                            <Label
                                htmlFor="format"
                                className="font-medium text-sm text-gray-700"
                            >
                                Format
                            </Label>
                            <Select
                                id="format"
                                name="format"
                                defaultValue="ods"
                                required
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                            >
                                <option value="ods">ODS</option>
                                <option value="xls">XLS</option>
                                <option value="xlsx">XLSX</option>
                                <option value="pdf">PDF</option>
                            </Select>
                        </Field>
                    </div>
                </Modal>

                <Modal
                    show={isModalPrintOpen}
                    onClose={setIsModalPrintOpen}
                    title="Cetak"
                    submitButtonName="Cetak"
                    accent="success"
                    action="/laporan/parkir/cetak"
                >
                    <div className="font-inter text-base px-5 py-4 flex justify-center items-center flex-col gap-2">
                        <div className="flex justify-between items-center gap-2">
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="from"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Dari:
                                </Label>
                                <DatePicker
                                    id="from"
                                    name="from"
                                    selected={from}
                                    value={from}
                                    onChange={(date) =>
                                        setFrom(
                                            date.toLocaleDateString("en-CA")
                                        )
                                    }
                                    dateFormat={"yyyy-MM-dd"}
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter w-full"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="to"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Sampai:
                                </Label>
                                <DatePicker
                                    id="to"
                                    name="to"
                                    selected={to}
                                    value={to}
                                    onChange={(date) =>
                                        setTo(date.toLocaleDateString("en-CA"))
                                    }
                                    dateFormat={"yyyy-MM-dd"}
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter w-full"
                                />
                            </Field>
                        </div>
                    </div>
                </Modal>

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable
                        columns={columns}
                        data={isSorted ? sortedData : dataToday}
                    />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Parking;
