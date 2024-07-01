/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkslategray: {
          "50": "#3a3a3a",
          "100": "#3c3c3c",
          "200": "#3b3b3b",
          "300": "#303030",
        },
        silver: {
          "100": "#c5c5c5",
          "200": "#c0c0c0",
          "300": "#b7b7b7",
          "400": "#b9b9b9",
        },
        "brand-color-brand-orange-high": "#ff4a01",
        "neutrals-color-neutral-100": "#fff",
        "gray-selections-header": "#1e1d1d",
        darkgray: {
          "100": "#b0b0b0",
          "200": "#a6a6a6",
          "300": "#9d9d9d",
          "400": "#999",
        },
        gray: {
          "100": "#7b7b7b",
          "200": "#1e1d1d",
          "300": "#212121",
          "500": "#0f0f0f",
        },
        selections: {
          "header": "#1e1d1d",
          "team": "#ffffff",
          "length": "#999999",
          "fullName": "#ffffff",
          "team": "#9d9d9d",
          "teamName": "#b9b9b9",
          "card": "#0f0f0f",
          "date": "#212121",
          "border": "#3b3b3b",
        },
        menu: {
          "background": "#b3b3b3",
          "hover": "#1e1d1d",
          "text-color": "#696969",
        },
        athleteCard: {
          "gray-100": "#898989",
          "gray-200": "#0f0f0f",
          "gray-300": "#858585",
          "white": "#fff"
        },
        dimgray: "#727272",
        crimson: "#db2a2a",
        black: "#000",
        lightgray: "#cbcbcb",
        gainsboro: "#d9d9d9",
        forestgreen: "#16ac49",
      },
      spacing: {
        'top-base': '6.13rem', // valor base para top
        'top-error': '10rem', // valor quando houver erro
      },
      fontFamily: {
        archivo: "Archivo",
        "buttons-b4": "'Archivo Expanded'",
        "mango-grotesque": "'Mango Grotesque'",
      },
      borderRadius: {
        "3xs": "10px",
        mini: "15px",
      },
    },
    fontSize: {
      sm: "0.88rem",
      "19xl": "2.38rem",
      "81xl": "6.25rem",
      base: "1rem",
      "3xs": "0.63rem",
      "13xl": "2rem",
      "4xs": "0.56rem",
      "7xl": "1.63rem",
      "2xs": "0.69rem",
      xs: "0.75rem",
      inherit: "inherit",
      'lg': '1.125rem', // 18px
      'xl': '1.25rem',  // 20px
      '2xl': '1.5rem',  // 24px
    },
  },
  corePlugins: {
    preflight: false,
  },
};

    

