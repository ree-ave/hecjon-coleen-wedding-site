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
        // Paused state: white heart with play icon
        btn.innerHTML = '<span style="font-size: 48px; line-height: 1;">🤍</span><span style="position: absolute; font-size: 20px; line-height: 1; opacity: 0.9;">▶️</span>';
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

  // QR Code Button Handlers
  const openRsvpQrBtn = document.getElementById('openRsvpQr');
  const downloadRsvpQrBtn = document.getElementById('downloadRsvpQr');
  
  if (openRsvpQrBtn) {
    openRsvpQrBtn.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.7); display: flex;
        align-items: center; justify-content: center; z-index: 10001;
      `;
      
      const img = document.createElement('img');
      img.src = 'images/qr_folder/qr_rsvp.png';
      img.alt = 'RSVP QR Code';
      img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px;';
      
      modal.appendChild(img);
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      document.body.appendChild(modal);
    });
  }
  
  if (downloadRsvpQrBtn) {
    downloadRsvpQrBtn.addEventListener('click', function() {
      const link = document.createElement('a');
      link.href = 'images/qr_folder/qr_rsvp.png';
      link.download = 'RSVP_QR_Code.png';
      link.click();
    });
  }

  // Gift QR Code Click to Enlarge
  const giftQrImages = document.querySelectorAll('.clickable-qr');
  giftQrImages.forEach(img => {
    img.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.8); display: flex;
        align-items: center; justify-content: center; z-index: 10002;
      `;
      
      const enlargedImg = document.createElement('img');
      enlargedImg.src = this.src;
      enlargedImg.alt = this.alt;
      enlargedImg.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px; cursor: pointer;';
      
      modal.appendChild(enlargedImg);
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      document.body.appendChild(modal);
    });
  });

  // Timeline Image Click to Enlarge
  const timelineImg = document.querySelector('.clickable-timeline');
  if (timelineImg) {
    timelineImg.style.cursor = 'pointer';
    timelineImg.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.8); display: flex;
        align-items: center; justify-content: center; z-index: 10002;
      `;
      
      const enlargedImg = document.createElement('img');
      enlargedImg.src = this.src;
      enlargedImg.alt = this.alt;
      enlargedImg.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px; cursor: pointer;';
      
      modal.appendChild(enlargedImg);
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      document.body.appendChild(modal);
    });
  }})();

