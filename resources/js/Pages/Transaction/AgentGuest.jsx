import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";

import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { DataTable } from "../DataTables/DataTable";
import "react-datepicker/dist/react-datepicker.css";

import {
    Checkbox,
    Field,
    Input,
    Label,
    Select,
    Textarea,
} from "@headlessui/react";

import DatePicker from "react-datepicker";
import { LuFilter, LuFilterX } from "react-icons/lu";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import DangerButton from "@/Components/Button/DangerButton";
import Modal from "@/Components/Modal";
import WarningButton from "@/Components/Button/WarningButton";

const AgentGuest = ({
    auth,
    agentGuests,
    agents,
    agentHasDriver,
    tickets,
    drivers,
}) => {
    const dateToday = new Date().toLocaleDateString("en-CA");

    const filteredTickets = tickets.filter((ticket) => ticket.id !== 1);

    const relatedAgents = agentHasDriver.map((driver) => driver.agent);

    // Use a Set to track unique objects based on 'name' and 'id'
    const uniqueData = Array.from(
        new Set(
            relatedAgents.map((item) =>
                JSON.stringify({ name: item.name, id: item.id })
            )
        )
    ).map((str) => JSON.parse(str));

    // State to manage the range of date for filtering
    const [from, setFrom] = useState(dateToday);
    const [to, setTo] = useState(dateToday);

    // State to store the sorted data
    const [isSorted, setIsSorted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const [agent, setAgent] = useState(1);

    // State to store the data filtered by the selected date range
    const [dataToday, setDataToday] = useState([]);

    // Effect to filter and sort parking data based on the selected date range
    useEffect(() => {
        const filteredData = agentGuests.filter((item) => {
            const date = item.date;
            return date >= from && date <= to;
        });
        const sortedData = filteredData.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        setDataToday(sortedData);
    }, [agentGuests]);

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
        const filteredData = agentGuests.filter((item) => {
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

    useEffect(() => {
        const driver = drivers.filter((driver) => driver.agent_id == agent);
        setFilteredDrivers(driver);
        const selectedDriver = driver.find((item) => item);
        setData("driver_id", selectedDriver.id);
    }, [agent]);

    // Function to handle form submission
    const { data, setData, post, reset } = useForm({
        date: dateToday,
        driver_id: "",
        count: "",
        ticket_id: "" | 2,
        isCustomPrice: false,
        price: "",
        description: "",
    });

    const handleInputDateChange = (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-CA");
        setData("date", formattedDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            post(`/transaksi/tamu-agen`);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("An error occurred: ", error);
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
            accessorFn: (row) => {
                const date = new Date(row.date).toLocaleDateString("en-CA");
                return date;
            },
            header: "Tanggal",
        },

        {
            accessorFn: (row) => {
                return row.driver.agent.name;
            },
            header: "Agen",
        },
        {
            accessorFn: (row) => {
                const driver = drivers.find(
                    (driver) => driver.id === row.driver_id
                );
                return driver.name;
            },
            header: "Supir",
        },
        {
            accessorKey: "count",
            header: "Jumlah",
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
            accessorFn: (row) => {
                return row.description ? row.description : "";
            },
            header: "Keterangan",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                const agentGuest = row.original;

                const [isEditModalOpen, setIsEditModalOpen] = useState(false);
                const [isDeleteModalOpen, setIsDeleteModalOpen] =
                    useState(false);

                const [filteredDriversEdit, setFilteredDriversEdit] = useState(
                    []
                );
                const [agentEdit, setAgentEdit] = useState(
                    agentGuest.driver.agent.id
                );

                useEffect(() => {
                    const driver = drivers.filter(
                        (driver) => driver.agent_id == agentEdit
                    );
                    setFilteredDriversEdit(driver);
                    const selectedDriver = driver.find((item) => item);
                    setData("driver_id", selectedDriver.id);
                }, [agentEdit]);

                // Function to handle form submission
                const { data, setData, patch } = useForm({
                    date: agentGuest.date,
                    driver_id: agentGuest.driver_id,
                    count: agentGuest.count,
                    ticket_id: agentGuest.ticket_id,
                    isCustomPrice: agentGuest.isCustomPrice,
                    price: agentGuest.price,
                    description: agentGuest.description,
                });

                const handleEditDateChange = (date) => {
                    const formattedDate = new Date(date).toLocaleDateString(
                        "en-CA"
                    );
                    setData("date", formattedDate);
                };

                const handleEdit = (event) => {
                    event.preventDefault();
                    try {
                        patch(`/transaksi/tamu-agen/${agentGuest.id}`);
                        setIsEditModalOpen(false);
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                };

                // Function to handle delete
                const handleDelete = () => {
                    router.post(
                        `/transaksi/tamu-agen/${agentGuest.id}/delete`,
                        {
                            _method: "delete",
                        }
                    );
                };

                return (
                    <>
                        <div className="flex justify-center items-center gap-2">
                            <WarningButton
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                Edit
                            </WarningButton>
                            <DangerButton
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                Hapus
                            </DangerButton>
                        </div>
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
                                            htmlFor="date"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Tanggal
                                        </Label>
                                        <DatePicker
                                            id="date"
                                            selected={data.date}
                                            value={data.date}
                                            onChange={handleEditDateChange}
                                            dateFormat={"yyyy-MM-dd"}
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter w-full"
                                        />
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="agent"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Agen
                                        </Label>
                                        <Select
                                            id="agent"
                                            value={agentEdit}
                                            required
                                            onChange={(e) => {
                                                setAgentEdit(e.target.value);
                                            }}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                        >
                                            {uniqueData.map((agent) => (
                                                <option
                                                    key={agent.id}
                                                    value={agent.id}
                                                >
                                                    {agent.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="driver_id"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Supir
                                        </Label>
                                        <Select
                                            id="driver_id"
                                            value={data.driver_id}
                                            onChange={(event) =>
                                                setData(
                                                    "driver_id",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                        >
                                            {filteredDriversEdit.map(
                                                (driver) => (
                                                    <option
                                                        key={driver.id}
                                                        value={driver.id}
                                                    >
                                                        {driver.name}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </Field>
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="count"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Jumlah
                                        </Label>
                                        <Input
                                            id="count"
                                            type="number"
                                            min="1"
                                            value={data.count}
                                            onChange={(event) =>
                                                setData(
                                                    "count",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                    </Field>
                                    {!data.isCustomPrice && (
                                        <Field className="flex flex-col gap-1">
                                            <Label
                                                htmlFor="ticket_id"
                                                className="font-medium text-sm text-gray-700"
                                            >
                                                Tiket
                                            </Label>
                                            <Select
                                                id="ticket_id"
                                                value={data.ticket_id}
                                                onChange={(event) =>
                                                    setData(
                                                        "ticket_id",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                            >
                                                {filteredTickets.map(
                                                    (ticket) => (
                                                        <option
                                                            key={ticket.id}
                                                            value={ticket.id}
                                                        >
                                                            {`${
                                                                ticket.name
                                                            } — ${formatToIDR(
                                                                ticket.price
                                                            )}`}
                                                        </option>
                                                    )
                                                )}
                                            </Select>
                                        </Field>
                                    )}
                                    <Field className="flex items-center gap-2">
                                        <Checkbox
                                            id="isCustomPrice"
                                            checked={
                                                data.isCustomPrice
                                                    ? true
                                                    : false
                                            }
                                            onChange={() =>
                                                setData(
                                                    "isCustomPrice",
                                                    !data.isCustomPrice
                                                )
                                            }
                                            className="group border border-gray-300 block size-4 rounded bg-white data-[checked]:bg-blue-500"
                                        >
                                            <svg
                                                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3 8L6 11L11 3.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Checkbox>
                                        <Label
                                            htmlFor="isCustomPrice"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Custom Harga
                                        </Label>
                                    </Field>
                                    {data.isCustomPrice ? (
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
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                required
                                            />
                                        </Field>
                                    ) : null}
                                    <Field className="flex flex-col gap-1">
                                        <Label
                                            htmlFor="description"
                                            className="font-medium text-sm text-gray-700"
                                        >
                                            Deskripsi
                                        </Label>
                                        <Textarea
                                            id="description"
                                            type="text"
                                            rows="5"
                                            value={data.description || ""}
                                            onChange={(event) =>
                                                setData(
                                                    "description",
                                                    event.target.value
                                                )
                                            }
                                            className="mt-1 block w-full resize-none border border-gray-300 rounded"
                                        ></Textarea>
                                    </Field>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            show={isDeleteModalOpen}
                            onClose={setIsDeleteModalOpen}
                            title="Hapus"
                            onSubmit={handleDelete}
                            submitButtonName="Hapus"
                            accent="danger"
                        >
                            <div className="font-inter text-lg text-gray-800 px-5 py-4 flex justify-between items-center">
                                <span>
                                    Apakah Anda ingin menghapus data ini?
                                </span>
                            </div>
                        </Modal>
                    </>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Card title="Transaksi Tamu Agen">
                <div className="flex flex-row justify-between items-center px-2 gap-2">
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
                                    htmlFor="date"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Tanggal
                                </Label>
                                <DatePicker
                                    id="date"
                                    selected={data.date}
                                    value={data.date}
                                    onChange={handleInputDateChange}
                                    dateFormat={"yyyy-MM-dd"}
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-inter w-full"
                                />
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="agent"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Agen
                                </Label>
                                <Select
                                    id="agent"
                                    required
                                    onChange={(e) => {
                                        setAgent(e.target.value);
                                    }}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                >
                                    {uniqueData.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="driver_id"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Supir
                                </Label>
                                <Select
                                    id="driver_id"
                                    value={data.driver_id}
                                    onChange={(event) =>
                                        setData("driver_id", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                >
                                    {filteredDrivers.map((driver) => (
                                        <option
                                            key={driver.id}
                                            value={driver.id}
                                        >
                                            {driver.name}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="count"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Jumlah
                                </Label>
                                <Input
                                    id="count"
                                    type="number"
                                    min="1"
                                    value={data.count}
                                    onChange={(event) =>
                                        setData("count", event.target.value)
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </Field>
                            {!data.isCustomPrice && (
                                <Field className="flex flex-col gap-1">
                                    <Label
                                        htmlFor="ticket_id"
                                        className="font-medium text-sm text-gray-700"
                                    >
                                        Tiket
                                    </Label>
                                    <Select
                                        id="ticket_id"
                                        value={data.ticket_id}
                                        onChange={(event) =>
                                            setData(
                                                "ticket_id",
                                                event.target.value
                                            )
                                        }
                                        required
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                    >
                                        {filteredTickets.map((ticket) => (
                                            <option
                                                key={ticket.id}
                                                value={ticket.id}
                                            >
                                                {`${
                                                    ticket.name
                                                } — ${formatToIDR(
                                                    ticket.price
                                                )}`}
                                            </option>
                                        ))}
                                    </Select>
                                </Field>
                            )}
                            <Field className="flex items-center gap-2">
                                <Checkbox
                                    id="isCustomPrice"
                                    onChange={() =>
                                        setData(
                                            "isCustomPrice",
                                            !data.isCustomPrice
                                        )
                                    }
                                    className="group border border-gray-300 block size-4 rounded bg-white data-[checked]:bg-blue-500"
                                >
                                    <svg
                                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M3 8L6 11L11 3.5"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Checkbox>
                                <Label
                                    htmlFor="isCustomPrice"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Custom Harga
                                </Label>
                            </Field>
                            {data.isCustomPrice ? (
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
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    />
                                </Field>
                            ) : null}
                            <Field className="flex flex-col gap-1">
                                <Label
                                    htmlFor="description"
                                    className="font-medium text-sm text-gray-700"
                                >
                                    Deskripsi
                                </Label>
                                <Textarea
                                    id="description"
                                    type="text"
                                    rows="5"
                                    value={data.description || ""}
                                    onChange={(event) =>
                                        setData(
                                            "description",
                                            event.target.value
                                        )
                                    }
                                    className="mt-1 block w-full resize-none border border-gray-300 rounded"
                                ></Textarea>
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

export default AgentGuest;
