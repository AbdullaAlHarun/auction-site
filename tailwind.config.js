/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
        './account/auth.html',
        './profile/index.html',
        './profile/create.html',
        './src/**/*.{html,js}',
    ],
    theme: {
      extend: {}, 
    },
    plugins: [
      require('daisyui'), 
    ],
    daisyui: {
      themes: false, 
    },
  };
  