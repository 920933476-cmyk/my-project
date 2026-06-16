import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: {
          50: '#e6f2ff',
          100: '#b3dbff',
          200: '#80c4ff',
          300: '#4dadff',
          400: '#1a96ff',
          500: '#007de6',
          600: '#0062b3',
          700: '#004780',
          800: '#002c4d',
          900: '#001b33',
          950: '#030712',
        },
        neon: {
          cyan: '#00e5ff',
          blue: '#3b82f6',
          mint: '#00f5d4',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'abyss-gradient': 'linear-gradient(135deg, #001b33 0%, #030712 55%, #001122 100%)',
        'neon-sheen': 'linear-gradient(90deg, rgba(0,229,255,0.18) 0%, rgba(59,130,246,0.10) 55%, rgba(0,245,212,0.12) 100%)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [],
}
export default config
