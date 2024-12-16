// Fetch profile data
import { API_KEY } from '../../utils/contants.js';
import { API_PROFILES } from '../../utils/contants.js';

export async function profileData() {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('accessToken');
    const url = `${API_PROFILES}/${name}`;
    if (!token) {
        console.error('No access token found in session storage.');
        return null;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            }
        });

        if (!response.ok) {
            console.error('Response details:', response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching fetch-requests data:', error.message);
        return null;
    }
}