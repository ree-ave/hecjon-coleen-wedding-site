// Create a floating mute/unmute button attached to the bgMusic element
(function () {
  function initMusicControl() {
    const music = document.getElementById('bgMusic');
    if (!music) return;

    // Set volume immediately
    music.volume = 0.45;

    // Check if invite was clicked (mobile redirect scenario)
    const inviteClicked = window._inviteClicked === true;

    // Create toggle button with heart shape
    const btn = document.createElement('button');
    btn.id = 'musicToggle';
    btn.setAttribute('aria-pressed', 'true');
    btn.title = 'Toggle background music';

    // Heart shape styling
    btn.style.position = 'fixed';
    btn.style.right = '12px';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.zIndex = '10000';
    btn.style.width = '52px';
    btn.style.height = '52px';
    btn.style.border = 'none';
    btn.style.background = 'transparent';
    btn.style.cursor = 'pointer';
    btn.style.padding = '0';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.transition = 'transform 0.2s ease';

    function updateIcon() {
      if (music.paused) {
        // Paused state: black heart with play icon
        btn.innerHTML = '<span style="font-size: 48px; line-height: 1;">🖤</span><span style="position: absolute; font-size: 20px; line-height: 1; opacity: 0.9;">▶️</span>';
        btn.setAttribute('aria-pressed', 'false');
        btn.style.transform = 'translateY(-50%) scale(0.9)';
      } else {
        // Playing state: brown heart with pause icon
        btn.innerHTML = '<span style="font-size: 48px; line-height: 1;">🤎</span><span style="position: absolute; font-size: 20px; line-height: 1; opacity: 0.9;">⏸️</span>';
        btn.setAttribute('aria-pressed', 'true');
        btn.style.transform = 'translateY(-50%) scale(1)';
      }
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      // Add a subtle pulse animation on click
      const currentTransform = btn.style.transform;
      btn.style.transform = currentTransform.replace('scale(1)', 'scale(1.2)').replace('scale(0.9)', 'scale(1.1)');
      setTimeout(() => {
        updateIcon();
      }, 100);

      if (music.paused) {
        music.play().catch(() => {});
      } else {
        music.pause();
      }
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
