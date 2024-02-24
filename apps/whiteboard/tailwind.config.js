const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  mode: 'jit',
  content: [
    join(__dirname, 'src/app/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [],
};
