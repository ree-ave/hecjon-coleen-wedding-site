// Restore scrolling when the invite button is clicked
document.addEventListener('DOMContentLoaded', function () {
  const invite = document.getElementById('inviteBtn');
  if (!invite) return;

  // Name used to remove listeners if they were added elsewhere
  function _preventTouchDefault(e) { e.preventDefault(); }

  // Restore scrolling-related styles and remove any touch blockers
  function restoreScrolling() {
    try {
      document.removeEventListener('touchmove', _preventTouchDefault, { passive: false });
      document.removeEventListener('wheel', _preventTouchDefault, { passive: false });
    } catch (e) {
      // ignore if not present
    }

    // Clear inline style locks on html/body
    try {
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      document.documentElement.style.width = '';

      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.touchAction = '';

      if (window._savedScrollY !== undefined) {
        window.scrollTo(0, window._savedScrollY || 0);
        window._savedScrollY = undefined;
      }
    } catch (err) {
      console.warn('restoreScrolling error:', err);
    }
  }

  // When user clicks the invite button, immediately restore scrolling
  invite.addEventListener('click', function (ev) {
    // allow default navigation or inline-loading logic to proceed
    // Remove the class-based lock as well so CSS no longer forces fixed positioning
    try { document.body.classList.remove('invite-locked'); } catch (e) {}
    restoreScrolling();
    // Mark that invite was clicked (user gesture) and try to start background music
    window._inviteClicked = true;
    // Try to start background music (user gesture has occurred)
    try {
      const music = document.getElementById('bgMusic');
      if (music) {
        music.volume = 0.45;
        const p = music.play();
        if (p && typeof p.then === 'function') {
          p.catch(err => console.warn('Music play prevented:', err));
        }
      }
    } catch (err) {
      console.warn('Error attempting to play background music:', err);
    }
  }, { passive: true });
});
