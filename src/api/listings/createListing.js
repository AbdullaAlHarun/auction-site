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
            const errorResponse = await response.json();
            throw new Error(`HTTP error ${response.status}: ${errorResponse.message || 'Unknown error'}`);
        }

        // Parse the response
        const responseData = await response.json();

        // Return the data object or the entire response, depending on the API
        return responseData.data || responseData;
    } catch (error) {
        console.error('Error creating listing:', error.message);
        throw error;
    }
}
