import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      "default": "#DEE7E7",
      "default-light": "#333333",
      "tertiary": "#A1A1A1",
      "secondary": "#FAFAFA",
      "secondary-light": "#E5E5E5",
      "primary": "#1565C0"
    },
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        "default": "#DEE7E7",
        "default-light": "#333333",
        "tertiary": "#A1A1A1",
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
