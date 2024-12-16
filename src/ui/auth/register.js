import { registerUser } from '../../api/auth/register.js';

//  Elements
const registerFormElement = document.getElementById('register');
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');

// Event listener for the register button
registerBtn.addEventListener('click', async function () {
    const userName = registerUsername.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const registerData = { name: userName, email: email, password: password };

    try {
        const data = await registerUser(registerData);
        console.log(data);

        alert('User successfully registered! Please log in.');
        window.location.href = '../../../../account/auth.html';
    } catch (error) {
        alert('Failed to register. Please try again.');
    }
});

// Toggle between forms
const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');

registerLink.addEventListener('click', function (event) {
    event.preventDefault();
    loginFormElement.style.display = 'none';
    registerFormElement.style.display = 'flex';
});

loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    registerFormElement.style.display = 'none';
    loginFormElement.style.display = 'flex';
});