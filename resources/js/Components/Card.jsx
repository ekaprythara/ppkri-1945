import { Head } from "@inertiajs/react";
import React from "react";

const Card = ({ title, children }) => {
    return (
        <>
            {title && <Head title={title} />}
            <div>
                <div className="py-10 max-w-7xl mx-auto sm:px-6 lg:px-8 font-lato">
                    <h2 className="font-semibold text-4xl text-gray-800 leading-tight mb-5">
                        {title}
                    </h2>
                    <div className="bg-white overflow-hidden rounded-lg shadow-md sm:rounded-lg">
                        <div className="p-5">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
