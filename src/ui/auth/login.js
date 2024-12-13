import { loginUser } from '../../api/auth/login.js';

// elements
const loginFormElement = document.getElementById('login');
const registerFormElement = document.getElementById('register');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');

// event listener for login
loginBtn.addEventListener('click', async function () {
    const mailValue = loginEmail.value;
    const pwdValue = loginPassword.value;

    try {
        const data = await loginUser(mailValue, pwdValue);

        alert(`User ${data.data.name} successfully logged in!`);
        sessionStorage.setItem('name', data.data.name);
        sessionStorage.setItem('accessToken', data.data.accessToken);

        window.location.href = '../../../index.html';
    } catch (error) {
        errorMessage.textContent = 'Incorrect email or password';
        errorMessage.style.display = 'block';
    }
});

// toggle between forms
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