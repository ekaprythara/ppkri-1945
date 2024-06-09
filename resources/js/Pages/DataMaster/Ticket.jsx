import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

import { LiaTimesSolid } from "react-icons/lia";

import Card from "@/Components/Card";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { DataTable } from "../DataTables/DataTable";

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";

const Ticket = ({ auth, tickets }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        price: "",
        unit: "",
    });

    const submitHandler = (event) => {
        event.preventDefault();

        try {
            post(`/master-data/ticket`);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const columns = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "price",
            header: "Harga",
        },
        {
            accessorKey: "unit",
            header: "Satuan",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const ticket = row.original;

                const [isModalOpen, setIsModalOpen] = useState(false);

                const { data, setData, patch, processing, reset, errors } =
                    useForm({
                        name: ticket.name,
                        price: ticket.price,
                        unit: ticket.unit,
                    });

                const handleSubmit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/master-data/ticket/${ticket.id}`);
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
                                                                            htmlFor="name"
                                                                            value="Name"
                                                                        />
                                                                        <TextInput
                                                                            id="name"
                                                                            name="name"
                                                                            className="mt-1 block w-full"
                                                                            isFocused={
                                                                                true
                                                                            }
                                                                            required
                                                                            type="text"
                                                                            value={
                                                                                data.name
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "name",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        {errors.name && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.name
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <InputLabel
                                                                            htmlFor="price"
                                                                            value="Harga"
                                                                        />
                                                                        <TextInput
                                                                            id="price"
                                                                            name="price"
                                                                            className="mt-1 block w-full"
                                                                            required
                                                                            type="text"
                                                                            value={
                                                                                data.price
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "price",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        {errors.price && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.price
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <InputLabel
                                                                            htmlFor="unit"
                                                                            value="Satuan"
                                                                        />
                                                                        <TextInput
                                                                            id="unit"
                                                                            name="unit"
                                                                            className="mt-1 block w-full"
                                                                            required
                                                                            type="text"
                                                                            value={
                                                                                data.unit
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                setData(
                                                                                    "unit",
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        {errors.unit && (
                                                                            <InputError
                                                                                className="mt-2"
                                                                                message={
                                                                                    errors.unit
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Data Tiket">
                <div className="flex justify-end items-center">
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
                                                        Tambah Tiket
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
                                                                    htmlFor="name"
                                                                    value="Name"
                                                                />
                                                                <TextInput
                                                                    id="name"
                                                                    name="name"
                                                                    className="mt-1 block w-full"
                                                                    isFocused={
                                                                        true
                                                                    }
                                                                    required
                                                                    type="text"
                                                                    value={
                                                                        data.name
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "name",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {errors.name && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.name
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="price"
                                                                    value="Harga"
                                                                />
                                                                <TextInput
                                                                    id="price"
                                                                    name="price"
                                                                    className="mt-1 block w-full"
                                                                    required
                                                                    type="text"
                                                                    value={
                                                                        data.price
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "price",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {errors.price && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.price
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="unit"
                                                                    value="Satuan"
                                                                />
                                                                <TextInput
                                                                    id="unit"
                                                                    name="unit"
                                                                    className="mt-1 block w-full"
                                                                    required
                                                                    type="text"
                                                                    value={
                                                                        data.unit
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "unit",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {errors.unit && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.unit
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
                    <DataTable columns={columns} data={tickets} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Ticket;
