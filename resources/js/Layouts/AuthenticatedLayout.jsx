import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { FaCaretDown, FaChevronDown } from "react-icons/fa";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function Authenticated({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { url } = usePage();

    return (
        <div className="h-16 bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center font-lato text-lg">
                <div className="flex items-center gap-8">
                    <Link href="/">Monumen PPKRI 1945</Link>
                    <div className="lg:flex justify-center items-center gap-2 hidden">
                        <Link
                            href={route("dashboard")}
                            className={`py-2 px-4 hover:ring-blue-700 ${
                                url === "/dashboard"
                                    ? "text-blue-700"
                                    : "text-gray-800"
                            }`}
                        >
                            Dashboard
                        </Link>
                        {user.level_id == 1 ? (
                            <Link
                                href={route("user")}
                                className={`py-2 px-4 hover:ring-blue-700 ${
                                    url === "/user"
                                        ? "text-blue-700"
                                        : "text-gray-800"
                                }`}
                            >
                                Pengguna
                            </Link>
                        ) : null}
                        <Popover className="relative">
                            <PopoverButton
                                className={`py-2 px-4 hover:ring-blue-700 ${
                                    url.startsWith("/master-data")
                                        ? "text-blue-700"
                                        : "text-gray-800"
                                }`}
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <span>Data Master</span>
                                    <FaCaretDown size={20} />
                                </div>
                            </PopoverButton>
                            <PopoverPanel
                                anchor="bottom"
                                className="flex flex-col bg-white shadow text-gray-800 rounded-md p-1 mt-2 gap-1 z-10 font-lato text-lg"
                            >
                                <Link
                                    href="/master-data/vehicle-type"
                                    className={`hover:bg-blue-600 hover:text-white px-2 py-2 rounded-md ${
                                        url === "/master-data/vehicle-type"
                                            ? "text-white bg-gray-300"
                                            : "text-black"
                                    }`}
                                >
                                    Tipe Kendaraan
                                </Link>
                                <Link
                                    href="/master-data/agent"
                                    className={`hover:bg-blue-600 hover:text-white px-2 py-2 rounded-md ${
                                        url === "/master-data/agent"
                                            ? "text-white bg-gray-300"
                                            : "text-black"
                                    }`}
                                >
                                    Agen
                                </Link>
                                <Link
                                    href="/master-data/driver"
                                    className={`hover:bg-blue-600 hover:text-white px-2 py-2 rounded-md ${
                                        url === "/master-data/driver"
                                            ? "text-white bg-gray-300"
                                            : "text-black"
                                    }`}
                                >
                                    Supir
                                </Link>
                                <Link
                                    href="/master-data/ticket"
                                    className={`hover:bg-blue-600 hover:text-white px-2 py-2 rounded-md ${
                                        url === "/master-data/ticket"
                                            ? "text-white bg-gray-300"
                                            : "text-black"
                                    }`}
                                >
                                    Harga Tiket
                                </Link>
                                <Link
                                    href="/master-data/facility"
                                    className={`hover:bg-blue-600 hover:text-white px-2 py-2 rounded-md ${
                                        url === "/master-data/facility"
                                            ? "text-white bg-gray-300"
                                            : "text-black"
                                    }`}
                                >
                                    Fasilitas
                                </Link>
                            </PopoverPanel>
                        </Popover>
                        <Popover className="relative">
                            <PopoverButton
                                className={`py-2 px-4 hover:ring-blue-700 ${
                                    url.startsWith("/transaction")
                                        ? "text-blue-700"
                                        : "text-gray-800"
                                }`}
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <span>Transaksi</span>
                                    <FaCaretDown size={20} />
                                </div>
                            </PopoverButton>
                            <PopoverPanel
                                anchor="bottom"
                                className="flex flex-col bg-white shadow-md text-gray-800 rounded-md p-1 mt-2 w-32 gap-1 z-10 font-lato text-lg"
                            >
                                <Link
                                    href="/transaction/parking-guest"
                                    className="hover:bg-blue-600 text-black hover:text-white px-2 py-2 rounded-md"
                                >
                                    Parkir
                                </Link>
                                <Link
                                    href="/transaction/guest"
                                    className="hover:bg-blue-600 text-black hover:text-white px-2 py-2 rounded-md"
                                >
                                    Tamu
                                </Link>
                            </PopoverPanel>
                        </Popover>
                        <Popover className="relative">
                            <PopoverButton
                                className={`py-2 px-4 hover:ring-blue-700 ${
                                    url === "/report"
                                        ? "text-blue-700"
                                        : "text-gray-800"
                                }`}
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <span>Laporan</span>
                                    <FaCaretDown size={20} />
                                </div>
                            </PopoverButton>
                            <PopoverPanel
                                anchor="bottom"
                                className="flex flex-col bg-white shadow text-gray-800 rounded-md p-2 mt-2 w-28 gap-1 z-10 font-lato text-lg"
                            >
                                <Link
                                    href="/report/parking-guest"
                                    className="hover:bg-blue-600 text-black hover:text-white px-2 py-2 rounded-md"
                                >
                                    Parkir
                                </Link>
                                <Link
                                    href="/report/guest"
                                    className="hover:bg-blue-600 text-black hover:text-white px-2 py-2 rounded-md"
                                >
                                    Tamu
                                </Link>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </div>

                <Popover className="relative">
                    <PopoverButton
                        className={`py-2 px-4 hover:ring-blue-700 ${
                            url === "/report"
                                ? "text-blue-700"
                                : "text-gray-800"
                        }`}
                    >
                        <div className="flex justify-center items-center gap-2">
                            <span>{user.name}</span>
                            <FaCaretDown size={20} />
                        </div>
                    </PopoverButton>
                    <PopoverPanel
                        anchor="bottom"
                        className="flex flex-col bg-gray-400 text-white rounded-md p-2 mt-2 w-28 gap-1 z-10 font-lato text-lg"
                    >
                        <Link
                            href="/profile"
                            as="button"
                            className="hover:bg-gray-200 px-2 py-1 rounded-md"
                        >
                            Profil
                        </Link>
                        <Link
                            as="button"
                            method="post"
                            href={route("logout")}
                            className="hover:bg-gray-200 px-2 py-1 rounded-md"
                        >
                            Logout
                        </Link>
                    </PopoverPanel>
                </Popover>
            </nav>
            <main className="bg-[#EEF7FF] min-h-[calc(100vh-4rem)] pb-20">
                {children}
            </main>
        </div>
    );
}
