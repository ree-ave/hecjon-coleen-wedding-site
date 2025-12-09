// Create a floating mute/unmute button attached to the bgMusic element
(function () {
  function initMusicControl() {
    const music = document.getElementById('bgMusic');
    if (!music) return;

    // Create toggle button
    const btn = document.createElement('button');
    btn.id = 'musicToggle';
    btn.setAttribute('aria-pressed', 'false');
    btn.title = 'Toggle background music';
    btn.style.position = 'fixed';
    btn.style.right = '16px';
    btn.style.bottom = '16px';
    btn.style.zIndex = '10000';
    btn.style.width = '48px';
    btn.style.height = '48px';
    btn.style.borderRadius = '24px';
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

    // Initial state
    updateIcon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicControl);
  } else {
    initMusicControl();
  }
})();
