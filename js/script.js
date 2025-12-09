// Dropdown Menu Toggle
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('dropdownContent');
const dropdownItems = document.querySelectorAll('.dropdown-item');

if (dropdownBtn) {
    dropdownBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdownContent.classList.toggle('active');
    });
}

// Close dropdown when a link is clicked
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        dropdownContent.classList.remove('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-menu-container')) {
        dropdownContent.classList.remove('active');
    }
});

// Toggle contact info modal
function toggleContactsModal() {
    const modal = document.getElementById('contactsModal');
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

// Open image modal for full resolution viewing
function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;
    modalImage.alt = alt;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Allow scrolling again
}

// Close modal when clicking outside the image or on the close button
document.addEventListener('click', function(event) {
    const contactModal = document.getElementById('contactsModal');
    const imageModal = document.getElementById('imageModal');
    
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
    
    if (event.target === imageModal) {
        closeImageModal();
    }
});

// Close image modal on Escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
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

// Invite button animation + redirect (landing page)
document.addEventListener('DOMContentLoaded', function () {
    const invite = document.getElementById('inviteBtn');
    if (!invite) return;

    // quick pressed feedback for touch/click
    invite.addEventListener('pointerdown', function () {
        invite.classList.add('invite-pressed');
    });
    invite.addEventListener('pointerup', function () {
        invite.classList.remove('invite-pressed');
    });

    invite.addEventListener('click', function (e) {
        // prevent immediate navigation so animation can play
        e.preventDefault();
        // play subtle entrance animation then redirect
        invite.classList.add('invite-clicked');
        // disable further interaction
        invite.style.pointerEvents = 'none';
        // wait for the CSS transition to finish, then follow link
        const delay = 340; // ms, matches CSS transition duration
        setTimeout(function () {
            window.location.href = invite.getAttribute('href');
        }, delay);
    });
});
