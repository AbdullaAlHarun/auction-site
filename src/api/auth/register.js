import { API_REGISTER } from '../../utils/contants.js';

export async function registerUser(registerData) {
    try {
        const response = await fetch(API_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Register error:', error.message);
        throw error;
    }
}
