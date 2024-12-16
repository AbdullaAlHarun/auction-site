import { API_BASE_LISTINGS } from '../../utils/contants.js';
import { defaultHeaders } from '../../utils/headers.js';

// Search fetch
export async function fetchSearch(query, listingId) {
    try {
        const searchResponse = await fetch(`${API_BASE_LISTINGS}/search?q=${encodeURIComponent(query)}`);
        if (!searchResponse.ok) {
            throw new Error('Error fetching search results');
        }
        const searchData = await searchResponse.json();

        if (listingId) {
            const listingResponse = await fetch(listingId, {
                method: 'GET',
                headers: defaultHeaders,
            });
            if (!listingResponse.ok) {
                throw new Error('Error fetching listing details');
            }
            const listingData = await listingResponse.json();
            return { searchResults: searchData.listings, listingDetails: listingData };
        }

        return { searchResults: searchData.data };
    } catch (error) {
        console.error('Error:', error);
        return { searchResults: [], listingDetails: null };
    }
}