// Fetch single listing
import { API_BASE_LISTINGS } from '../../utils/contants.js';
import { defaultHeaders } from '../../utils/headers.js';

export async function singleListing() {
    // Get id from the listing
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        console.error(`No listing ID provided in URL`);
        return null;
    }

    const listingId = `${API_BASE_LISTINGS}/${id}`;

    try {
        const response = await fetch(listingId, {
            method: 'GET',
            headers: defaultHeaders,
        });

        if (!response.ok) {
            console.error(`Error fetching listing: ${response.status}`);
            throw new Error(`Failed to fetch listing`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching data from server', error.message);
        return null;
    }
}