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
    restoreScrolling();
  }, { passive: true });
});
