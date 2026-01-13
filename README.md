AURIVANE Editorial Fragrance Website

This project is a professional, client-ready editorial website for the AURIVANE fragrance brand. It showcases immersive storytelling for individual perfumes, emphasizes visual elegance, and includes a high-quality newsletter signup flow designed to convert visitors while maintaining accessibility, performance, and SEO standards. The site is optimized for GitHub Pages deployment and includes analytics for measuring engagement.

Overview
The website presents the brand through a refined homepage and dedicated chapter pages for each fragrance story. It uses semantic HTML, responsive CSS, and lightweight JavaScript for smooth interactions. Submissions for the newsletter are handled via Web3Forms, with custom inline validation and localStorage to prevent duplicate signups.

Deliverables
Complete static website suitable for portfolio and client work
Homepage with editorial sections and call to action
Six chapter pages for individual fragrances
Advanced newsletter signup with error handling and backend integration
Google Analytics 4 tracking for engagement events
Accessible, mobile-first, and performant implementation
Organized assets and deployment-ready structure for GitHub Pages

Key Features
Responsive design with mobile-first approach
Custom JavaScript interactions, smooth scrolling, and fade-in animations
Inline form validation without browser popups
Web3Forms integration for newsletter signups
LocalStorage logic to avoid duplicate subscriptions
SEO meta tags and structured data for discoverability
WCAG-oriented accessibility (aria labels, keyboard-friendly navigation, skip link)
Google Analytics 4 event tracking

Pages
index.html is the homepage and includes the newsletter signup
eclat-dore.html, noctis-veil.html, rose-silencieuse.html, lueur-blanche.html, ciel-d-opaline.html are the chapter pages
aurivane-chapter.css contains styles for the chapter pages
styles.css contains global styles
script.js controls interactions, validation, and analytics
images contains all optimized images and videos
extra contains auxiliary content if needed

Tech Stack
HTML5
CSS3
Vanilla JavaScript
Web3Forms API for form submissions
Google Analytics 4 for tracking
GitHub Pages for hosting

Running Locally
Clone or download the repository
Open index.html in a modern browser
Optional: use a local server for smooth navigation and relative paths

Deployment to GitHub Pages
Open your repository on GitHub
Go to Settings, then Pages
Choose Deploy from a branch, select main and root folder
Save and wait for the site to build
If you prefer GitHub Actions deployment, add a Pages workflow and set Build and deployment to GitHub Actions in Settings

Newsletter and Web3Forms Setup
Create or log in to Web3Forms and obtain an access key
In index.html, set the access_key hidden input to your key
Verify the domain in Web3Forms to allow submissions from your site
Submit a test email from the homepage to confirm successful delivery

Analytics Setup
Create a Google Analytics 4 property
Replace the measurement ID in index.html with your own ID
Check real-time reports to confirm page views and newsletter events

Customization
Update text content in the HTML files to match your brand voice
Adjust colors and typography in styles.css through CSS variables
Swap images and videos in the images folder
Modify animations and thresholds in script.js if needed

Notes
This site uses custom validation for the newsletter form and disables browser-native validation popups. Errors show inline and clear automatically when corrected. Subscriptions are stored locally to avoid repeat signups.

License
See the LICENSE file in this repository for details.
