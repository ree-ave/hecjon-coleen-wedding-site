// Create a floating mute/unmute button attached to the bgMusic element
(function () {
  function initMusicControl() {
    const music = document.getElementById('bgMusic');
    if (!music) return;

    // Set volume immediately
    music.volume = 0.45;
    
    // Check if invite was clicked (mobile redirect scenario)
    const inviteClicked = window._inviteClicked === true;

    // Create toggle button
    const btn = document.createElement('button');
    btn.id = 'musicToggle';
    btn.setAttribute('aria-pressed', 'true');
    btn.title = 'Toggle background music';
    // Float vertically centered on the right side
    btn.style.position = 'fixed';
    btn.style.right = '12px';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.zIndex = '10000';
    btn.style.width = '52px';
    btn.style.height = '52px';
    btn.style.borderRadius = '26px';
    btn.style.border = 'none';
    btn.style.background = 'rgba(140, 123, 100, 0.85)';
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
        music.play().catch(() => {});
      } else {
        music.pause();
      }
      updateIcon();
    });

    // Update icon on play/pause events
    music.addEventListener('play', updateIcon);
    music.addEventListener('pause', updateIcon);

    // Insert button into body
    document.body.appendChild(btn);

    // Function to attempt playing music
    function attemptPlay() {
      if (music.paused) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('[Music] Successfully playing');
            updateIcon();
          }).catch(err => {
            console.log('[Music] Autoplay prevented (this is normal on mobile):', err.name);
            updateIcon();
          });
        }
      }
    }

    // If on main page (invite was clicked), attempt to play immediately
    if (inviteClicked) {
      attemptPlay();
      
      // Add a one-time user interaction handler to play music if it failed
      // This ensures music starts when user interacts with the page
      const playOnInteraction = function() {
        attemptPlay();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      };
      
      document.addEventListener('click', playOnInteraction, { once: true });
      document.addEventListener('touchstart', playOnInteraction, { once: true });
    } else {
      // On landing page, attempt to play
      attemptPlay();
    }
    
    updateIcon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicControl);
  } else {
    initMusicControl();
  }
})();
