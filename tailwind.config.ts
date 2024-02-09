import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors';
import { screens } from 'tailwindcss/defaultTheme';

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
      "tertiary-dark": "#D9D9D9",
      "secondary": "#FAFAFA",
      "secondary-light": "#E5E5E5",
      "primary": "#1565C0",
      "primary-light": "#68aefe",
      "danger": "#DC2626",
      "warning": "#F9C13A",
      "success": "#00B915"
    },
    screens: {
      ...screens,
      xxl: '1536px',
      xs: '480px',
      xxs: '320px',
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}

export default config;
