import { updateLogin, logoutHandler } from '../auth/authHelpers.js';
import { fetchListingsByUser } from '../../api/listings/userListings.js';
import { updateAvatar } from '../../api/profile/updateAvatar.js';
import { profileData } from '../../api/profile/profileData.js';

// Display profile data
async function displayProfile() {
    const profile = await profileData();

    if (profile) {
        document.getElementById('email').textContent = profile.email;
        document.getElementById('nameHeader').textContent = profile.name;
        document.getElementById('creditsHeader').textContent = `${profile.credits}`;
        document.getElementById('credits').textContent = `${profile.credits}`;
        document.getElementById('listings').textContent = `${profile._count.listings}`;
        document.getElementById('wins').textContent = `${profile._count.wins}`;

        const avatar = document.getElementById('avatar');
        avatar.src = profile.avatar.url;

        const avatarImage = document.querySelector('.avatar .avatar-image');
        if (avatar) {
            avatarImage.src = profile.avatar.url;
        }
    }
}
displayProfile();

// Display listings by user
async function displayListings() {
    const listings = await fetchListingsByUser();

    const listingsContainer = document.getElementById('listingsContainer');

    if (listings && listings.length >0) {
        const listingTemplate = document.getElementById('listingTemplate');

        listings.forEach(listing => {
            const listingElement = listingTemplate.cloneNode(true);
            listingElement.classList.remove('hidden');

            const listingLink = listingElement.querySelector('#listingLink');
            listingLink.href = `../listing/singleListing.html?id=${listing.id}`;

            const title = listingElement.querySelector('#listingTitle');
            title.textContent = listing.title;

            listingsContainer.appendChild(listingElement);
        });
    } else {
        listingsContainer.classList.remove('grid', 'grid-cols-3');
        listingsContainer.classList.add('flex', 'justify-center', 'items-center',);

        listingsContainer.innerHTML = `
        <p class="text-center text-customWhite">
            You have no listings yet, 
            <a href="../../../profile/create.html" class="text-blue-500 underline">create one here.</a>
        </p>
    `;
    }
}
displayListings();

// Modal for updating avatar
document.getElementById('editAvatarBtn').addEventListener('click', () => {
    const modal = document.getElementById('editAvatarModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
});

document.getElementById('cancelAvatarBtn').addEventListener('click', () => {
    const modal = document.getElementById('editAvatarModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});

document.getElementById('submitAvatarBtn').addEventListener('click', () => {
    const avatarUrl = document.getElementById('avatarUrlInput').value;

    if (avatarUrl) {
        updateAvatar(avatarUrl);
        const modal = document.getElementById('editAvatarModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    } else {
        alert('Please enter a valid avatar URL.');
    }
});

// Call the updated login/logout functions
updateLogin();
logoutHandler();