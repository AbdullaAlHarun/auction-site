import { updateLogin, logoutHandler, loggedIn } from '../auth/authHelpers.js';
import { getBidderHistory } from '../../api/bid/bidHistory.js';
import { startCountdown } from './countDownTime.js';
import { singleListing } from '../../api/listings/singleListing.js';
import { profileData } from '../../api/profile/profileData.js';

// Display single listing
async function displaySingleListing() {
    const listing = await singleListing();

    if (listing) {
        const container = document.getElementById('singleListingContainer');
        if (!container) {
            console.error('singleListingContainer not found in the DOM.');
            return;
        }

        const image = container.querySelector('#singleListingImage');
        if (image) {
            if (listing.media && listing.media.length > 0) {
                image.src = listing.media[0].url;
                image.alt = listing.media[0].alt || 'Listing image';
            } else {
                image.src = '/assets/images/defaultImage.png';
                image.alt = 'DefaultImage';
            }
        }

        const title = container.querySelector('#singleListingTitle');
        title.textContent = listing.title.toUpperCase();

        const created = container.querySelector('#created');
        created.textContent = listing.created.toUpperCase();
        const createdDate = new Date (listing.created);
        created.textContent = createdDate.toLocaleDateString();

        const description = container.querySelector('#singleListingDescription');
        description.innerHTML = `<span class="font-semibold">Description:</span> ${
            listing.description.charAt(0).toUpperCase() + listing.description.slice(1).toLowerCase()
        }`;

        const endsAt = container.querySelector('#endsAt');
        startCountdown(listing.endsAt, endsAt);

        const bids = container.querySelector('#bids');
        bids.innerHTML = `<span class="font-semibold">Bids:</span> ${listing._count.bids || 0}`;

        const tagsContainer = container.querySelector('#singleListingTags');
        if (tagsContainer) {
            if (listing.tags.length > 0) {
                listing.tags.forEach((tag, index) => {
                    const tagElement = document.createElement('span');
                    tagElement.textContent = tag;
                    tagElement.classList.add('font-normal');

                    if (index < listing.tags.length - 1) {
                        tagElement.textContent += ' - ';
                    }
                    tagsContainer.appendChild(tagElement);
                });
            } else {
                const noTagsElement = document.createElement('span');
                noTagsElement.textContent = 'No tags';
                noTagsElement.classList.add('font-normal');
                tagsContainer.appendChild(noTagsElement);
            }
        }
    } else {
        console.error('Failed to fetch or display the listing');
    }
}
displaySingleListing();

// Display the bidder history
async function displayBidderHistory() {
    const bidderHistory = await getBidderHistory();

    if (Array.isArray(bidderHistory)) {
        const bidderList = document.getElementById('bidderHistory');

        bidderHistory.forEach(bid => {
            const listItem = document.createElement('li');
            listItem.classList.add('flex', 'items-center', 'gap-2');
            listItem.innerHTML = `
            <img src="${bid.bidder.avatar.url}" alt="${bid.bidder.avatar.alt}" class="w-8 h-8 rounded-full">
            <strong>${bid.bidder.name}</strong> 
            bid amount: $${bid.amount} 
            on ${new Date(bid.created).toLocaleDateString()}
            <br>
            `;
            bidderList.appendChild(listItem);
        });
    } else {
        console.error('Expected bidderHistory to be an array, but got:', bidderHistory);
    }
}
displayBidderHistory()

// Check if logged in to place a bid
const bidBtn = document.getElementById('place-bid-btn');
if (loggedIn()) {
    bidBtn.removeAttribute('disabled');
}

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

// Display profile data in header
async function displayProfile() {
    const profile = await profileData();

    if (profile) {
        document.getElementById('nameHeader').textContent = profile.name;
        document.getElementById('creditsHeader').textContent = `Credits: ${profile.credits}`;

        const avatar = document.getElementById('avatar');
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt;
    }
}
displayProfile();

// Call the updated login/logout functions
updateLogin();
logoutHandler();