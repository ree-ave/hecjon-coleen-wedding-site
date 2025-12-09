// Fix dropdown show/hide behavior: robust toggle, outside click, ESC close
function initDropdowns() {
  function closeMenu(menu, btn) {
    if (!menu) return;
      menu.classList.remove('active');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function openMenu(menu, btn) {
    if (!menu) return;
      menu.classList.add('active');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  document.querySelectorAll('.dropdown-menu-container').forEach(container => {
    const btn = container.querySelector('.dropdown-btn');
    const menu = container.querySelector('.dropdown-content');
    if (!btn || !menu) return;

    // Ensure initial ARIA
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
      // Ensure initial visibility follows the 'active' class (CSS controls display)
      menu.classList.toggle('active', menu.classList.contains('active'));

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
        const isOpen = menu.classList.contains('active');
        if (isOpen) closeMenu(menu, btn); else openMenu(menu, btn);
    });

    // close when a menu item is clicked
    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', function () {
        closeMenu(menu, btn);
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', function () {
      document.querySelectorAll('.dropdown-content.active').forEach(menu => {
      const container = menu.closest('.dropdown-menu-container');
      const btn = container ? container.querySelector('.dropdown-btn') : null;
      closeMenu(menu, btn);
    });
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown-content.active').forEach(menu => {
        const container = menu.closest('.dropdown-menu-container');
        const btn = container ? container.querySelector('.dropdown-btn') : null;
        closeMenu(menu, btn);
      });
    }
  });
}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDropdowns);
} else {
  initDropdowns();
}
