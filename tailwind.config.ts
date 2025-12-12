import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom "Senegal Green" - warm and deep
        senegal: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e', // Bright green for icons
          700: '#15803d', // Primary brand color
          800: '#166534', // Darker for hover states
          900: '#14532d', // Deepest for footers/backgrounds
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;