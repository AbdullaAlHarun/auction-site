/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js}', // Adjust paths to include your source files
      './index.html',
    ],
    theme: {
      extend: {}, // Add customizations here if needed
    },
    plugins: [
      require('daisyui'), // Add DaisyUI as a plugin
    ],
    daisyui: {
      themes: false, // Optional: Disable themes for static colors
    },
  };
  