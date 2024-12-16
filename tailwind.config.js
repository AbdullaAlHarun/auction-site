/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './account/auth.html',
      './profile/index.html',
      './profile/create.html',
      './listing/singleListing.html',
      './src/**/*.{html,js}',
    ],
    theme: {
      extend: {}, 
    },
    plugins: [
      require('daisyui'), 
    ],
   
  };
  