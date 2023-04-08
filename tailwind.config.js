/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/*.js"],
    theme: {
        fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
            mono: ["Roboto Mono", "monospace"],
        },
        extend: {
            colors: {
                accent: colors.sky,
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
