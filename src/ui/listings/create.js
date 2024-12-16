import { createListing } from '../../api/listings/createListing.js';

// Create listing submit function
document.getElementById('createForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const tags = document.getElementById('tags').value.trim();
    const media = document.getElementById('media').value.trim();
    const endsAtInput = document.getElementById('endsAt').value.trim();

    // Validation
    if (!title) {
        alert('Title is required.');
        return;
    }

    if (!endsAtInput) {
        alert('Ends At date and time is required.');
        return;
    }

    // Validate Ends At format
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!isoFormatRegex.test(endsAtInput)) {
        alert('Please enter the date and time in the correct format.');
        return;
    }

    const endsAt = new Date(endsAtInput).toISOString();

    const listingData = {
        title,
        description: description || undefined,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : undefined,
        media: media
            ? [
                {
                    url: media,
                    alt: 'User-provided image',
                },
            ]
            : undefined,
        endsAt,
    };

    try {
        const result = await createListing(listingData);
        console.log('Listing created successfully:', result);
        alert('Listing created successfully!');
        window.location.href = '../index.html'; // Redirect to homepage
    } catch (error) {
        alert('Failed to create listing. Please try again.');
        console.error('Failed to create listing:', error.message);
    }
});
