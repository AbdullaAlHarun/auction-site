import { API_KEY } from './contants.js';

// No auth required
export const defaultHeaders = {
    'Content-Type': 'application/json',
};

// Auth required
export function authHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-KEY': API_KEY,
        'Content-Type': 'application/json'
    };
}