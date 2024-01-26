import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors');
const screens = require('tailwindcss/nesting/')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      "danger": "#DC2626",
      "default": "#DEE7E7",
      "default-light": "#333333",
      "tertiary": "#A1A1A1",
      "tertiary-dark": "#D9D9D9",
      "secondary": "#FAFAFA",
      "secondary-light": "#E5E5E5",
      "primary": "#1565C0"
    },
    extend: {
      screens: {
        xxl: '1536px',
        xs: '480px',
        xxs: '320px',
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        "danger": "#DC2626",
        "default": "#DEE7E7",
        "default-light": "#333333",
        "tertiary": "#A1A1A1",
        "tertiary-dark": "#D9D9D9",
        "secondary": "#FAFAFA",
        "secondary-light": "#E5E5E5",
        "primary": "#1565C0"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require("daisyui"),
  ],
}
export default config
