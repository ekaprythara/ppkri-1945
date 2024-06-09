import { Head } from "@inertiajs/react";
import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import Title from "@/Components/Title";
import { motion } from "framer-motion";

const Collections = () => {
    return (
        <>
            <Head title="Koleksi" />
            <GuestLayout>
                <div className="bg-[#222] text-white">
                    <div className="w-9/12 mx-auto flex flex-col justify-center items-center py-20">
                        <Title>Koleksi</Title>
                        <div>Ini adalah halaman koleksi.</div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default Collections;
