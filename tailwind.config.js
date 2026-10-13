/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#F7F4ED',
          sidebar: '#263A35',
          'sidebar-dark': '#1E2E2A',
          'sidebar-hover': '#2E4640',
          'sidebar-border': '#375049',
          accent: '#D16C50',
          'accent-hover': '#BD5B40',
          secondary: '#DCE5D8',
          text: '#343630',
          muted: '#77786F',
          card: '#FFFFFF',
          border: '#E5DED1',
          selected: '#EAE5DA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(52, 54, 48, 0.04)',
        'card': '0 1px 3px 0 rgba(52, 54, 48, 0.06), 0 1px 2px -1px rgba(52, 54, 48, 0.04)',
        'elevated': '0 12px 24px -6px rgba(38, 58, 53, 0.12), 0 4px 8px -4px rgba(38, 58, 53, 0.06)',
      },
    },
  },
  plugins: [],
}
