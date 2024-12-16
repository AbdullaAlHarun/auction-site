// Update avatar request
import { authHeaders } from '../../utils/headers.js';

export async function updateAvatar(avatarUrl) {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('accessToken');

    if (!token || !name) {
        console.error('No access token or name found in session storage.');
        return;
    }

    const apiUrl = `https://v2.api.noroff.dev/auction/profiles/${name}`;
    const updatedProfileData = {
        avatar: {
            url: avatarUrl,
            alt: '',
        },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(updatedProfileData),
        });

        if (!response.ok) {
            console.error('Response details:', response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedData = await response.json();
        console.log('Avatar updated successfully:', updatedData);
        window.location.reload();
    } catch (error) {
        console.error('Error updating avatar:', error.message);
    }
}