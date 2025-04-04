/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Optional (for dark mode)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all React files
  ],
  theme: {
    extend: {
      // Fixes "border-border" error (if using shadcn/ui)
      borderColor: {
        border: "hsl(var(--border))",
      },
      colors: {
        // Default shadcn/ui colors (optional)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [],
};
