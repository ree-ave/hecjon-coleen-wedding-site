// Navbar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navMenuToggle = document.getElementById('navMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (navMenuToggle && navMenu) {
        navMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
            }
        });
    }
});
