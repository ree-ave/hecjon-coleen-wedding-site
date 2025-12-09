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

    // Countdown initializer — safe to call multiple times; attached to window for inline-load invocation
    (function(){
        function pad(n){ return String(n).padStart(2,'0'); }
        function createCountdown(weddingDate){
            // captures elements
            const daysEl = document.getElementById('cd-days');
            const hoursEl = document.getElementById('cd-hours');
            const minsEl = document.getElementById('cd-mins');
            const secsEl = document.getElementById('cd-secs');
            const container = document.getElementById('countdownContainer');
            if (!container || !daysEl) return null;

            function update(){
                const now = new Date();
                let diff = Math.floor((weddingDate - now) / 1000);
                if (isNaN(diff)) return;
                if (diff <= 0){
                    container.innerHTML = '<div class="countdown-done">The big day has arrived — congratulations!</div>';
                    return 'done';
                }
                const days = Math.floor(diff / 86400);
                diff -= days * 86400;
                const hours = Math.floor(diff / 3600);
                diff -= hours * 3600;
                const mins = Math.floor(diff / 60);
                const secs = diff - mins * 60;

                daysEl.textContent = String(days);
                hoursEl.textContent = pad(hours);
                minsEl.textContent = pad(mins);
                secsEl.textContent = pad(secs);
                return 'running';
            }

            // run once and return the interval id
            const first = update();
            if (first === 'done') return null;
            const id = setInterval(()=>{
                const r = update();
                if (r === 'done') clearInterval(id);
            }, 1000);
            return id;
        }

        function initCountdownInline(){
            // clear previous timer if present
            try{ if (window._countdownTimer) { clearInterval(window._countdownTimer); window._countdownTimer = null; } }catch(e){}
            const weddingDate = new Date(2026,1,28,0,0,0); // Feb 28, 2026 local time
            const id = createCountdown(weddingDate);
            if (id) window._countdownTimer = id;
        }

        // expose globally so inline-load code can call it
        window.initCountdownInline = initCountdownInline;

        // If the DOM already contains the countdown (e.g., page loaded directly), start it now
        if (document.readyState === 'complete' || document.readyState === 'interactive'){
            if (document.getElementById('countdownContainer')) initCountdownInline();
        }else{
            document.addEventListener('DOMContentLoaded', function(){ if (document.getElementById('countdownContainer')) initCountdownInline(); });
        }
    })();
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

// Inline fallback initializers: ensure dropdown and music controls
function initDropdownsInline() {
    document.querySelectorAll('.dropdown-menu-container').forEach(container => {
        const btn = container.querySelector('.dropdown-btn');
        const menu = container.querySelector('.dropdown-content');
        if (!btn || !menu) return;
        // Avoid double-binding
        if (btn._dropdownBound) return;
        btn._dropdownBound = true;

        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', menu.classList.contains('active') ? 'true' : 'false');

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = menu.classList.contains('active');
            if (isOpen) {
                menu.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                menu.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        menu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function () {
                menu.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // outside click
    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-content.active').forEach(menu => {
            const container = menu.closest('.dropdown-menu-container');
            const btn = container ? container.querySelector('.dropdown-btn') : null;
            if (btn) btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
        });
    });
}

function initMusicControlInline() {
    // If music control already present, skip
    if (document.getElementById('musicToggle')) return;
    const music = document.getElementById('bgMusic');
    if (!music) return;

    // Create button (similar to music-control.js)
    const btn = document.createElement('button');
    btn.id = 'musicToggle';
    btn.setAttribute('aria-pressed', 'false');
    btn.title = 'Toggle background music';
    btn.style.position = 'fixed';
    btn.style.right = '12px';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.zIndex = '10000';
    btn.style.width = '52px';
    btn.style.height = '52px';
    btn.style.borderRadius = '26px';
    btn.style.border = 'none';
    btn.style.background = 'rgba(255,255,255,0.9)';
    btn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
    btn.style.fontSize = '18px';
    btn.style.cursor = 'pointer';

    function updateIcon() {
        if (music.paused) {
            btn.textContent = '🔇';
            btn.setAttribute('aria-pressed', 'false');
        } else {
            btn.textContent = '🔊';
            btn.setAttribute('aria-pressed', 'true');
        }
    }

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (music.paused) {
            music.play().catch(()=>{});
        } else {
            music.pause();
        }
        updateIcon();
    });

    music.addEventListener('play', updateIcon);
    music.addEventListener('pause', updateIcon);

    document.body.appendChild(btn);
    updateIcon();
}

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

                // Ensure the background audio element exists in the head.
                try {
                    if (!document.getElementById('bgMusic')) {
                        const audio = document.createElement('audio');
                        audio.id = 'bgMusic';
                        audio.src = 'audio/Sa Bawat Sandali - Amiel Sol (Official Music Video).mp3';
                        audio.loop = true;
                        audio.preload = 'auto';
                        document.head.appendChild(audio);
                    }
                } catch (audioErr) {
                    console.warn('Could not ensure bgMusic element:', audioErr);
                }

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
                    // Run inline initializers (if present) to ensure UI is wired up
                    try {
                        setTimeout(function () {
                            if (typeof initDropdownsInline === 'function') initDropdownsInline();
                            if (typeof initMusicControlInline === 'function') initMusicControlInline();
                               if (typeof initCountdownInline === 'function') initCountdownInline();
                        }, 0);
                    } catch (initErr) {
                        console.warn('Failed to run inline initializers:', initErr);
                    }
                } catch (e) {
                    console.warn('Error re-initializing fetched scripts:', e);
                    // As a fallback, append the main script
                    const s = document.createElement('script');
                    s.src = 'js/script.js';
                    s.defer = true;
                    document.body.appendChild(s);
                    // Try initializers again after fallback
                    setTimeout(function () {
                        try { if (typeof initDropdownsInline === 'function') initDropdownsInline(); } catch (_) {}
                        try { if (typeof initMusicControlInline === 'function') initMusicControlInline(); } catch (_) {}
                           try { if (typeof initCountdownInline === 'function') initCountdownInline(); } catch (_) {}
                    }, 50);
                }
                // If the user already clicked the invite, try playing the bgMusic now that it exists
                try {
                    if (window._inviteClicked) {
                        const music = document.getElementById('bgMusic');
                        if (music) {
                            music.volume = 0.45;
                            const p = music.play();
                            if (p && typeof p.then === 'function') p.catch(() => {});
                        }
                    }
                } catch (playErr) {
                    console.warn('Error attempting to play bgMusic after inject:', playErr);
                }
            }).catch(err => {
                // fallback to normal navigation if fetch fails
                console.error('Could not load main site inline:', err);
                window.location.href = href;
            });
        }, delay);
    });
});
