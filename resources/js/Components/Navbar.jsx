import React from "react";
import logoImg from "../../../public/assets/image/logo.png";
import { usePage, Link } from "@inertiajs/react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { FaCaretDown } from "react-icons/fa";

export const navLinks = [
    {
        href: "/",
        title: "Beranda",
    },
    {
        href: "/collection",
        title: "Koleksi",
    },
    {
        href: "/ticket",
        title: "Tiket",
    },
    {
        href: "/about",
        title: "Tentang",
    },
    {
        href: "/contact",
        title: "Hubungi Kami",
    },
];

const Navbar = () => {
    const { url } = usePage();

    return (
        <div className="bg-[#111] text-base text-white flex justify-between items-center px-16 absolute top-0 font-lato w-full">
            <div>
                <img
                    src={logoImg}
                    alt="Logo Monumen PPKRI 1945"
                    width={100}
                    height={100}
                    className="py-2"
                />
            </div>
            <div className="flex justify-center items-center gap-2">
                <ul className="flex justify-center items-center gap-2">
                    <li>
                        <Link
                            href="/"
                            className={
                                url === "/"
                                    ? "text-white py-2 px-4"
                                    : "text-stone-400 py-2 px-4"
                            }
                        >
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Popover className="relative">
                            <PopoverButton
                                className={
                                    url === "/collections" || url === "/gallery"
                                        ? "text-white py-2 px-4"
                                        : "text-stone-400 py-2 px-4"
                                }
                            >
                                <span className="flex justify-center align-baseline gap-2">
                                    <span>Koleksi</span>
                                    <span>
                                        <FaCaretDown size={20} />
                                    </span>
                                </span>
                            </PopoverButton>
                            <PopoverPanel
                                anchor="bottom"
                                className="flex flex-col bg-[#222] text-white rounded-md py-5 mt-2 gap-2 z-10"
                            >
                                <Link
                                    href="/collections"
                                    className="hover:bg-[#333] px-5 py-1"
                                >
                                    Koleksi
                                </Link>
                                <Link
                                    href="/gallery"
                                    className="hover:bg-[#333] px-5 py-1"
                                >
                                    Galeri
                                </Link>
                            </PopoverPanel>
                        </Popover>
                    </li>
                    <li>
                        <Link
                            href="/ticket"
                            className={
                                url === "/ticket"
                                    ? "text-white py-2 px-4"
                                    : "text-stone-400 py-2 px-4"
                            }
                        >
                            Tiket
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={
                                url === "/about"
                                    ? "text-white py-2 px-4"
                                    : "text-stone-400 py-2 px-4"
                            }
                        >
                            Tentang
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={
                                url === "/contact"
                                    ? "text-white py-2 px-4"
                                    : "text-stone-400 py-2 px-4"
                            }
                        >
                            Kontak Kami
                        </Link>
                    </li>
                </ul>

                <div>
                    <a
                        href="/login"
                        className="bg-blue-700 hover:bg-blue-700/90 transition-colors duration-300 rounded-md py-3 px-5"
                    >
                        Login Admin
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
