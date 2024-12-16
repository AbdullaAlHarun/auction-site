import { createListing } from '../../api/listings/createListing.js';

// Create listing submit function
document.getElementById('createForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Fetch form field values
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const tags = document.getElementById('tags').value.trim();
    const media = document.getElementById('media').value.trim();
    const endsAtInput = document.getElementById('endsAt').value.trim();

    // Validate endsAt (date-time)
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!isoFormatRegex.test(endsAtInput)) {
        alert('Please enter the date and time in the correct format.');
        return;
    }

    // Convert to ISO format
    const endsAt = new Date(endsAtInput).toISOString();

    // Create listing object
    const listingData = {
        title,
        description: description || undefined,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : undefined,
        media: media
            ? [
                {
                    url: media,
                    alt: 'User-provided data',
                },
            ]
            : undefined,
        endsAt,
    };

    // API call to create listing
    try {
        const result = await createListing(listingData);
        console.log('Listing created successfully:', result);
        // Redirect to homepage or another page after successful creation
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to create listing:', error.message);
    }
});
