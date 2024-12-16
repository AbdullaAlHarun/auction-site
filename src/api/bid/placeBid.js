// Place bid request
import { API_BASE_LISTINGS } from '../../utils/contants.js';
import { authHeaders } from '../../utils/headers.js';

// Place bid request
export async function placeBid(amount) {
    // Get id from the listing
    const params = new URLSearchParams(window.location.search);
    const idBid = params.get('id');

    if (!idBid) {
        console.error(`No listing ID provided or found.`);
        return null;
    }

    const listingIdBid = `${API_BASE_LISTINGS}/${idBid}/bids`;

    try {
        const response = await fetch(listingIdBid, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            console.error(`Error placing bid: Try placing a higher amount`);
            throw new Error(`Failed to place bid`);
        }

        const data = await response.json();
        window.location.reload();
        return data.data;
    } catch (error) {
        console.error('Error fetching listing:', error.message);
        return null;
    }
}