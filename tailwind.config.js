/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./*.js"],
    theme: {
        fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
            mono: ["Roboto Mono", "monospace"],
        },
        extend: {},
    },
    plugins: [],
    darkMode: "class",
};
