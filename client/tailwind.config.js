/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    fontFamily: {
      'karla': ["Karla", "sans-serif"]
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.77rem',
    },
    colors: {
      bgDark: "#121821",
      bgLight: "#dee4ed",
      primaryLight: "#3A67D9",
      primaryDark: "#2552C4",
      secondaryLight: "#726de8",
      secondaryDark: "#1b1792",
      accentLight: "#de794a",
      accentDark: "#b55021"

    },
    fluidTypography: {
      remSize: 18,
    },
    extend: {
      fontSize: {
        clamp: "clamp(1rem, 0.6063rem + 0.9844vw, 1.7rem)",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-fluid-typography")
  ],
}
