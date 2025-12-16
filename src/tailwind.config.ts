import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oz-purple': 'hsl(var(--oz-purple))',
        'oz-purple-deep': 'hsl(var(--oz-purple-deep))',
        'oz-purple-dark': 'hsl(var(--oz-purple-dark))',
        'oz-purple-light': 'hsl(var(--oz-purple-light))',
        'oz-gray-white': 'hsl(var(--oz-gray-white))',
        'oz-gray-dark': 'hsl(var(--oz-gray-dark))',
      },
    },
  },
  plugins: [],
} satisfies Config
