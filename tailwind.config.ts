import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        background: {
          "300": "#7D8087",
          DEFAULT: "#FFFFFF",
        },
        input: "#242F66",
        primary: {
          "100": "#F7F8FD",
          DEFAULT: "var(--primary)",
          foreground: "#FFFFFF",
        },
        secondary: "#eaeaea",
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000",
        },
        muted: {
          "100": "#7e8ea5",
          DEFAULT: "#465161",
          foreground: "#64748b",
        },
        destructive: {
          DEFAULT: "#ff0000",
          foreground: "#f7f9fb",
        },
        white: {
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
        success: {
          DEFAULT: "#00B573",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "100": "2px 2px 0px 0px rgb(0, 0, 0)",
        "200": "2px 2px 0px 2px rgb(0, 0, 0)",
        "300": "2px 2px 0px 2px rgb(238, 43, 105)",
      },
      spacing: {
        navbar: "var(--navbar-height)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function ({
      addComponents,
    }: {
      addComponents: PluginAPI["addComponents"];
    }) {
      addComponents({
        ".hide-scrollbar": {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};

export default config;
