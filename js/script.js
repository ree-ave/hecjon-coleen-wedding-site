(function() {
    // --- 1. Countdown Logic ---
    const weddingDate = new Date(2026, 1, 8, 0, 0, 0); // Feb 8, 2026
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateCountdown() {
        const now = new Date();
        let diff = Math.floor((weddingDate - now) / 1000);

        if (diff <= 0) {
            document.getElementById('countdownContainer').innerHTML = '<div>The Big Day is Here!</div>';
            return;
        }

        const days = Math.floor(diff / 86400);
        diff -= days * 86400;
        const hours = Math.floor(diff / 3600);
        diff -= hours * 3600;
        const mins = Math.floor(diff / 60);
        const secs = diff - mins * 60;

        if(daysEl) daysEl.textContent = days;
        if(hoursEl) hoursEl.textContent = pad(hours);
        if(minsEl) minsEl.textContent = pad(mins);
        if(secsEl) secsEl.textContent = pad(secs);
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 2. Intelligent Scroll Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Special handling for story section - left to center animation
                if (entry.target.id === 'story') {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.classList.add('story-visible');
                        }, index * 150);
                    });
                } else {
                    // Default animation for other sections
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.classList.add('visible');
                        }, index * 150);
                    });
                }
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .section p { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .section p.visible { opacity: 1 !important; transform: translateY(0) !important; }
        #story p { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s ease, transform 0.8s ease; }
        #story p.story-visible { opacity: 1 !important; transform: translateX(0) !important; }
    `;
    document.head.appendChild(style);

    // --- 2b. Image Animation ---
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const images = entry.target.querySelectorAll('.timeline-img');
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, index * 150);
                });
                imageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-image').forEach(container => {
        imageObserver.observe(container);
    });

    // --- 2c. Gifts QR Image Animation ---
    const giftsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const giftsQR = entry.target.querySelector('.gifts-qr-container .qr-code');
                if (giftsQR) {
                    setTimeout(() => {
                        giftsQR.classList.add('visible');
                    }, 150);
                }
                giftsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const giftsContainer = document.querySelector('.gifts-qr-container');
    if (giftsContainer) {
        giftsObserver.observe(giftsContainer);
    }

    // --- 2d. FAQ Animation ---
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const faqItems = entry.target.querySelectorAll('.faq-item');
                faqItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 150);
                });
                faqObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const faqSection = document.getElementById('faq');
    if (faqSection) {
        faqObserver.observe(faqSection);
    }

    // --- 2e. Dress Code Animation ---
    const dressCodeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraphs = entry.target.querySelectorAll('p');
                const images = entry.target.querySelectorAll('.color-palette-img, .dress-code-img');
                
                // Animate paragraphs
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.classList.add('visible');
                    }, index * 150);
                });
                
                // Animate images
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, (paragraphs.length + index) * 150);
                });
                
                dressCodeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const dressCodeSections = document.querySelectorAll('.detail-block');
    dressCodeSections.forEach(section => {
        const heading = section.querySelector('h3');
        if (heading && heading.textContent.includes('Dress Code')) {
            dressCodeObserver.observe(section);
        }
    });

    // --- 3. Music Control Button ---
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (musicToggle && backgroundMusic) {
        // Initialize button state
        musicToggle.classList.add('paused');
        
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(err => {
                    console.log('Music playback failed:', err);
                });
                musicToggle.classList.remove('paused');
                musicToggle.classList.add('playing');
            } else {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.classList.add('paused');
            }
        });

        // Update button state when audio ends
        backgroundMusic.addEventListener('ended', () => {
            musicToggle.classList.remove('playing');
            musicToggle.classList.add('paused');
        });
    }

    // --- 3d. Attire Button Animation ---
    const attireButtonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.8s ease 0.3s forwards';
                attireButtonObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const attireContainer = document.querySelector('.attire-button-container');
    if (attireContainer) {
        attireButtonObserver.observe(attireContainer);
    }

    // --- 4. Attire Inspo Modal ---
    const attireBtn = document.querySelector('.attire-inspo-btn');
    const attireModal = document.getElementById('attireModal');

    if (attireBtn && attireModal) {
        // Open modal when button is clicked
        attireBtn.addEventListener('click', () => {
            attireModal.classList.add('active');
        });

        // Close modal when clicking anywhere on the modal (outside the content area or background)
        attireModal.addEventListener('click', (e) => {
            if (e.target === attireModal) {
                attireModal.classList.remove('active');
            }
        });

        // Also close when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && attireModal.classList.contains('active')) {
                attireModal.classList.remove('active');
            }
        });
    }

    // --- 5. Gallery Loop Fix (Optional) ---
    // If you don't have enough images to fill the screen, this doubles them
    const track = document.getElementById('rtl-track');
    if (track) {
        track.innerHTML += track.innerHTML; 
    }
})();