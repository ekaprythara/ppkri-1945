import { Link, usePage } from "@inertiajs/react";
import { FaCaretDown } from "react-icons/fa";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const AuthenticatedNavbar = ({ user }) => {
    const { url } = usePage();

    return (
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center font-inter text-lg">
            <div className="flex justify-center items-center gap-5">
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
                            className="flex flex-col bg-[#ffe] shadow-md text-gray-800 rounded-md mt-2 min-w-32 z-10 font-inter text-base"
                        >
                            <Link
                                href="/master-data/vehicle-type"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Tipe Kendaraan
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/master-data/agent"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Agen
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/master-data/driver"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Supir
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/master-data/ticket"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Harga Tiket
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/master-data/facility"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Fasilitas
                            </Link>
                        </PopoverPanel>
                    </Popover>
                    <Popover className="relative">
                        <PopoverButton
                            className={`py-2 px-4 hover:ring-blue-700 ${
                                url.startsWith("/transaksi")
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
                            className="flex flex-col bg-[#ffe] shadow-md text-gray-800 rounded-md mt-2 min-w-32 z-10 font-inter text-base"
                        >
                            <Link
                                href="/transaksi/parkir"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Parkir
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/transaksi/tamu-reguler"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Tamu Reguler
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/transaksi/tamu-agen"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Tamu Agen
                            </Link>
                        </PopoverPanel>
                    </Popover>

                    <Popover className="relative">
                        <PopoverButton
                            className={`py-2 px-4 hover:ring-blue-700 ${
                                url.startsWith("/laporan")
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
                            className="flex flex-col bg-[#ffe] shadow-md text-gray-800 rounded-md mt-2 min-w-32 z-10 font-inter text-base"
                        >
                            <Link
                                href="/laporan/parkir"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Parkir
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/laporan/tamu-reguler"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Tamu Reguler
                            </Link>
                            <hr className="ms-3" />
                            <Link
                                href="/laporan/tamu-agen"
                                className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                            >
                                Tamu Agen
                            </Link>
                        </PopoverPanel>
                    </Popover>
                </div>
            </div>

            <Popover className="relative">
                <PopoverButton
                    className={`py-2 px-4 hover:ring-blue-700 ${
                        url === "/report" ? "text-blue-700" : "text-gray-800"
                    }`}
                >
                    <div className="flex justify-center items-center gap-2">
                        <span>{user.name}</span>
                        <FaCaretDown size={20} />
                    </div>
                </PopoverButton>

                <PopoverPanel
                    anchor="bottom end"
                    className="flex flex-col bg-[#ffe] shadow-md text-gray-800 rounded-md mt-2 min-w-32 z-10 font-inter text-base"
                >
                    <Link
                        href="/profile"
                        className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2"
                    >
                        Profil
                    </Link>
                    <hr className="ms-3" />
                    <div>
                        <Link
                            as="button"
                            method="post"
                            href={route("logout")}
                            className="hover:bg-gray-300 text-gray-700 ps-3 pe-2 py-2 w-full flex justify-start"
                        >
                            Logout
                        </Link>
                    </div>
                </PopoverPanel>
            </Popover>
        </nav>
    );
};

export default AuthenticatedNavbar;
