import './styles/input.css';
import { updateLogin, logoutHandler, loggedIn, profileVisibility } from './ui/auth/authHelpers.js';
import { profileData } from './api/profile/profileData.js';
import { fetchSearch } from './api/listings/searchListings.js';

// Entry point: Initialize functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
    setupSearchHandler();
});

/**
 * Initialize the header, manage login/logout state, and set up profile display.
 */
async function initializeHeader() {
    const isLoggedIn = loggedIn(); // Check if the user is logged in
    toggleHeaderElements(isLoggedIn); // Update header elements based on login state

    if (isLoggedIn) {
        await displayProfileData(); // Fetch and display user profile data
    }

    setupLogoutHandler(); // Set up logout functionality
    updateLogin(); // Update login/logout button in header
    profileVisibility(); // Adjust visibility of profile dropdown
}

/**
 * Toggle the visibility of header elements based on login state.
 * @param {boolean} isLoggedIn - User's login status.
 */
function toggleHeaderElements(isLoggedIn) {
    const userSection = document.getElementById('userSection');
    const loginButton = document.getElementById('loginButton');

    if (isLoggedIn) {
        userSection.classList.remove('hidden');
        loginButton.classList.add('hidden');
    } else {
        userSection.classList.add('hidden');
        loginButton.classList.remove('hidden');
    }
}

/**
 * Fetch and display the logged-in user's profile data.
 */
async function displayProfileData() {
    try {
        const profile = await profileData(); // Fetch user profile data
        if (profile) {
            // Update the header with profile details
            document.getElementById('name').textContent = profile.name;
            document.getElementById('credits').textContent = `Credits: ${profile.credits}`;
            
            // Set avatar or fallback to default
            const avatar = document.getElementById('avatar');
            avatar.src = profile.avatar?.url || 'assets/icons/default-avatar.png';
            avatar.alt = profile.avatar?.alt || 'Default Avatar';
        }
    } catch (error) {
        console.error('Failed to fetch profile data:', error);
    }
}

/**
 * Set up the logout functionality.
 */
function setupLogoutHandler() {
    const logoutButton = document.getElementById('loginAnchor'); // Ensure it targets the correct ID
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            if (loggedIn()) {
                event.preventDefault(); // Prevent default anchor behavior
                localStorage.removeItem('accessToken'); // Clear the session token
                localStorage.removeItem('name'); // Clear any other stored user data
                window.location.href = 'account/auth.html'; // Redirect to login page
            }
        });
    }
}

/**
 * Set up the search bar functionality.
 */
function setupSearchHandler() {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('listingsContainer');

    searchInput.addEventListener('input', async function () {
        const query = searchInput.value.trim(); // Trim whitespace
        if (query.length > 2) {
            await handleSearch(query, resultsDiv);
        } else {
            resultsDiv.innerHTML = ''; // Clear search results if query is too short
        }
    });
}

/**
 * Fetch and display search results based on the input query.
 * @param {string} query - Search query entered by the user.
 * @param {HTMLElement} resultsDiv - Container for displaying search results.
 */
async function handleSearch(query, resultsDiv) {
    try {
        const { searchResults } = await fetchSearch(query, null);
        if (Array.isArray(searchResults)) {
            resultsDiv.innerHTML = ''; // Clear previous results
            searchResults.forEach(listing => {
                resultsDiv.appendChild(createListingCard(listing));
            });
        } else {
            console.error('Invalid search results format:', searchResults);
        }
    } catch (error) {
        console.error('Error during search:', error);
    }
}

/**
 * Create a DOM element for a single listing card.
 * @param {Object} listing - Listing data.
 * @returns {HTMLElement} - The DOM element for the listing card.
 */
function createListingCard(listing) {
    const listingDiv = document.createElement('div');
    listingDiv.className = 'listing-card m-2';

    const mediaContent = listing.media.length > 0
        ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || listing.title}" class="media-img">`
        : 'No media available';

    listingDiv.innerHTML = `
        <div>${mediaContent}</div>
        <div class="px-3 pt-2">
            <h2 class="text-xl font-medium capitalize">${listing.title}</h2>
            <p>${listing.description}</p>
        </div>
    `;
    return listingDiv;
}

// Call the updated login/logout functions
updateLogin();
logoutHandler();
