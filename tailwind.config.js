/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
            mono: ["IBM Plex Mono", "monospace"],
        },
        extend: {},
    },
    plugins: [],
    darkMode: "class",
};
