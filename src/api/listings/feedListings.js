// Fetch all listings from all users
import { API_BASE_LISTINGS } from '../../utils/contants.js';
import { defaultHeaders } from '../../utils/headers.js';

export async function feedListings() {
    try {
        const response = await fetch(`${API_BASE_LISTINGS}?sort=created`, {
            method: 'GET',
            headers: defaultHeaders,
        });

        if (!response.ok) {
            console.error('Response details:', response);
            throw new Error(`HTTP error ${response.status}`);
        }

        const { data } = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching listings:', error.message);
        throw error;
    }
}