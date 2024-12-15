// Main feed page
import { feedListings } from '../../api/listings/feedListings.js';
import { startCountdown } from './countDownTime.js';

// Pagination
let currentPage = 0;
const listingsPerPage = 12;
let allListings = [];

// Display all listings
export function displayListings() {
    const container = document.getElementById('listingsContainer');
    const start = currentPage * listingsPerPage;
    const end = start + listingsPerPage;
    const listingsToDisplay = allListings.slice(start, end);

    listingsToDisplay.forEach(listing => {
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing-card m-2';

        const countdownElement = document.createElement('p');
        countdownElement.textContent = 'No end time found';
        countdownElement.className = 'countdown-timer';

        listingDiv.innerHTML = `
            <div> ${
            listing.media.length > 0
                ? `<img src='${listing.media[0].url}' alt='${listing.media[0].alt || listing.title}' class='media-img'>`
                : '<img src="/assets/images/defaultImage.png" alt="defaultImage" class="media-img">'
            }</div>
            <div class="flex items-center px-3 mx-3 mt-2 bg-customWhite text-customDark rounded">
                <span id="countdown-${listing.id}"></span>
            </div>
            <h2 class='text-xl font-semibold capitalize px-3 pt-2'>${listing.title}</h2>
            <p class='capitalize px-3 my-1 truncate ...'>${listing.description}</p>
            <p class="px-3 mt-1"><strong>Bids:</strong> ${listing._count.bids}</p>
            <p class="px-3 mb-2">${listing.tags.length > 0 ? listing.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)).join(' - ') : 'No Tags'}</p>
            <div class="border-b-2 border-white opacity-50 m-3"></div> 
            <a href="../listing/singleListing.html?id=${listing.id}">
                <p class="flex flex-row gap-2 items-center pl-3 mb-2">See listing<i class="ph ph-arrow-up-right text-base text-green-700 bg-white w-6 h-6 flex items-center justify-center rounded-full"></i></p>
            </a>
        `;

        const countdownContainer = listingDiv.querySelector(`#countdown-${listing.id}`);
        countdownContainer.appendChild(countdownElement);
        container.appendChild(listingDiv);

        // Start the countdown
        startCountdown(listing.endsAt, countdownElement, false);
    });

    if (end < allListings.length) {
        const showMoreContainer = document.getElementById('showMoreContainer');
        showMoreContainer.innerHTML = '';
        const showMoreButton = document.createElement('button');
        showMoreButton.className = 'show-more-btn bg-blue-500 text-white py-2 px-4 rounded';
        showMoreButton.textContent = 'Show More';
        showMoreButton.onclick = loadMoreListings;
        showMoreContainer.appendChild(showMoreButton);
    }
}

// Loads more listings - pagination
function loadMoreListings() {
    currentPage++;
    displayListings();
}

// Get data from feedListings
async function initializeListings() {
    try {
        allListings = await feedListings();
        displayListings();
    } catch (error) {
        console.error('Error initializing listings:', error.message);
    }
}
initializeListings();