// Toggle contact info modal
function toggleContactsModal() {
    const modal = document.getElementById('contactsModal');
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    const modal = document.getElementById('contactsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// RTL Gallery duplication and animation setup
(function(){
    const track = document.getElementById('rtl-track');
    if (!track) return;

    // Duplicate the track contents to create a seamless loop
    track.innerHTML = track.innerHTML + track.innerHTML;

    // Ensure animation duration is proportional to content width
    function updateSpeedFromWidth() {
        const baseSpeedPerPx = 0.02;
        const firstHalfWidth = track.scrollWidth / 2;
        const durationSeconds = Math.max(8, Math.round(firstHalfWidth * baseSpeedPerPx));
        track.style.animationDuration = durationSeconds + 's';
    }
    updateSpeedFromWidth();
    window.addEventListener('resize', updateSpeedFromWidth);

    // Pause/resume when gallery gains keyboard focus
    const gallery = track.parentElement;
    gallery.addEventListener('focusin', () => track.style.animationPlayState = 'paused');
    gallery.addEventListener('focusout', () => track.style.animationPlayState = 'running');

    // Respect reduced-motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    function applyReducedMotion() {
        if (mq.matches) {
            track.style.animationPlayState = 'paused';
        } else {
            track.style.animationPlayState = 'running';
        }
    }
    applyReducedMotion();
    mq.addEventListener('change', applyReducedMotion);
})();
