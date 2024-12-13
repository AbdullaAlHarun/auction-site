// Check if user is logged in
export function loggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
}

// Update login/logout anchor tag in header
export function updateLogin() {
    const loginAnchor = document.getElementById('loginAnchor');
    if (loginAnchor) {
        if (loggedIn()) {
            loginAnchor.textContent = 'Log out';
            loginAnchor.href = '../index.html';
        } else {
            loginAnchor.textContent = 'Login';
            loginAnchor.href = '../account/auth.html';
        }
    }
}

// Log out function
export function logOut(event) {
    if (event) event.preventDefault();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('name');
    window.location.href = '../../../../index.html';
}

// Logout functionality if logged in
export function logoutHandler() {
    const logoutBtn = document.getElementById('loginAnchor');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            if (loggedIn()) {
                logOut(event);
            }
        });
    }
}

// Logout function for profile page
export function profileLogout() {
    const profileLogoutBtn = document.getElementById('logoutBtn');
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', function (event) {
            if (loggedIn()) {
                logOut(event);
            }
        });
    }
}

// Show or hide profile elements if logged in or not
export function profileVisibility() {
    const profileDropdown = document.querySelector('.profileDropdown');

    if (loggedIn()) {
        profileDropdown.classList.remove('hidden');
    } else {
        profileDropdown.classList.add('hidden');
    }
}