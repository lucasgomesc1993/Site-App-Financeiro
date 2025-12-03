/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"DM Sans"', 'Inter', 'sans-serif'],
                display: ['"Inter"', 'sans-serif'],
            },
            colors: {
                background: '#0d0d0d',
                surface: '#141414',
                primary: '#47ffb7',
                secondary: '#00ffb2',
                accent: '#10a37f',
                muted: '#bfbdbd',
                light: '#f5f5f5',
            },
            backgroundImage: {
                'hero-glow': 'radial-gradient(circle at center, rgba(71, 255, 183, 0.15) 0%, rgba(13, 13, 13, 0) 70%)',
                'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
                'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
