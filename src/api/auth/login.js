import { API_KEY, API_LOGIN } from '../../utils/contants.js';

export async function loginUser(email, password) {
    const postData = { email, password };

    try {
        const response = await fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff_API_KEY': API_KEY
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Incorrect email or password');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}