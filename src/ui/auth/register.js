import { registerUser } from '../../api/auth/register.js';

// Elements
const registerFormElement = document.getElementById('register');
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');
const loginFormElement = document.getElementById('login');

// Event listener for the register button
registerBtn.addEventListener('click', async function (event) {
    event.preventDefault();

    const userName = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    // Validation
    if (!userName || !email || !password) {
        alert('All fields are required.');
        return;
    }

    if (!email.endsWith('@stud.noroff.no')) {
        alert('Email must be a valid stud.noroff.no address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    const registerData = {
        name: userName,
        email: email,
        password: password,
    };

    try {
        const data = await registerUser(registerData);
        console.log(data);

        alert('User successfully registered! Please log in.');
        window.location.href = '../../../../account/auth.html';
    } catch (error) {
        console.error('Register error:', error.message);
        alert('Failed to register. Please check your input and try again.');
    }
});

// Toggle between login and register forms
document.getElementById('registerLink').addEventListener('click', function (event) {
    event.preventDefault();
    loginFormElement.style.display = 'none';
    registerFormElement.style.display = 'flex';
});

document.getElementById('loginLink').addEventListener('click', function (event) {
    event.preventDefault();
    registerFormElement.style.display = 'none';
    loginFormElement.style.display = 'flex';
});
