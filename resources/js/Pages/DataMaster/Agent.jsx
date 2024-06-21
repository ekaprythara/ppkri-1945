import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { DataTable } from "../DataTables/DataTable";

import { Field, Input, Label } from "@headlessui/react";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Modal from "@/Components/Modal";
import WarningButton from "@/Components/Button/WarningButton";

const Agent = ({ auth, agents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: "",
        address: "",
        email: "",
        phone_number: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            post("/master-data/agent");
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
            accessorKey: "address",
            header: "Alamat",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone_number",
            header: "No. Telepon",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const agent = row.original;

                const [isEditModalOpen, setIsEditModalOpen] = useState(false);

                const { data, setData, patch, reset } = useForm({
                    name: agent.name,
                    address: agent.address,
                    email: agent.email,
                    phone_number: agent.phone_number,
                });

                const handleEdit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/master-data/agent/${agent.id}`);
                        setIsEditModalOpen(false);
                        console.log(data);
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
                                <div className="flex flex-col gap-2 w-full">
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="name"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Nama
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
                                            htmlFor="address"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Alamat
                                        </Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(event) =>
                                                setData(
                                                    "address",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="email"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(event) =>
                                                setData(
                                                    "email",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="phone_number"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            No. Telepon
                                        </Label>
                                        <Input
                                            id="phone_number"
                                            type="tel"
                                            value={data.phone_number}
                                            onChange={(event) =>
                                                setData(
                                                    "phone_number",
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
            <Card title="Data Agen">
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
                        <div className="flex flex-col gap-2 w-full">
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="name"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Nama
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
                                    htmlFor="address"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Alamat
                                </Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(event) =>
                                        setData("address", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="email"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData("email", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="phone_number"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    No. Telepon
                                </Label>
                                <Input
                                    id="phone_number"
                                    type="tel"
                                    value={data.phone_number}
                                    onChange={(event) =>
                                        setData(
                                            "phone_number",
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

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable columns={columns} data={agents} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Agent;
