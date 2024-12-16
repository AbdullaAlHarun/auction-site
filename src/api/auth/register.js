import { API_AUTH_KEY, API_REGISTER } from '../../utils/contants.js';

export async function registerUser(registerData) {
    try {
        const response = await fetch(API_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff_API_KEY': API_AUTH_KEY
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}