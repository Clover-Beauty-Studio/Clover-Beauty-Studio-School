# 🌸 Ecosfera Salon Fryzjerski — Website

> A beautiful, feminine, conversion-focused website for Ecosfera Salon Fryzjerski in Wilanów, Warsaw

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Customization](#customization)
- [SEO & Analytics](#seo--analytics)
- [Browser Support](#browser-support)

---

## 🎯 Overview

This is a complete, production-ready static website for **Ecosfera Salon Fryzjerski**, a premium hair salon located in Wilanów, Warsaw. The design focuses on a warm, feminine aesthetic with soft colors, elegant typography, and smooth animations to create an intimate, boutique feel.

### Business Goals

- **Primary**: Increase bookings via Booksy by 20% in 3 months
- **Secondary**: Build brand trust, showcase services, and grow email list
- **Target Audience**: Women aged 18-55, professionals, families in Wilanów

### Key Differentiators

- Boutique, warm, intimate feel (not corporate)
- Feminine color palette (Blush Pink #F6D7E3, Dusty Rose #C77A8A, Gold #C9A26B)
- Mobile-first responsive design
- Fast loading (<2s on 4G)
- Accessibility (WCAG 2.1 AA compliant)

---

## ✨ Features

### Design & UX

- ✅ Elegant serif headings (Playfair Display) + clean body text (Inter)
- ✅ Smooth animations & micro-interactions
- ✅ Scroll-triggered reveal animations
- ✅ Before/after transformation sliders
- ✅ Sticky navigation with booking CTA
- ✅ WhatsApp floating button for quick contact

### Pages

1. **Home** (`index.html`) — Hero, services, transformations, trust, newsletter
2. **Services** (`services.html`) — Filterable services with pricing, durations & booking links
3. **Team** (`team.html`) — Stylist profiles with specialties
4. **Gallery** (`gallery.html`) — Before/after photos & Instagram feed
5. **Contact** (`contact.html`) — Map, hours, parking, social links
6. **Privacy** (`privacy.html`) — GDPR-compliant policy

### Technical Features

- 📱 Fully responsive (mobile-first)
- ⚡ Fast loading (optimized images, lazy loading)
- ♿ Accessible (keyboard nav, ARIA labels)
- 🍪 Cookie consent (EU/Poland compliant)
- 🔍 SEO optimized (JSON-LD, semantic HTML)
- 📊 Analytics ready (GA4 + Search Console)

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom design system with CSS Variables
- **Vanilla JavaScript** — ES6+, no frameworks
- **Google Fonts** — Playfair Display, Inter
- **SVG Icons** — Inline for performance

---

## 📁 Project Structure

```
ecosfera-site/
├── index.html              # Homepage
├── services.html           # Services & pricing
├── team.html               # Team profiles
├── gallery.html            # Photo gallery
├── contact.html            # Contact & map
├── privacy.html            # Privacy policy
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # Interactive features
├── images/                 # Photos (add your own)
└── assets/
    └── README-assets.txt   # Image guidelines
```

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser
- VS Code (recommended)
- Live Server extension (optional)

### Run Locally

**Option 1: VS Code Live Server**
1. Open `ecosfera-site` folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Site opens at `http://localhost:5500`

**Option 2: Python HTTP Server**
```bash
cd ecosfera-site
python3 -m http.server 8000
# Open http://localhost:8000
```

**Option 3: VS Code Task (Already configured)**
```bash
# In VS Code: Terminal → Run Task → Run Live Server
```

---

## 🌐 Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Select repository
4. Settings:
   - **Base directory**: `ecosfera-site`
   - **Publish directory**: `ecosfera-site`
5. Deploy!

Site will be live at `https://ecosfera-salon.netlify.app` (customizable domain)

### Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → "Import Project"
3. Select repository → Auto-detects settings
4. Deploy!

### GitHub Pages

1. Push to GitHub
2. Repository Settings → Pages
3. Source: `main` branch, `/ecosfera-site` folder
4. Save → Live at `https://USERNAME.github.io/Ecosfera-Salon-Fryzjerski/`

---

## 🎨 Customization

### 1. Update Contact Info

Search and replace in all HTML files:

- `+48 XXX XXX XXX` → Your phone number
- `kontakt@ecosfera-salon.pl` → Your email
- Booksy links → Your actual Booksy URLs

### 2. Add Photos

Replace placeholders in `images/` folder:

| File | Size | Description |
|------|------|-------------|
| `hero.jpg` | 1920×1080px | Salon interior |
| `service-*.jpg` | 800×600px | Services |
| `before-after-*.jpg` | 800×800px | Transformations |
| `avatar-*.jpg` | 400×400px | Testimonials |

**Compress images at [tinypng.com](https://tinypng.com) before uploading**

### 3. Customize Colors

Edit `css/styles.css`:

```css
:root {
  --color-primary: #F6D7E3;     /* Blush Pink */
  --color-secondary: #C77A8A;   /* Dusty Rose */
  --color-accent: #C9A26B;      /* Gold */
}
```

### 4. Add Google Analytics

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Add before `</head>` in all files:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔍 SEO & Analytics

### Pre-Launch Checklist

- [x] Meta titles & descriptions
- [x] JSON-LD structured data
- [x] Alt text on images
- [x] Semantic HTML
- [x] Mobile-friendly
- [ ] Google Search Console setup
- [ ] Google Analytics setup
- [ ] Submit sitemap (optional)

### Target Keywords

- `salon fryzjerski Wilanów`
- `fryzjer Wilanów`
- `koloryzacja Warszawa`
- `balayage Wilanów`

---

## 🌍 Browser Support

- Chrome/Edge (last 2 versions) ✅
- Firefox (last 2 versions) ✅
- Safari (last 2 versions) ✅
- iOS Safari (12+) ✅
- Chrome Mobile (Android 8+) ✅

---

## 📝 To-Do Before Launch

- [ ] Replace phone/email placeholders
- [ ] Add real photos (minimum 12)
- [ ] Update Booksy links
- [ ] Add staff bios
- [ ] Test forms
- [ ] Set up Google Analytics
- [ ] Test on mobile devices
- [ ] Check page speed
- [ ] Spell-check Polish text
- [ ] Legal review privacy policy

---

## 🤝 Contributing

Private project for Ecosfera. Team members:

1. Create branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally
4. Commit & push
5. Open Pull Request

---

## 📞 Support

- **Email**: kontakt@ecosfera-salon.pl
- **Phone**: +48 XXX XXX XXX
- **Location**: Aleja Rzeczypospolitej 18, 02-972 Warszawa

---

**Built with 💖 for Ecosfera Salon Fryzjerski**

*Last updated: November 2025*

## Szybki start (VS Code)
1. Otwórz folder `ecosfera-site` w VS Code.
2. Zainstaluj rozszerzenie „Live Server”.
3. PPM na `index.html` → „Open with Live Server”.
4. Podmień placeholdery: numer telefonu, Booksy, e‑mail, zdjęcia.
5. Dodaj `logo.svg` do `images/`.

## SEO & Dane strukturalne
- JSON‑LD LocalBusiness w `index.html` (zaktualizuj telefon, godziny jeśli inne).
- Unikalny `meta description` w każdej stronie.
- Dodaj alt do wszystkich obrazów (placeholdery już mają).

## Customizacja
- Rozszerz usługi w `services.html` (dodaj nowe `<li>`).
- Dodaj więcej członków zespołu w `team.html` (kopiuj `<article class="team-member">`).
- Zastąp placeholder feed Instagram w `gallery.html` własnym embedem (po uzyskaniu tokenu).

## Cennik PDF
Umieść plik w `assets/cennik.pdf` (np. wygenerowany z edytora tekstu / Canva). Link pobierania już jest w `services.html`.

## Cookie banner
Logika w `js/main.js` zapisuje zgodę w `localStorage`. Dodaj integrację analityki tylko po zgodzie.

## Deploy (Netlify / Vercel)
```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```
Podłącz repo w panelu Netlify/Vercel → automatyczne buildy (brak kompilacji — statyczne pliki).

## Lista kontrolna przed publikacją
- [ ] Numer telefonu i e‑mail uzupełnione.
- [ ] Prawdziwe godziny otwarcia w JSON‑LD i stronach.
- [ ] Zdjęcia zoptymalizowane (kompresja, format WebP optional).
- [ ] Dodany `cennik.pdf`.
- [ ] Test Lighthouse (wydajność / dostępność >90).
- [ ] Włączone Analytics + Search Console (po dodaniu pliku weryfikacyjnego lub meta tagu).
- [ ] Sprawdzony baner cookies / zgoda.

## Rozszerzenia przyszłe
- Blog (dodanie `blog/` + listy artykułów dla SEO lokalnego).
- Wersja React (Vite + Tailwind) jeżeli potrzebne komponenty dynamiczne.
- Import opinii (Booksy / Google) jako slider z automatycznym odświeżaniem.

Potrzebujesz kolejny krok (PDF cennik, blog, React)? Napisz — mogę wygenerować kolejne pliki.
