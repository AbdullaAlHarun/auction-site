import './styles/input.css';
import { updateLogin, logoutHandler, loggedIn, profileVisibility } from './ui/auth/authHelpers.js';
import { displayListings } from './ui/listings/feed.js';
import { profileData } from './api/profile/profileData.js';
import { fetchSearch } from './api/listings/searchListings.js';

// Target the search input and results container
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('listingsContainer');

/**
 * Handles the search functionality.
 * Fetches and displays search results based on user input.
 */
searchInput.addEventListener('input', async function () {
    const query = searchInput.value.trim();
    const listingId = null;

    if (query.length > 2) {
        try {
            const { searchResults } = await fetchSearch(query, listingId);
            if (Array.isArray(searchResults)) {
                renderSearchResults(searchResults);
            } else {
                console.error('searchResults is not an array', searchResults);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    } else {
        // Clear results and display default listings when search query is less than 3 characters
        resultsDiv.innerHTML = '';
        displayListings();
    }
});

/**
 * Renders search results in the results container.
 * @param {Array} searchResults - List of search results to display.
 */
function renderSearchResults(searchResults) {
    resultsDiv.innerHTML = '';
    searchResults.forEach(listing => {
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing-card m-2';
        listingDiv.innerHTML = `
            <div>
                ${
                    listing.media.length > 0
                        ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || listing.title}" class="media-img">`
                        : '<p>No media available</p>'
                }
            </div>
            <div class="flex items-center px-3 mx-3 mt-2 bg-customWhite text-customDark rounded">
                <p><span class="font-semibold">Ends in:</span> Check listing page</p>
            </div>
            <div class="px-3 pt-2">
                <h2 class="text-xl font-medium capitalize">${listing.title}</h2>
                <p class="capitalize">${listing.description || 'No description available'}</p>
                <p><strong>Ends At:</strong> ${new Date(listing.endsAt).toLocaleDateString()}</p>
                <p><strong>Bids:</strong> ${listing._count.bids || 0}</p>
                <p>${listing.tags.length > 0 ? listing.tags.join(', ') : 'No tags'}</p>
                <div class="border-b-2 border-white opacity-50 my-3"></div> 
                <a href="../listing/singleListing.html?id=${listing.id}">
                    <button class="flex flex-row gap-2 items-center mb-2">
                        See listing
                        <i class="ph ph-arrow-up-right text-base text-red-700 bg-white w-6 h-6 flex items-center justify-center rounded-full"></i>
                    </button>
                </a>                  
            </div>
        `;
        resultsDiv.appendChild(listingDiv);
    });
}

/**
 * Fetches and displays user profile data in the header.
 */
async function displayProfile() {
    try {
        const profile = await profileData();
        if (profile) {
            document.getElementById('name').textContent = profile.name;
            document.getElementById('credits').textContent = `Credits: ${profile.credits}`;

            const avatar = document.getElementById('avatar');
            avatar.src = profile.avatar.url || 'default-avatar.png';
            avatar.alt = profile.avatar.alt || 'User Avatar';
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}
displayProfile();

/**
 * Ensures users are logged in before navigating to the profile page or creating a listing.
 */
const profileBtn = document.querySelector('.profileBtn');
const createBtn = document.querySelector('.createBtn');
if (profileBtn && createBtn) {
    [profileBtn, createBtn].forEach(button => {
        button.addEventListener('click', e => {
            if (!loggedIn()) {
                e.preventDefault();
                alert('You need to be logged in. Click OK to go to the login page.');
                window.location.href = "../account/auth.html";
            }
        });
    });
}

// Initialize login/logout functions and profile visibility
updateLogin();
logoutHandler();
profileVisibility();
