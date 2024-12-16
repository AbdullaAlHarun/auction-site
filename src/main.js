import './styles/input.css'
import { updateLogin, logoutHandler, loggedIn, profileVisibility } from './ui/auth/authHelpers.js';
import { displayListings } from './ui/listings/feed.js';
import { profileData } from './api/profile/profileData.js';
import { fetchSearch } from './api/listings/searchListings.js';

// Target the search input and results
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('listingsContainer');

// Search function
searchInput.addEventListener('input', async function () {
    const query = searchInput.value;
    const listingId = null;

    // Starts searching once the search hits 3 characters
    if (query.length > 2) {
        const {searchResults} = await fetchSearch(query, listingId);
        if (Array.isArray(searchResults)) {
            resultsDiv.innerHTML = '';
            searchResults.forEach(listing => {
                const listingDiv = document.createElement('div');
                listingDiv.className = 'listing-card m-2';
                listingDiv.innerHTML = `
                     <div>${
                    listing.media.length > 0
                        ? `<img src='${listing.media[0].url}' alt='${listing.media[0].alt || listing.title}' class='media-img'>`
                        : 'No media available'
                    }</div>
                    <div class="flex items-center px-3 mx-3 mt-2 bg-customWhite text-customDark rounded">
                        <p><span class="font-semibold">Ends in: </span>Check listing page</p>
                    </div>
                    <div class="px-3 pt-2">
                    <h2 class='text-xl font-medium capitalize'>${listing.title}</h2>
                    <p class='capitalize'>${listing.description}</p>
                    <p><strong>Ends At:</strong> ${new Date(listing.endsAt).toLocaleDateString()}</p>
                    <p><strong>Bids:</strong> ${listing._count.bids}</p>
                     <p>${listing.tags.length > 0 ? listing.tags.join(', ') : 'No tags'}</p>
                     <div class="border-b-2 border-white opacity-50 my-3"></div> 
                     <a href="../listing/singleListing.html?id=${listing.id}">
                        <p class="flex flex-row gap-2 items-center mb-2">See listing<i class="ph ph-arrow-up-right text-base text-green-700 bg-white w-6 h-6 flex items-center justify-center rounded-full"></i></p>
                     </a>                  
                   </div> 
                `;
                resultsDiv.appendChild(listingDiv);
            });
        } else {
            console.error('searchResults is not an array', searchResults);
        }
    } else {
        resultsDiv.innerHTML = '';
        displayListings();
    }
});

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