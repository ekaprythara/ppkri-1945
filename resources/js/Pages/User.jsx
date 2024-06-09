import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Select,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { LiaTimesSolid } from "react-icons/lia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { DataTable } from "./DataTables/DataTable";
import InputError from "@/Components/InputError";

const User = ({ auth, users, levels }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
        level_id: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        try {
            console.log(data);
            post("/register");
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
            accessorKey: "username",
            header: "Nama Pengguna",
        },
        {
            accessorKey: "phone_number",
            header: "No. Telepon",
        },
        {
            accessorKey: "level_id",
            header: "Level",
            cell: (props) => (
                <p>
                    {levels.map(
                        (level) =>
                            level.id === props.getValue("level_id") &&
                            level.name
                    )}
                </p>
            ),
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Data Pengguna">
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
                                                        Tambah Pengguna
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
                                            <form onSubmit={submit}>
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
                                                                    value={
                                                                        data.name
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    autoComplete="name"
                                                                    isFocused={
                                                                        true
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "name",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    required
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.name
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="username"
                                                                    value="Username"
                                                                />

                                                                <TextInput
                                                                    id="username"
                                                                    type="text"
                                                                    name="username"
                                                                    value={
                                                                        data.username
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    autoComplete="username"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "username",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    required
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.username
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="password"
                                                                    value="Password"
                                                                />

                                                                <TextInput
                                                                    id="password"
                                                                    type="password"
                                                                    name="password"
                                                                    value={
                                                                        data.password
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    autoComplete="new-password"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "password",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    required
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.password
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="password_confirmation"
                                                                    value="Confirm Password"
                                                                />

                                                                <TextInput
                                                                    id="password_confirmation"
                                                                    type="password"
                                                                    name="password_confirmation"
                                                                    value={
                                                                        data.password_confirmation
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    autoComplete="new-password"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "password_confirmation",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    required
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.password_confirmation
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div>
                                                                <InputLabel
                                                                    htmlFor="level_id"
                                                                    value="Level"
                                                                />
                                                                <Select
                                                                    id="level_id"
                                                                    name="level_id"
                                                                    aria-label="Agent"
                                                                    value={
                                                                        data.level_id
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setData(
                                                                            "level_id",
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mt-1"
                                                                >
                                                                    <option
                                                                        defaultValue={
                                                                            data.level_id
                                                                        }
                                                                        disabled
                                                                    >
                                                                        Pilih
                                                                        Level
                                                                    </option>
                                                                    {levels.map(
                                                                        (
                                                                            level
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    level.id
                                                                                }
                                                                                value={
                                                                                    level.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    level.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </Select>
                                                                {errors.level_id && (
                                                                    <InputError
                                                                        className="mt-2"
                                                                        message={
                                                                            errors.level_id
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
                    <DataTable columns={columns} data={users} />
                </div>
            </Card>
        </AuthenticatedLayout>
    );
};

export default User;
