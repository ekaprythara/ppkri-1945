import { Head } from "@inertiajs/react";
import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import Title from "@/Components/Title";
import { motion } from "framer-motion";

const Collections = () => {
    return (
        <>
            <Head title="Galeri" />
            <GuestLayout>
                <div className="bg-[#222] text-white">
                    <div className="w-9/12 mx-auto flex flex-col justify-center items-center py-20">
                        <Title>Galeri</Title>
                        <div>Ini adalah halaman galeri.</div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Collections;
