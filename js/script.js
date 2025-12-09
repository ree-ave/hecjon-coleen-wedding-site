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
        // play subtle entrance animation
        invite.classList.add('invite-clicked');
        // disable further interaction
        invite.style.pointerEvents = 'none';

        // After animation, fetch main.html and insert the main site
        const delay = 340; // ms, matches CSS transition duration
        setTimeout(function () {
            const href = invite.getAttribute('href');
            // Try to fetch main.html and insert its body to avoid full navigation
            fetch(href, { cache: 'no-store' }).then(response => {
                if (!response.ok) throw new Error('Fetch failed');
                return response.text();
            }).then(htmlText => {
                // Parse the returned HTML and extract the <body> contents
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                const newBody = doc.body;

                // Replace current body content with the fetched page's body
                // Keep the current <head> (CSS and fonts already loaded)
                document.documentElement.replaceChild(newBody, document.body);

                // Allow scrolling now that the main content is visible
                document.body.style.overflow = 'auto';

                // Re-execute any scripts included in the fetched document so
                // dropdowns, galleries, and music controls initialize properly.
                try {
                    const fetchedScripts = doc.querySelectorAll('script');
                    fetchedScripts.forEach(oldScript => {
                        const newScript = document.createElement('script');
                        if (oldScript.src) {
                            // Append as an immediately-executing script (no defer/async)
                            newScript.src = oldScript.getAttribute('src');
                            newScript.async = false;
                            document.body.appendChild(newScript);
                        } else {
                            // Inline scripts should execute immediately
                            newScript.textContent = oldScript.textContent;
                            document.body.appendChild(newScript);
                        }
                    });

                    // Ensure essential scripts are present if not inlined
                    ['js/script.js', 'js/fix-dropdown.js', 'js/music-control.js'].forEach(src => {
                        const exists = Array.from(document.scripts).some(s => s.src && s.src.endsWith(src));
                        if (!exists) {
                            const sc = document.createElement('script');
                            sc.src = src;
                            sc.async = false;
                            document.body.appendChild(sc);
                        }
                    });
                } catch (e) {
                    console.warn('Error re-initializing fetched scripts:', e);
                    // As a fallback, append the main script
                    const s = document.createElement('script');
                    s.src = 'js/script.js';
                    s.defer = true;
                    document.body.appendChild(s);
                }
            }).catch(err => {
                // fallback to normal navigation if fetch fails
                console.error('Could not load main site inline:', err);
                window.location.href = href;
            });
        }, delay);
    });
});
