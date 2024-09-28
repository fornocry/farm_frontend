/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                topbar: 'rgba(99, 137, 143, 0.65);',
                navbar: 'rgba(25, 43, 38, 0.82);',
                farmPlace: 'rgba(5, 5, 5, 0.15);',
                userImageBg: 'rgba(4, 4, 4, 0.06);',
                tribeText: 'rgba(255, 255, 255, 0.49);',
                textGray: '#B0B0B0',
                navArrow: 'rgba(87, 154, 168, 1);',
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                neueMontreal: ['NeueMontreal', 'sans-serif'],
            },
            animation: {
                float: 'float 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-10px)'},
                },
            },
        },
    },
    plugins: [],
}

