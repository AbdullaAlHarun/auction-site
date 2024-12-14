import './styles/input.css'
import { updateLogin, logoutHandler, loggedIn, profileVisibility } from './ui/auth/authHelpers.js';
import { profileData } from './api/profile/profileData.js';



// Display profile data in header
async function displayProfile() {
    const profile = await profileData();

    if (profile) {
        document.getElementById('name').textContent = profile.name;
        document.getElementById('credits').textContent = `Credits: ${profile.credits}`;

        const avatar = document.getElementById('avatar');
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt;
    }
}
displayProfile();

// Check if user is logged for going to profile page and create listing
const profileBtn = document.querySelector('.profileBtn');
const createBtn = document.querySelector('.createBtn');
if (profileBtn && createBtn) {
    [profileBtn, createBtn].forEach(button => {
        button.addEventListener('click', e => {
            if (!loggedIn()) {
                e.preventDefault();
                alert('You need to be logged in. Click OK to go to login page');
                window.location.href = "../account/auth.html";
            }
        });
    });
}

// Call the updated login/logout functions
updateLogin();
logoutHandler();
profileVisibility();