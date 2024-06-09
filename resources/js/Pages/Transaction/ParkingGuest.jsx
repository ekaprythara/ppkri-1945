import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import { LiaTimesSolid, LiaSyncSolid, LiaFilterSolid } from "react-icons/lia";
import Card from "@/Components/Card";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { LuFilter, LuFilterX } from "react-icons/lu";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { DataTable } from "../DataTables/DataTable";

import {
    Checkbox,
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Input,
    Label,
    Select,
    Textarea,
    Transition,
    TransitionChild,
} from "@headlessui/react";

const ParkingGuest = ({ auth, parkingGuests, vehicleTypes }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedSortDate = `${year}-${month}-${day}`;

    const [from, setFrom] = useState(formattedSortDate);
    const [to, setTo] = useState(formattedSortDate);
    const [sortedData, setSortedData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        date: formattedDate,
        vehicleType_id: "" | 1,
        count: "",
        isCustomFee: "",
        fee: "",
        description: "",
    });

    const submitHandler = (event) => {
        event.preventDefault();

        try {
            post(`/transaction/parking-guest`);
            console.log(data);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const formatToIDR = (number) => {
        const formattedNumber = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
        return formattedNumber;
    };

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
        {
            header: "Aksi",
            cell: ({ row }) => {
                const parkingGuest = row.original;

                const [isModalOpen, setIsModalOpen] = useState(false);

                const { data, setData, patch, processing, reset, errors } =
                    useForm({
                        date: parkingGuest.date,
                        vehicleType_id: parkingGuest.vehicleType_id,
                        count: parkingGuest.count,
                        isCustomFee: parkingGuest.isCustomFee,
                        fee: parkingGuest.fee,
                        description: parkingGuest.description,
                    });

                const handleSubmit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/transaction/parking-guest/${parkingGuest.id}`);
                        setIsModalOpen(false);
                        reset();
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                };

                return (
                    <>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="py-2 px-5 font-lato bg-yellow-500 text-white rounded-md mb-2"
                        >
                            Edit
                        </button>
                        <Transition show={isModalOpen}>
                            <Dialog
                                className="relative z-10"
                                onClose={setIsModalOpen}
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
                                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <div className="font-lato text-2xl px-5 py-4 flex justify-between items-center">
                                                            <DialogTitle>
                                                                Edit
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
                                                    <form
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <div>
                                                            <div className="font-lato text-2xl px-5 py-4 flex justify-between items-center">
                                                                <div className="flex flex-col w-full gap-2">
                                                                    <div>
                                                                        <InputLabel
                                                                            htmlFor="date"
                                                                            value="Tanggal"
                                                                        />
                                                                        <TextInput
                                                                            id="date"
                                                                            name="date"
                                                                            className="mt-1 block w-full"
                                                                            required
                                                                            type="date"
                                                                            value={
                                                                                data.date
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "date",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        {errors.date && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.date
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <InputLabel
                                                                            htmlFor="vehicleType_id"
                                                                            value="Tipe Kendaraan"
                                                                        />
                                                                        <Select
                                                                            id="vehicleType_id"
                                                                            name="vehicleType_id"
                                                                            aria-label="vehicleType_id"
                                                                            required
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "vehicleType_id",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mt-1"
                                                                        >
                                                                            <option
                                                                                defaultValue={
                                                                                    "Pilih Tipe Kendaraan"
                                                                                }
                                                                                disabled
                                                                            >
                                                                                Pilih
                                                                                Tipe
                                                                                Kendaraan
                                                                            </option>
                                                                            {vehicleTypes.map(
                                                                                (
                                                                                    vehicleType
                                                                                ) => (
                                                                                    <option
                                                                                        key={
                                                                                            vehicleType.id
                                                                                        }
                                                                                        value={
                                                                                            vehicleType.id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            vehicleType.name
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
                                                                        </Select>{" "}
                                                                        {errors.vehicleType_id && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.vehicleType_id
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <InputLabel
                                                                            htmlFor="count"
                                                                            value="Jumlah"
                                                                        />
                                                                        <TextInput
                                                                            id="count"
                                                                            name="count"
                                                                            className="mt-1 block w-full"
                                                                            required
                                                                            type="number"
                                                                            min="1"
                                                                            value={
                                                                                data.count
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "count",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        {errors.count && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.count
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Field className="flex items-center gap-2">
                                                                            <Checkbox
                                                                                checked={
                                                                                    data.isCustomFee
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onChange={() =>
                                                                                    setData(
                                                                                        "isCustomFee",
                                                                                        !data.isCustomFee
                                                                                    )
                                                                                }
                                                                                name="isCustomFee"
                                                                                className="group border border-gray-300 block size-4 rounded bg-white data-[checked]:bg-blue-500"
                                                                            >
                                                                                <svg
                                                                                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                                                                                    viewBox="0 0 14 14"
                                                                                    fill="none"
                                                                                >
                                                                                    <path
                                                                                        d="M3 8L6 11L11 3.5"
                                                                                        strokeWidth={
                                                                                            2
                                                                                        }
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                    />
                                                                                </svg>
                                                                            </Checkbox>
                                                                            <Label className="text-sm text-gray-700 border-gray-300">
                                                                                Custom
                                                                                Harga
                                                                            </Label>
                                                                        </Field>
                                                                    </div>
                                                                    {data.isCustomFee ? (
                                                                        <div>
                                                                            <InputLabel
                                                                                htmlFor="fee"
                                                                                value="Harga"
                                                                            />
                                                                            <TextInput
                                                                                id="fee"
                                                                                name="fee"
                                                                                className="mt-1 block w-full"
                                                                                required
                                                                                type="number"
                                                                                value={
                                                                                    data.fee
                                                                                }
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    setData(
                                                                                        "fee",
                                                                                        event
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ) : null}
                                                                    <div>
                                                                        <InputLabel
                                                                            htmlFor="description"
                                                                            value="Deskripsi"
                                                                        />
                                                                        <Textarea
                                                                            id="description"
                                                                            name="description"
                                                                            className="mt-1 block w-full resize-none border border-gray-300 rounded"
                                                                            type="text"
                                                                            rows={
                                                                                5
                                                                            }
                                                                            value={
                                                                                data.description
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "description",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        ></Textarea>
                                                                        {errors.description && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.description
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <hr className="border border-gray-200" />
                                                            <div className="font-lato text-2xl px-5 py-4 flex justify-end items-center">
                                                                <button
                                                                    type="submit"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                    className="py-2 px-4 rounded-lg text-lg bg-blue-700 text-white font-lato disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                                                                >
                                                                    Simpan
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
                    </>
                );
            },
        },
    ];

    const onStartDateHandler = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setFrom(formattedDate);
    };

    const onEndDateHandler = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setTo(formattedDate);
    };

    const onResetHandler = () => {
        setIsSorted(false);
        setFrom(formattedSortDate);
        setTo(formattedDate);
    };

    console.log(new Date(from).toISOString().split("T")[0]), to;
    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Data Parkir">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex justify-center items-center gap-2">
                        <form
                            onSubmit={handleSortDate}
                            className="flex justify-center items-center gap-2"
                        >
                            <Field className="flex justify-center items-center gap-1">
                                <Label htmlFor="from">Dari: </Label>
                                <DatePicker
                                    selected={from}
                                    onChange={onStartDateHandler}
                                    className="rounded-md font-chivoMono"
                                    dateFormat={"YYYY-MM-dd"}
                                />
                            </Field>
                            <Field className="flex justify-center items-center gap-1">
                                <Label htmlFor="to">Sampai: </Label>
                                <DatePicker
                                    selected={to}
                                    onChange={onEndDateHandler}
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

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="py-2 px-4 rounded-lg text-lg bg-blue-700 text-white font-lato"
                    >
                        Tambah
                    </button>
                </div>
                <Transition show={isModalOpen}>
                    <Dialog className="relative z-10" onClose={setIsModalOpen}>
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
                                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <div className="font-lato text-2xl px-5 py-4 flex justify-between items-center">
                                                    <DialogTitle>
                                                        Tambah Data Parkir
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
                                            <form onSubmit={submitHandler}>
                                                <div>
                                                    <div className="font-lato text-2xl px-5 py-4 flex justify-between items-center">
                                                        <div className="flex flex-col w-full gap-2">
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="date"
                                                                    value="Tanggal"
                                                                />
                                                                <TextInput
                                                                    id="date"
                                                                    name="date"
                                                                    className="mt-1 block w-full"
                                                                    required
                                                                    type="date"
                                                                    value={
                                                                        data.date
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "date",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {errors.date && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.date
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="vehicleType_id"
                                                                    value="Tipe Kendaraan"
                                                                />
                                                                <Select
                                                                    id="vehicleType_id"
                                                                    name="vehicleType_id"
                                                                    aria-label="vehicleType_id"
                                                                    required
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "vehicleType_id",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mt-1"
                                                                >
                                                                    <option
                                                                        defaultValue={
                                                                            "Pilih Tipe Kendaraan"
                                                                        }
                                                                        disabled
                                                                    >
                                                                        Pilih
                                                                        Tipe
                                                                        Kendaraan
                                                                    </option>
                                                                    {vehicleTypes.map(
                                                                        (
                                                                            vehicleType
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    vehicleType.id
                                                                                }
                                                                                value={
                                                                                    vehicleType.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    vehicleType.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </Select>{" "}
                                                                {errors.vehicleType_id && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.vehicleType_id
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="count"
                                                                    value="Jumlah"
                                                                />
                                                                <TextInput
                                                                    id="count"
                                                                    name="count"
                                                                    className="mt-1 block w-full"
                                                                    required
                                                                    type="number"
                                                                    min="1"
                                                                    value={
                                                                        data.count
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "count",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {errors.count && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.count
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <Field className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={
                                                                            data.isCustomFee
                                                                        }
                                                                        value={
                                                                            data.isCustomFee
                                                                        }
                                                                        onChange={() =>
                                                                            setData(
                                                                                "isCustomFee",
                                                                                !data.isCustomFee
                                                                            )
                                                                        }
                                                                        name="isCustomFee"
                                                                        className="group border border-gray-300 block size-4 rounded bg-white data-[checked]:bg-blue-500"
                                                                    >
                                                                        <svg
                                                                            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                                                                            viewBox="0 0 14 14"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                d="M3 8L6 11L11 3.5"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </Checkbox>
                                                                    <Label className="text-sm text-gray-700 border-gray-300">
                                                                        Custom
                                                                        Harga
                                                                    </Label>
                                                                </Field>
                                                            </div>
                                                            {data.isCustomFee && (
                                                                <div>
                                                                    <InputLabel
                                                                        htmlFor="fee"
                                                                        value="Harga"
                                                                    />
                                                                    <TextInput
                                                                        id="fee"
                                                                        name="fee"
                                                                        className="mt-1 block w-full"
                                                                        required
                                                                        type="number"
                                                                        value={
                                                                            data.fee
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            setData(
                                                                                "fee",
                                                                                event
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="description"
                                                                    value="Deskripsi"
                                                                />
                                                                <Textarea
                                                                    id="description"
                                                                    name="description"
                                                                    className="mt-1 block w-full resize-none border border-gray-300 rounded"
                                                                    type="text"
                                                                    rows={5}
                                                                    value={
                                                                        data.description
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "description",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                ></Textarea>
                                                                {errors.description && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.description
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className="border border-gray-200" />
                                                    <div className="font-lato text-2xl px-5 py-4 flex justify-end items-center">
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                            className="py-2 px-4 rounded-lg text-lg bg-blue-700 text-white font-lato disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                                                        >
                                                            Tambah
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

export default ParkingGuest;
