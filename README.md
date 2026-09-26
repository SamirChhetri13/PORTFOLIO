# Samir Chhetri — Portfolio Website

A clean, modern, static portfolio website for **Samir Chhetri** (Full-Stack MERN Developer). Built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)** with zero build tools, npm packages, or framework dependencies.

## 📁 Directory Structure

```text
Portfolio-Website/
├── assets/
│   ├── Samir_Chhetri_MERN_Resume.pdf  # PDF Resume document
│   └── images/                       # Project screenshots, profile & icon assets
│       ├── favicon.svg
│       ├── hero.png
│       ├── icons.svg
│       ├── profile.jpg
│       ├── react.svg
│       ├── samir.jpg
│       ├── samir_alt.jpg
│       ├── shopsage.png
│       └── vite.svg
├── CNAME                              # GitHub Pages custom domain configuration
├── index.html                         # Main website markup & semantic sections
├── readme.md                          # Project documentation
├── script.js                          # Vanilla JavaScript interactivity & state
├── sitemap.xml                        # SEO sitemap
└── style.css                          # Complete design system, glassmorphism & responsive CSS
```

## ✨ Key Features & Functionality

- **Static & Fast**: Zero build step required. Simply open `index.html` in any browser or serve via static file hosting (GitHub Pages, Vercel, Netlify).
- **Dark / Light Mode**: Integrated persistent theme toggle with smooth transitions and `localStorage` state persistence.
- **Glassmorphism Design**: Aesthetic translucent card panels, subtle border highlights, gradient accents, and dynamic backdrop filters.
- **Interactive Resume Modal**: Fullscreen preview and download modal with PDF viewer (`assets/Samir_Chhetri_MERN_Resume.pdf`).
- **Projects Grid/List View**: Interactive layout switcher for project showcase cards.
- **Responsive Navigation**: Sticky header with scroll detection, active section indicator, and mobile drawer menu.
- **Contact Form & Quick Actions**: Copy email to clipboard, form input validation, and user notification feedback.
- **SEO & Accessibility**: Semantic HTML5 tags, meta keywords, Open Graph structured data, and high-performance assets.

## 🚀 Local Usage

Simply double-click `index.html` to open it in your web browser, or use any local static HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Or using npx serve
npx serve .
```

Then visit `http://localhost:8000` in your browser.

## 🌐 GitHub Pages Deployment

To host this static site on GitHub Pages:
1. Push all contents of this root folder to your repository.
2. Go to **Repository Settings** > **Pages**.
3. Under **Source**, select `main` (or `master`) branch `/ (root)` folder and click **Save**.
4. GitHub Pages will build and publish your portfolio automatically.
