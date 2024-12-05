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
        primary: "#18181B",
        secondary: "#E51A54",
        colorText: "#71717A",
        colorText2: "#FFFFF",

      },
    },
  },
  plugins: [],
};
export default config;
