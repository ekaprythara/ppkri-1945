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
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Modal from "@/Components/Modal";
import WarningButton from "@/Components/Button/WarningButton";

const Facility = ({ auth, facilities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            post(`/master-data/facility`);
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
            header: "Aksi",
            cell: ({ row }) => {
                const facility = row.original;

                const [isEditModalOpen, setIsEditModalOpen] = useState(false);

                const { data, setData, patch, reset } = useForm({
                    name: facility.name,
                });

                const handleEdit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/master-data/facility/${facility.id}`);
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
            <Card title="Data Fasilitas">
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
                        </div>
                    </div>
                </Modal>

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable columns={columns} data={facilities} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Facility;
