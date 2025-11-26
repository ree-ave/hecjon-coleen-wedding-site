# Hecjon & Coleen Wedding Website

A beautiful, responsive wedding website for Hecjon and Coleen's special day on February 8, 2026.

## Features

- 🎨 **Elegant Design**: Champagne and Sage Green color scheme
- 🖼️ **Right-to-Left Gallery**: Continuously scrolling photo gallery
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🎯 **RSVP Contact**: Direct contact information for coordinators
- 📍 **Location & Schedule**: Venue details and timeline
- 🎁 **Gift Registry**: Links to registered gift retailers
- ❓ **FAQ Section**: Common questions answered

## Project Structure

```
Wedding/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Photo folder
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning the repository)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hecjon/hecjon-coleen-wedding-site.git
   cd Wedding
   ```

2. **Serve locally using Node.js:**
   ```bash
   npx http-server -p 8000
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:8000`

### Deployment

To deploy to GitHub Pages:

1. Push to the `main` branch:
   ```bash
   git push origin main
   ```

2. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Select `main` branch as the source
   - Your site will be available at: `https://hecjon.github.io/hecjon-coleen-wedding-site/`

## Customization

### Update Contact Information
Edit the RSVP section in `index.html`:
- Replace phone numbers
- Update email addresses
- Modify coordinator names if needed

### Add Photos
1. Place image files in the `images/` folder
2. Update image paths in `index.html` in the gallery sections

### Customize Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --color-primary: #73816a;        /* Change the sage green */
    --color-secondary: #8c7b64;      /* Change the taupe */
    --color-accent: #d4bf9e;         /* Change the champagne */
    --color-background: #f2e8d9;     /* Change the cream */
    --color-text: #4b4b4b;           /* Change the text color */
}
```

### Modify Content
- Edit story, attire, location, registry, and FAQ sections directly in `index.html`

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling and animations
- **JavaScript**: Interactive features (modal, gallery animation)
- **Google Fonts**: Great Vibes and Playfair Display fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is personal and confidential to Hecjon & Coleen.

## Contact

For questions about the wedding:
- **Hecjon**: (123) 456-7890 | hecjon@example.com
- **Coleen**: (098) 765-4321 | coleen@example.com

---

Made with ❤️ for the big day!
