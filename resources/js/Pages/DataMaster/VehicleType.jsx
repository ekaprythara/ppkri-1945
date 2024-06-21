import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

import { DataTable } from "../DataTables/DataTable";

import { Field, Input, Label } from "@headlessui/react";

import Card from "@/Components/Card";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import WarningButton from "@/Components/Button/WarningButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const VehicleType = ({ auth, vehicleTypes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        name: "",
        fee: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            post(`/master-data/vehicle-type`);
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
            header: "Tipe Kendaraan",
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
            header: "Aksi",
            cell: ({ row }) => {
                const vehicleType = row.original;

                const [isEditModalOpen, setIsEditModalOpen] = useState(false);

                const { data, setData, patch, processing, reset, errors } =
                    useForm({
                        name: vehicleType.name,
                        fee: vehicleType.fee,
                    });

                const handleEdit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/master-data/vehicle-type/${vehicleType.id}`);
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
                                            htmlFor="fee"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Harga
                                        </Label>
                                        <Input
                                            id="fee"
                                            type="number"
                                            min="1"
                                            value={data.fee}
                                            onChange={(event) =>
                                                setData(
                                                    "fee",
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
            <Card title="Data Tipe Kendaraan">
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
                                    Tipe Kendaraan
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
                                    htmlFor="fee"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Harga
                                </Label>
                                <Input
                                    id="fee"
                                    type="number"
                                    min="1"
                                    value={data.fee}
                                    onChange={(event) =>
                                        setData("fee", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                        </div>
                    </div>
                </Modal>

                <div className="relative overflow-x-auto sm:rounded-lg mt-5">
                    <DataTable columns={columns} data={vehicleTypes} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default VehicleType;
