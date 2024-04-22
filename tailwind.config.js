/** @type {import('tailwindcss').Config} */
// -@ts-expect-error
import animations from '@midudev/tailwind-animations'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Principal': ['Bebas Neue', 'sans-serif'],
        'Secundaria': ['Noto Sans', 'sans-serif'],
      },
      colors: {
        "Yellow1": "#FFC924",
        "Yellow2": "#F8FB47",
        "Yellow3": "#F9CB67",
        "Pink1": "#FB43C1",
        "Pink2": "#FA7A9D",
        "Pink3": "#FA9D85"
      },
    },
  },
  plugins: [
    animations
  ],
}

