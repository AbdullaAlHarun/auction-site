import { API_BASE_LISTINGS } from '../../utils/contants.js';
import { authHeaders } from '../../utils/headers.js';

// Fetch bidder history
export async function getBidderHistory() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    try {
        const url = `${API_BASE_LISTINGS}/${id}/?_seller=true&_bids=true`;
        const response = await fetch(url, {
            method: 'GET',
            headers: authHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch bidder history');
        }

        return data?.data?.bids || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}