/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Executive Light Grey + White + Maroon Palette
        maroon: {
          DEFAULT: '#800000',
          primary: '#800000',
          dark: '#5C0000',
          medium: '#991B1B',
          light: '#F5E6E6',
          veryLight: '#FAF3F3',
          soft: '#FAF3F3',
        },
        surface: {
          base: '#E5E7EB',
          card: '#FFFFFF',
          elevated: '#FFFFFF',
          border: '#D1D5DB',
          subtle: '#E5E7EB',
          'border-light': '#E5E7EB',
          'border-subtle': '#F3F4F6',
        },
        brand: {
          50: '#FAF3F3',
          100: '#F5E6E6',
          500: '#991B1B',
          600: '#800000',
          700: '#5C0000',
          900: '#3A0000',
        },
        content: {
          primary: '#111827',
          secondary: '#374151',
          muted: '#6B7280',
          faint: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
