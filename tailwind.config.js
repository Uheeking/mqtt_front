/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "./src/components/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },

    colors: {
      'black': '#000',  // Define black color
      'white': '#fff',  // Define white color
      "border": "hsl(var(--border))",
      "input": "hsl(var(--input))",
      "ring": "hsl(var(--ring))",
      "background": "hsl(var(--background))",
      "foreground": "hsl(var(--foreground))",
      "primary": {
        "DEFAULT": "hsl(var(--primary))",
        "foreground": "hsl(var(--primary-foreground))"
      },
      "secondary": {
        "DEFAULT": "hsl(var(--secondary))",
        "foreground": "hsl(var(--secondary-foreground))"
      },
      "destructive": {
        "DEFAULT": "hsl(var(--destructive))",
        "foreground": "hsl(var(--destructive-foreground))"
      },
      "muted": {
        "DEFAULT": "hsl(var(--muted))",
        "foreground": "hsl(var(--muted-foreground))"
      },
      "accent": {
        "DEFAULT": "hsl(var(--accent))",
        "foreground": "hsl(var(--accent-foreground))"
      },
      "popover": {
        "DEFAULT": "hsl(var(--popover))",
        "foreground": "hsl(var(--popover-foreground))"
      },
      "card": {
        "DEFAULT": "hsl(var(--card))",
        "foreground": "hsl(var(--card-foreground))"
      }
    },
    borderRadius: {
      "lg": "var(--radius)",
      "md": "calc(var(--radius) - 2px)",
      "sm": "calc(var(--radius) - 4px)"
    },
    keyframes: {
      "accordion-down": {
        "from": {
          "height": "0"
        },
        "to": {
          "height": "var(--radix-accordion-content-height)"
        }
      },
      "accordion-up": {
        "from": {
          "height": "var(--radix-accordion-content-height)"
        },
        "to": {
          "height": "0"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
