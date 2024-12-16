// Create listings
import { API_BASE_LISTINGS } from '../../utils/contants.js';
import { authHeaders } from '../../utils/headers.js';

export async function createListing(listingData) {
    try {
        const response = await fetch(API_BASE_LISTINGS, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            console.error('Response details:', response);
            throw new Error(`HTTP error ${response.status}`);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating listing', error.message);
        throw error;
    }
}