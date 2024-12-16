import { placeBid } from '../../api/bid/placeBid.js';

document.addEventListener('DOMContentLoaded', () => {
    const placeBidButton = document.querySelector('#place-bid-btn');
    const bidInput = document.querySelector('#bid-amount');

    if (placeBidButton) {
        placeBidButton.addEventListener('click', async () => {
            const amount = parseFloat(bidInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid bid amount.');
                return;
            }

            const result = await placeBid(amount);
            if (result) {
                alert('Bid placed successfully!');
                // Update the number of bids
                const bidsCount = document.querySelector('#bids');
                if (bidsCount) {
                    const currentCount = parseInt(bidsCount.textContent.split(': ')[1], 10) || 0;
                    bidsCount.textContent = `Bids: ${currentCount + 1}`;
                }
            } else {
                alert('Failed to place bid. Please try placing a higher amount.');
            }
        });
    }
});