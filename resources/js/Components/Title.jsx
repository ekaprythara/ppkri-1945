import React from "react";
import { motion } from "framer-motion";

const Title = ({ className, children }) => {
    return (
        <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1 }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
            className={`font-caudex text-5xl mb-10 ${className}`}
        >
            {children}
        </motion.h1>
    );
};

export default Title;
