# Hecjon & Coleen Wedding Website - Complete Code

**Repository**: ree-ave/hecjon-coleen-wedding-site  
**Date**: December 11, 2025  
**Wedding Date**: February 8, 2026  
**Days Remaining**: 59 days

## Table of Contents
1. [HTML - main.html](#htmlmainhtml)
2. [CSS - styles.css](#cssstylescss)
3. [JavaScript - script.js](#javascriptscriptjs)

---

## HTML: main.html

\\\html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Hecjon & Coleen - Wedding</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&family=Great+Vibes&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <header class="hero-section">
        <img src="images/wedding_logo/wedding_logo_white.png" alt="Hecjon & Coleen" class="wedding-logo" style="width: 600px !important; height: auto !important; max-width: 600px !important;">
        <p style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--color-accent); letter-spacing: 3px; text-transform: uppercase; font-weight: 300; margin-top: 10px;">The Wedding</p>
        <p style="font-family: 'Lora', serif; font-size: 1.2rem; color: #000000; margin-top: 5px; margin-bottom: 0;">February 8, 2026</p>
    </header>

        <!-- Navigation removed per request -->
        <!-- Welcome Section -->
        <section id="welcome" class="section">
            <h2>Welcome to our Wedding Website</h2>
            <p>We're so happy you're here. This space is your guide to the celebration- how to get there, what to wear, and how to confirm your presence. We can't wait to celebrate this unforgettable moment with our favorite people.</p>
        </section>

        <!-- Countdown timer (replaces navbar) -->
        <h2 class="countdown-heading">Our Big Day Awaits!</h2>
        <div id="countdownContainer" class="countdown-container" role="timer" aria-live="polite" aria-atomic="true">
            <div class="countdown" id="countdown">
                <div class="countdown-item">
                    <span class="countdown-value" id="cd-days">0</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="cd-hours">00</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="cd-mins">00</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="cd-secs">00</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            </div>
        </div>
        <style>
        /* Load a script-style webfont; fallback order: Luxurious Script (user-specified), Great Vibes, Tangerine, cursive */
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Tangerine:wght@700&display=swap');
        /* Apply to all headings and increase sizes by ~5pt */
        h1,h2,h3,h4,h5,h6 { font-family: 'Luxurious Script', 'Great Vibes', 'Tangerine', cursive !important; }
        h1 { font-size: 5.42rem !important; }
        h2 { font-size: 2.42rem !important; }
        h3 { font-size: 1.42rem !important; }

    /* Countdown styles (kept minimal and self-contained) */
    .countdown-heading { text-align:center; margin:0.35rem 0 0.5rem 0; font-size:6.4rem; letter-spacing:0.6px; }
    .countdown-container { display:flex; justify-content:center; padding:2rem 1rem; width:100%; }
    .countdown { display:flex; gap:1.2rem; align-items:center; justify-content:center; }
    .countdown-item { background: rgba(255,255,255,0.04); padding:1rem 1.2rem; border-radius:8px; min-width:100px; text-align:center; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
    .countdown-value { display:block; font-size:4rem; font-weight:700; line-height:1; }
    .countdown-label { display:block; font-size:1.5rem; opacity:0.9; margin-top:0.4rem; letter-spacing:0.6px; text-transform:uppercase; }
    @media (max-width:900px) { .countdown-heading { font-size:2.4rem; margin:0.35rem 0 0.4rem 0; } .countdown-value { font-size:2.5rem; } .countdown-label { font-size:1rem; } .countdown-container { padding:1.5rem 1rem; } .countdown-item { padding:0.8rem 1rem; min-width:80px; } }
    @media (max-width:520px) { .countdown { gap:0.6rem; } .countdown-item { padding:0.6rem 0.8rem; min-width:65px; } .countdown-heading { font-size:1.8rem; margin:0.35rem 0 0.3rem 0; } .countdown-value { font-size:1.8rem; } .countdown-label { font-size:0.75rem; } .countdown-container { padding:1rem 0.5rem; } }
    .countdown-done { text-align:center; font-weight:700; padding:0.5rem 1rem; }
        </style>
        <script>
        (function(){
            // Wedding date: Feb 8, 2026 (local time)
            const weddingDate = new Date(2026, 1, 8, 0, 0, 0);
            const daysEl = document.getElementById('cd-days');
            const hoursEl = document.getElementById('cd-hours');
            const minsEl = document.getElementById('cd-mins');
            const secsEl = document.getElementById('cd-secs');
            const container = document.getElementById('countdownContainer');

            function pad(n){ return String(n).padStart(2,'0'); }

            function updateCountdown(){
                const now = new Date();
                let diff = Math.floor((weddingDate - now) / 1000); // seconds
                if (isNaN(diff)) return; // defensive
                if (diff <= 0) {
                    // Event passed
                    if (container) container.innerHTML = '<div class="countdown-done">The big day has arrived — congratulations!</div>';
                    clearInterval(timer);
                    return;
                }
                const days = Math.floor(diff / 86400);
                diff -= days * 86400;
                const hours = Math.floor(diff / 3600);
                diff -= hours * 3600;
                const mins = Math.floor(diff / 60);
                const secs = diff - mins * 60;

                if (daysEl) daysEl.textContent = String(days);
                if (hoursEl) hoursEl.textContent = pad(hours);
                if (minsEl) minsEl.textContent = pad(mins);
                if (secsEl) secsEl.textContent = pad(secs);
            }

            updateCountdown();
            const timer = setInterval(updateCountdown, 1000);
        })();
        </script>

    <main class="container">
        <!-- Our Story Page -->
        <section id="story" class="section">
            <h2>Our Story</h2>
            <p>Our journey began years ago, a simple friendship blooming into a lifelong commitment. We are so excited to celebrate our love with all of you.</p>
            <p><strong>Hecjon's perspective:</strong></p>
            <p><strong>Coleen's perspective:</strong></p>
        </section>

        <!-- Gallery Page -->
        <section id="gallery" class="section">
            <h2>Gallery</h2>
            <div class="gallery-grid">
                <!-- Replace src with actual image URLs. Use <img> tags -->
                <div class="gallery-img">Photo Placeholder 1</div>
                <div class="gallery-img">Photo Placeholder 2</div>
                <div class="gallery-img">Photo Placeholder 3</div>
                <div class="gallery-img">Photo Placeholder 4</div>
            </div>
        </section>

        <!-- Right-to-left continuous gallery -->
        <div class="rtl-gallery" aria-label="Photo gallery" tabindex="0">
            <div class="rtl-track" id="rtl-track">
                <img src="images/photo1.jpg" alt="Couple photo 1">
                <img src="images/photo2.jpg" alt="Couple photo 2">
                <img src="images/photo3.jpg" alt="Couple photo 3">
                <img src="images/photo4.jpg" alt="Couple photo 4">
                <!-- add as many images as you like -->
            </div>
        </div>

        <!-- Wedding Attire Page -->
        <section id="attire" class="section">
            <h2>Dress Code</h2>
            </section>

        <!-- Location Page -->
        <section id="location" class="section">
            <h2>Location</h2>
            <img src="images/church/church.jpg" alt="Church venue" style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
            <p>The ceremony and reception will take place at <strong>location</strong>.</p>
            <p><strong>Address:</strong></p>
            <h2>Wedding Day Timeline</h2>
            <ul>
                <li>Ceremony:</li>
                <li>Reception, Dinner & Dancing: Immediately following the ceremony</li>
            </ul>
        </section>

        <!-- RSVP Page -->
        <section id="rsvp" class="section">
            <h2>RSVP</h2>
            <p>Please scan the code to confirm your attendance. The honor of your reply is requested on or before January 15, 2026.</p>
            <img src="images/qr_folder/qr_rsvp.png" alt="RSVP QR Code" class="qr-code">
            <a href="images/qr_folder/qr_rsvp.png" download="RSVP_QR_Code.png" class="download-btn">Download QR Code</a>
        </section>

        <!-- Gift Registry Page -->
        <section id="registry" class="section">
            <h2>Gift Registry</h2>
            <p>Your presence is the greatest gift! If you wish to honor us with a gift, we are registered at the following locations:</p>
            <ul>
                <li><a href="[Link to Store 1]">Store Name 1</a></li>
                <li><a href="[Link to Store 2]">Store Name 2</a></li>
            </ul>
        </section>

        <!-- FAQs Page -->
        <section id="faq" class="section">
            <h2>Frequently Asked Questions</h2>
        </section>
    </main>
    
    <footer>
        <p style="text-align: center; padding: 20px; font-size: 0.8rem;">&copy; 2025 Hecjon & Coleen. All rights reserved.</p>
    </footer>

    <script src="js/script.js" defer></script>
    <script src="js/fix-dropdown.js" defer></script>
    <script src="js/music-control.js" defer></script>
</body>
</html>
















\\\

---

## CSS: styles.css

\\\css
/* 
   CRITICAL: Background Color Strategy
   ====================================
   - Base h1-h6 rule (line ~24): NO background-color (transparent)
   - Section headings (.section h2-h6): Get taupe background (#8c7b64)
   - Hero section (.hero-section): White background with transparent heading backgrounds
   - This prevents unwanted background colors from affecting non-section headings like the logo
*/
/* --- Color Variables & Base Styles --- */
html {
      height: 100%;
      overflow-x: hidden !important;
      width: 100%;
      max-width: 100vw;
      background-attachment: fixed;
}

:root {
    --color-primary: #73816a; /* Sage Green */
    --color-secondary: #8c7b64; /* Taupe/Brown */
    --color-accent: #d4bf9e; /* Champagne */
    --color-background: #ffffff; /* White */
    --color-text: #4b4b4b; /* Dark Gray for readability */
    --color-light-text: #ffffff;
}

body {
      font-family: 'Lora', serif;
      color: var(--color-text);
      background-color: var(--color-background);
      background-image: url('images/wedding_bg/white_satin.jpg');
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
      background-repeat: no-repeat;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      min-height: 100vh;
      max-width: 100vw !important;
      overflow-x: hidden !important;
}

p { margin-bottom: 1rem; text-align: center; }
/* Headings: use Playfair Display and a consistent scale. */
h1, h2, h3, h4, h5, h6 { text-align: center;
    font-family: 'Playfair Display', serif;
    color: #000000;
    padding: 1rem;
}


/* Section headings (h2-h6) - simple centered text */
.section h2,
.section h3,
.section h4,
.section h5,
.section h6 {
    display: block;
    text-align: center;
    margin: 0;
    padding: 1.5rem 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
}

/* Full-width background for section headings using pseudo-element */
.section h2::before,
.section h3::before,
.section h4::before,
.section h5::before,
.section h6::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100vw;
    right: -100vw;
    width: 300vw;
    height: 100%;
    background-color: #8c7b64;
    z-index: -1;
}
h1 { font-size: 7rem !important; text-align: center; margin: 0 !important; }
h2 { text-align: center; font-size: 6rem !important; border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem !important; margin: 0 !important; }
h3 { text-align: center; font-size: 5rem !important; margin: 0 !important; }
h4 { text-align: center; font-size: 4rem !important; margin: 0 !important; }
h5 { text-align: center; font-size: 3rem !important; margin: 0 !important; }
h6 { text-align: center; font-size: 2.4rem !important; margin: 0 !important; }p { margin-bottom: 1rem; }

/* Ensure ALL headings are centered - applies to existing and future headings */
h1, h2, h3, h4, h5, h6 {
    text-align: center !important;
    margin: 0 !important;
    padding: 1rem !important;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background-color: #8c7b64;
    color: #f5f1e8;
    box-sizing: border-box;
}
/* Responsive reductions for headings to keep layout usable on smaller screens */
@media (max-width: 900px) { 
    h1 { text-align: center; font-size: 5.6rem !important; }
    h2 { font-size: 5rem !important; }
    h3 { font-size: 4rem !important; }
    h4 { font-size: 3.2rem !important; }
    h5 { font-size: 2.6rem !important; }
    h6 { font-size: 2rem !important; }
}

@media (max-width: 600px) {
    h1 { font-size: 4rem !important; }
    h2 { font-size: 3.6rem !important; }
    h3 { font-size: 3rem !important; }
    h4 { font-size: 2.4rem !important; }
    h5 { font-size: 2rem !important; }
    h6 { font-size: 1.8rem !important; }
}
p { margin-bottom: 1rem; text-align: center; }
a { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }

.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: transparent;
    border-radius: 8px;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dropdown-menu-container {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
}

.dropdown-btn {
    background-color: var(--color-primary);
    color: var(--color-light-text);
    padding: 15px 30px;
    font-size: 1.3rem;
    font-weight: bold;
    border: 2px solid var(--color-accent);
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    width: auto;
}

.dropdown-btn:hover {
    background-color: var(--color-secondary);
    border-color: var(--color-light-text);
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--color-secondary);
    min-width: 200px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    padding: 12px 0;
    z-index: 1;
    border-radius: 4px;
    /* keep horizontal centering constant */
    left: 50%;
    transform: translateX(-50%);
    /* animate vertical position via top and opacity only */
    top: calc(100% - 10px);
    opacity: 0;
    transition: top 0.22s ease, opacity 0.22s ease;
}

.dropdown-content.active {
    display: block;
    top: 100%;
    opacity: 1;
}

.dropdown-item {
    color: var(--color-light-text);
    padding: 12px 20px;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
}

.dropdown-item:hover {
    background-color: var(--color-primary);
    padding-left: 30px;
    color: var(--color-accent);
}

/* slideDown keyframes removed — using transition on transform+opacity
   so horizontal centering (translateX) is preserved while animating vertically */

/* --- Section Styling --- */
.section {
    padding: 60px 20px;
    border-bottom: 1px solid var(--color-accent);
    background-color: rgba(255, 255, 255, 0.1);
    margin: 20px auto;
    border-radius: 8px;
    text-align: center;
    max-width: 900px;
    overflow: visible;
}

  .hero-section {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 100px 20px;
      overflow: hidden;
      width: 100%;
  }/* Ensure hero section headings don't get taupe background */
.hero-section h1,
.hero-section h2,
.hero-section h3,
.hero-section h4,
.hero-section h5,
.hero-section h6 {
    background-color: transparent !important;
    box-shadow: none !important;
}


/* Gallery specifics (placeholders) */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
}
.gallery-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background-color: var(--color-accent); /* Placeholder background */
}

/* Container */
.rtl-gallery {
    --gallery-gap: 16px;     /* gap between images */
    --gallery-speed: 20s;    /* lower = faster, e.g., '12s' */
    position: relative;
      -webkit-mask-image: radial-gradient(circle, black 70%, transparent 100%);
      mask-image: radial-gradient(circle, black 70%, transparent 100%);
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0;
}

/* Track that scrolls left */
.rtl-track {
    display: flex;
    gap: var(--gallery-gap);
    align-items: center;
    /* The track will be duplicated in JS; animation moves it leftward */
    animation: rtl-scroll linear infinite;
    animation-duration: var(--gallery-speed);
    will-change: transform;
}

/* Images */
.rtl-track img {
    width: 240px;           /* adjust as needed or use max-width */
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
    flex-shrink: 0;         /* prevents images compressing */
}

/* Pause animation on hover or focus for accessibility */
.rtl-gallery:hover .rtl-track,
.rtl-gallery:focus-within .rtl-track {
    animation-play-state: paused;
}

/* Keyframes: translate left by 50% (one copy width) */
@keyframes rtl-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}

/* Small screens: smaller images */
@media (max-width: 600px) {
    .rtl-track img { width: 140px; }
}



/* Invite button click animation (landing page) */
#inviteBtn {
    transition: transform 0.32s cubic-bezier(.2,.9,.3,1), opacity 0.32s ease, box-shadow 0.22s ease;
    will-change: transform, opacity;
}

.invite-clicked {
    transform: scale(1.05) translateY(-6px);
    opacity: 0;
    box-shadow: 0 6px 18px rgba(90,51,54,0.06) !important;
}

.invite-pressed {
    transform: scale(0.98) translateY(0);
}

/* Make the invite button match the site-wide header scale and script font */
.invite-btn, #inviteBtn {
    font-family: 'Luxurious Script','Great Vibes','Tangerine', cursive !important;
    font-size: 6rem !important; /* matches h1 size */
    line-height: 1 !important;
    padding: 28px 56px !important;



















/* Universal image centering for all images (current and future) */
img {
    display: block;
    margin: 15px auto;
    height: auto;
}

  /* Wedding logo - responsive sizing across all devices - DESKTOP */
  .wedding-logo {
      max-width: 600px !important;
      width: 600px !important;
      height: auto !important;
      margin: 5px auto 2px !important;
      display: block !important;
      object-fit: contain !important;
  }

  /* Wedding logo - tablets (1024px and below) */
  @media (max-width: 1024px) {
      .wedding-logo {
          max-width: 575px !important;
          width: 575px !important;
      }
  }

  /* Wedding logo - tablets (900px and below) */
  @media (max-width: 900px) {
      .wedding-logo {
          max-width: 550px !important;
          width: 550px !important;
      }
  }

  /* Wedding logo - tablets (768px and below) */
  @media (max-width: 768px) {
      .wedding-logo {
          max-width: 520px !important;
          width: 520px !important;
      }
  }

  /* Wedding logo - mobile (600px and below) */
  @media (max-width: 600px) {
      .wedding-logo {
          max-width: 480px !important;
          width: 480px !important;
      }
  }

  /* Wedding logo - mobile (480px and below) */
  @media (max-width: 480px) {
      .wedding-logo {
          max-width: 460px !important;
          width: 460px !important;
      }
  }

  /* Wedding logo - mobile (360px and below) */
  @media (max-width: 360px) {
      .wedding-logo {
          max-width: 450px !important;
          width: 450px !important;
      }
  }

    /* QR Code Styling */
  .qr-code {
        display: block !important;
        max-width: 150px !important;
        width: 150px !important;
        height: auto !important;
        margin: 20px auto !important;
        text-align: center;
        border: 2px solid #8c7b64;
        padding: 10px;
        background-color: #ffffff;
  }

  /* Responsive QR code sizing */
  @media (max-width: 1024px) {
        .qr-code {
            max-width: 120px !important;
            width: 120px !important;
      }
  }

  @media (max-width: 900px) {
        .qr-code {
            max-width: 100px !important;
            width: 100px !important;
      }
  }

  @media (max-width: 768px) {
        .qr-code {
            max-width: 80px !important;
            width: 80px !important;
          padding: 8px;
      }
  }

  @media (max-width: 600px) {
        .qr-code {
            max-width: 70px !important;
            width: 70px !important;
          padding: 6px;
          margin: 15px auto !important;
      }
  }

  @media (max-width: 480px) {
        .qr-code {
            max-width: 80px !important;
            width: 80px !important;
          padding: 5px;
          border: 1px solid #8c7b64;
          margin: 12px auto !important;
      }
  }

  @media (max-width: 360px) {
        .qr-code {
            max-width: 70px !important;
            width: 70px !important;
          padding: 4px;
          border: 1px solid #8c7b64;
          margin: 10px auto !important;
      }
  }

  /* Download button for QR code */
  .download-btn {
        display: block;
        width: fit-content;
        margin: 15px auto 0 !important;
        background-color: #8c7b64;
        color: #f5f1e8;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: all 0.3s ease;
      font-size: 0.95rem;
      text-align: center;
  }

  .download-btn:hover {
      background-color: #73816a;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
  }

  .download-btn:active {
      transform: translateY(0);
  }

  /* Center the download button in RSVP section */
  #rsvp {
      text-align: center;
  }

  #rsvp .download-btn {
      display: block;
      width: fit-content;
      margin: 15px auto 0 !important;
  }

  @media (max-width: 600px) {
      .download-btn {
          padding: 10px 18px;
          font-size: 0.85rem;
      }
  }

  /* Scroll-triggered paragraph animations */
.section p {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity, transform;
}

.section p.visible {
    opacity: 1;
    transform: translateX(0);
}

/* Lock horizontal scrolling on mobile and tablet */
  @media (max-width: 768px) {
      html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          width: 100vw !important;
      }
      .section h2,
      .section h3,
      .section h4,
      .section h5,
      .section h6 {
          text-align: center !important;
      }
  }














\\\

---

## JavaScript: script.js

\\\javascript
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
            const weddingDate = new Date(2026,1,8,0,0,0); // Feb 8, 2026 local time
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
        
        // Trigger zoom fade out transition on the invite wrapper
        const inviteWrap = document.querySelector('.invite-wrap');
        if (inviteWrap) {
            inviteWrap.classList.add('invite-exit');
        }
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

// Scroll-triggered paragraph animations
document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('.section p');
    
    if (paragraphs.length === 0) return; // No paragraphs to animate
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger when element is 100px from bottom of viewport
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animation for each paragraph
                const paragraphs = Array.from(document.querySelectorAll('.section p'));
                const index = paragraphs.indexOf(entry.target);
                const delay = index * 100; // 100ms delay between each paragraph
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    paragraphs.forEach(p => observer.observe(p));
});

});





\\\

---

## Summary

### Project Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Countdown Timer**: Displays days, hours, minutes, seconds to February 8, 2026
- **RSVP QR Code**: Scannable QR code for wedding responses with download functionality
- **Satin Background**: White satin texture background throughout the website
- **Dark Mode Compatible**: Uses CSS variables for easy theme customization
- **Scroll Animations**: Smooth paragraph animations on scroll
- **Full-Width Headers**: Headers extend edge-to-edge with taupe background

### Responsive Breakpoints
- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 480px - 767px
- Small Mobile: 360px - 479px

### Key Technologies
- HTML5 semantic markup
- CSS3 with CSS variables and media queries
- Vanilla JavaScript (no frameworks)
- GitHub Pages automatic deployment
- Git version control (80+ commits)

### Design Colors
- Primary (Sage Green): #73816a
- Secondary (Taupe): #8c7b64
- Accent (Champagne): #d4bf9e
- Background (White): #ffffff
- Text (Dark Gray): #4b4b4b

### Images Used
- wedding_logo_white.png (1563x1563px, responsive sizing)
- white_satin.jpg (satin background texture)
- qr_rsvp.png (RSVP QR code)

### Last Updated
Commit: 279df1d - Fix satin background visibility
