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
    Select,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Modal from "@/Components/Modal";
import WarningButton from "@/Components/Button/WarningButton";

const Driver = ({ auth, drivers, agents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: "",
        phone_number: "",
        agent_id: "" | 1,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            post(`/master-data/driver`);
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
            accessorKey: "phone_number",
            header: "No. Telp",
        },
        {
            accessorFn: (row) => {
                return row.agent.name;
            },
            header: "Agen",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const driver = row.original;

                const [isEditModalOpen, setIsEditModalOpen] = useState(false);

                const { data, setData, patch, processing, reset, errors } =
                    useForm({
                        name: driver.name,
                        phone_number: driver.phone_number,
                        agent_id: driver.agent_id,
                    });

                const handleEdit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/master-data/driver/${driver.id}`);
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
                                    <Field className="flex flex-col gap-1 w-full">
                                        <Label
                                            htmlFor="agent_id"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Pilih Agen
                                        </Label>
                                        <Select
                                            id="agent_id"
                                            value={data.agent_id}
                                            required
                                            onChange={(event) =>
                                                setData(
                                                    "agent_id",
                                                    event.target.value
                                                )
                                            }
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                        >
                                            {agents.map((agent) => (
                                                <option
                                                    key={agent.id}
                                                    value={agent.id}
                                                >
                                                    {agent.name}
                                                </option>
                                            ))}
                                        </Select>
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
            <Card title="Data Supir">
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
                            <Field className="flex flex-col gap-1 w-full">
                                <Label
                                    htmlFor="agent_id"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Pilih Agen
                                </Label>
                                <Select
                                    id="agent_id"
                                    value={data.agent_id}
                                    required
                                    onChange={(event) =>
                                        setData("agent_id", event.target.value)
                                    }
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                >
                                    {agents.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                        </div>
                    </div>
                </Modal>

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable columns={columns} data={drivers} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Driver;
