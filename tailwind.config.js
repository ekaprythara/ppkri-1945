import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                monumen: "url('/public/assets/image/monumen.webp')",
            },
            fontFamily: {
                caudex: ["Caudex"],
                lato: ["Lato"],
                poppins: ["Poppins"],
                lilitaOne: ["Lilita One"],
                chivoMono: ["Chivo Mono"],
                inter: ["Inter"],
            },
        },
    },

    plugins: [forms],
};
