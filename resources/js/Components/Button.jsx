import React from "react";
import { motion } from "framer-motion";

const Button = ({ children }) => {
    return (
        <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1, delay: 1 }}
            variants={{
                hidden: { opacity: 0, y: 0 },
                visible: { opacity: 1, y: 0 },
            }}
            className="py-4 px-8 mt-5 font-lato text-sm tracking-widest transition-colors font-bold bg-blue-700 border-blue-700 text-white hover:text-blue-700 border-2 hover:border-blue-700 hover:bg-white"
        >
            {children}
        </motion.button>
    );
};

export default Button;
