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
    Field,
    Input,
    Label,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import WarningButton from "@/Components/Button/WarningButton";

const Ticket = ({ auth, tickets }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        price: "",
        unit: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            post(`/master-data/ticket`);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("An error occurred:", error);
        }
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
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "price",
            header: "Harga",
            cell: (props) => {
                const price = props.getValue();
                const formattedPrice = formatToIDR(price);
                return formattedPrice;
            },
        },
        {
            accessorKey: "unit",
            header: "Satuan",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const ticket = row.original;

                const [isEditModalOpen, setIsEditModalOpen] = useState(false);

                const { data, setData, patch, processing, reset, errors } =
                    useForm({
                        name: ticket.name,
                        price: ticket.price,
                        unit: ticket.unit,
                    });

                const handleEdit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/master-data/ticket/${ticket.id}`);
                        setIsEditModalOpen(false);
                        reset();
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                };

                return (
                    <>
                        <WarningButton onClick={() => setIsEditModalOpen(true)}>
                            Edit
                        </WarningButton>
                        <Modal
                            show={isEditModalOpen}
                            onClose={setIsEditModalOpen}
                            title="Edit"
                            onSubmit={handleEdit}
                            submitButtonName="Simpan"
                            accent="primary"
                        >
                            <div className="font-inter text-2xl px-5 py-4 flex justify-between items-center">
                                <div className="flex flex-col w-full gap-2">
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="name"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Nama Tiket
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(event) =>
                                                setData(
                                                    "name",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="price"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Harga
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={(event) =>
                                                setData(
                                                    "price",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="unit"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Satuan
                                        </Label>
                                        <Input
                                            id="unit"
                                            value={data.unit}
                                            onChange={(event) =>
                                                setData(
                                                    "unit",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Modal>
                    </>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Data Tiket">
                <div className="flex justify-end items-center px-2">
                    <PrimaryButton onClick={() => setIsModalOpen(true)}>
                        Tambah
                    </PrimaryButton>
                </div>
                <Modal
                    show={isModalOpen}
                    onClose={setIsModalOpen}
                    title="Tambah"
                    onSubmit={handleSubmit}
                    submitButtonName="Tambah"
                    accent="primary"
                >
                    <div className="font-inter text-2xl px-5 py-4 flex justify-between items-center">
                        <div className="flex flex-col w-full gap-2">
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="name"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Nama Tiket
                                </Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData("name", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="price"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Harga
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(event) =>
                                        setData("price", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="unit"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Satuan
                                </Label>
                                <Input
                                    id="unit"
                                    value={data.unit}
                                    onChange={(event) =>
                                        setData("unit", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                        </div>
                    </div>
                </Modal>

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable columns={columns} data={tickets} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Ticket;
