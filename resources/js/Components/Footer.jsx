import React from "react";
import LogoImg from "../../../public/assets/image/logo.png";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { navLinks } from "./Navbar";

const Footer = () => {
    return (
        <div className="bg-[#111] text-white">
            <div className="w-9/12 mx-auto flex flex-col justify-center items-center py-5">
                <div className="grid grid-cols-3 grid-rows-none place-items-start gap-10 w-full mt-5">
                    <div className="grid grid-rows-[0.5fr_1.5fr] grid-cols-none gap-5 justify-self-start">
                        <h3 className="font-caudex text-2xl">Hubungi Kami</h3>
                        <div className="flex gap-2">
                            <a href="#">
                                <FaInstagram
                                    size={30}
                                    className="text-stone-400"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-rows-[0.5fr_1.5fr] grid-cols-none gap-5 justify-self-center">
                        <h3 className="font-caudex text-2xl">Quick Links</h3>
                        <ul className="flex flex-col gap-2 place-self-start">
                            {navLinks.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="font-lato text-sm text-stone-400"
                                    >
                                        <a href={item.href}>{item.title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="grid grid-rows-[1.5fr_0.5fr] grid-cols-none gap-5 justify-self-end">
                        <img
                            src={LogoImg}
                            alt="Logo Monumen PPKRI 1945"
                            width={200}
                            height={200}
                            className="place-self-center"
                        />
                        <p className="font-lato text-sm text-center text-stone-400">
                            Monumen dikelola oleh
                            <br /> PT. Putra Inti Lumayan
                        </p>
                    </div>
                </div>
                <span className="font-lato text-xs text-stone-400 mt-10 tracking-widest">
                    Copyright &copy; 2024 Monumen PPKRI 1945
                </span>
            </div>
        </div>
    );
};

export default Footer;
