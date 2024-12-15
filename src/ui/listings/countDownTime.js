// Countdown timer
export function startCountdown(endDate, element, showFullCountdown = true) {
    if (!endDate || !element) {
        element.textContent = 'No end date available';
        return;
    }

    const endsAtDate = new Date(endDate);

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = endsAtDate - now;

        if (timeRemaining <= 0) {
            element.textContent = 'The listing has ended!';
            clearInterval(timerInterval);
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

            if (showFullCountdown) {
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                element.innerHTML = `<span class="font-semibold">Ends in:</span> ${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                element.innerHTML = `<span class="font-semibold">Ends in:</span>&nbsp;${days}d ${hours}h ${minutes}m`;
            }
        }
    }
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}