# 🚀 Quick Start Guide — Ecosfera Website

> Get your website live in 3 steps!

---

## ⚡ Step 1: Run Locally (2 minutes)

### Using VS Code Live Server (Easiest)

1. **Open the project** in VS Code:
   ```bash
   code .
   ```

2. **Install Live Server extension**:
   - Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Windows)
   - Search for "Live Server" by Ritwick Dey
   - Click "Install"

3. **Run the site**:
   - Open `ecosfera-site/index.html`
   - Right-click anywhere in the file
   - Select "Open with Live Server"
   - Site opens at `http://localhost:5500` 🎉

### Using Python (Alternative)

```bash
cd ecosfera-site
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

---

## 📝 Step 2: Customize Content (15 minutes)

### Priority Updates

1. **Phone & Email** (search all files for):
   - `+48 XXX XXX XXX` → Your phone number
   - `kontakt@ecosfera-salon.pl` → Your email

2. **Booksy Links** (replace in all files):
   ```
   Old: https://booksy.com/pl-pl/103331_ecosfera-salon-fryzjerski_fryzjer_3_warszawa#ba_s=seo
   New: YOUR_ACTUAL_BOOKSY_URL
   ```

3. **Opening Hours** (edit in `index.html` JSON-LD):
   ```json
   "opens": "09:00",
   "closes": "20:00"
   ```

4. **Add Photos** to `ecosfera-site/images/`:
   - `hero.jpg` (1920×1080px) — Salon interior
   - `service-refresh.jpg` (800×600px) — Haircut scene
   - `service-color.jpg` (800×600px) — Color application
   - `service-bridal.jpg` (800×600px) — Bridal styling
   - `before-after-1.jpg`, `-2.jpg`, `-3.jpg` (800×800px) — Transformations
   - `avatar-1.jpg`, `-2.jpg`, `-3.jpg` (400×400px) — Client photos

   **Pro tip**: Compress images at [tinypng.com](https://tinypng.com) first!

---

## 🌐 Step 3: Deploy (10 minutes)

### Option A: Netlify (Recommended — Free)

1. **Create a GitHub account** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Push your code to GitHub**:
   ```bash
   cd /path/to/Ecosfera-Salon-Fryzjerski
   git init
   git add .
   git commit -m "Initial commit - Ecosfera website"
   git branch -M main
   ```
   
   Create a new repository on GitHub, then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Ecosfera-Salon-Fryzjerski.git
   git push -u origin main
   ```

3. **Deploy with Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Select your `Ecosfera-Salon-Fryzjerski` repository
   - Settings:
     - **Base directory**: `ecosfera-site`
     - **Publish directory**: `ecosfera-site`
   - Click "Deploy site"
   
   ✅ **Done!** Your site is live at `https://random-name-12345.netlify.app`
   
   You can customize the domain to `ecosfera-salon.netlify.app` in Site Settings → Domain Management.

### Option B: Vercel (Alternative — Also Free)

1. Push code to GitHub (same as above)
2. Go to [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "Import Project" → Select repository
5. Vercel auto-detects settings → Click "Deploy"
6. ✅ Live at `https://ecosfera-salon-fryzjerski.vercel.app`

---

## 🔥 Optional Enhancements

### Add Google Analytics (5 minutes)

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new GA4 property
3. Copy your Measurement ID (e.g., `G-ABC123XYZ`)
4. Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ');
</script>
```

### Connect Google Search Console (5 minutes)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your website URL
3. Verify ownership:
   - Choose "HTML tag" method
   - Copy the meta tag
   - Add to `<head>` in `index.html`
4. Re-deploy
5. Submit your homepage URL for indexing

### Add Custom Domain (10 minutes + $10-15/year)

1. Buy a domain at [namecheap.com](https://namecheap.com) or [godaddy.com](https://godaddy.com):
   - Suggested: `ecosfera-salon.pl` or `ecosfera-wilanow.pl`
2. In Netlify/Vercel dashboard:
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter your domain name
3. Update DNS records at your domain registrar:
   - Copy the DNS records from Netlify/Vercel
   - Paste them in your domain's DNS settings
4. Wait 24-48 hours for DNS propagation
5. ✅ Your site is now at `https://ecosfera-salon.pl`

---

## ✅ Pre-Launch Checklist

Before sharing your website publicly:

- [ ] All phone numbers & emails updated
- [ ] All Booksy links updated
- [ ] Real photos added (at least 12 images)
- [ ] Opening hours confirmed
- [ ] Tested on mobile phone (iPhone & Android)
- [ ] Tested on tablet
- [ ] All forms work (newsletter, contact)
- [ ] Google Analytics installed
- [ ] Google Search Console verified
- [ ] Privacy policy reviewed
- [ ] Cookie banner works
- [ ] Page speed > 85 (test at [pagespeed.web.dev](https://pagespeed.web.dev))
- [ ] Shared with team for feedback
- [ ] WhatsApp number in floating button updated

---

## 🆘 Troubleshooting

### Site not loading locally?

- Make sure Live Server extension is installed
- Try closing and reopening VS Code
- Check port 5500 isn't blocked by another app

### Changes not showing after deploy?

- Clear browser cache (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows)
- Wait 1-2 minutes for Netlify/Vercel to build
- Check deployment logs in Netlify/Vercel dashboard

### Images not loading?

- Make sure images are in `ecosfera-site/images/` folder
- Check filename matches exactly (case-sensitive)
- Verify image format is JPG or PNG
- Compress large images (>500KB) at [tinypng.com](https://tinypng.com)

### Mobile menu not working?

- Make sure `js/main.js` is loading (check browser console)
- Clear browser cache
- Test in incognito/private browsing mode

---

## 📞 Need Help?

- **Email**: kontakt@ecosfera-salon.pl
- **Documentation**: See `README.md` for full details
- **Issues**: Check browser console (F12) for errors

---

## 🎉 You're All Set!

Your beautiful new website is now live and ready to bring in new clients!

**Next steps**:
- Share the URL on social media (Instagram, Facebook)
- Add the link to your Google My Business listing
- Print QR code cards to display in the salon
- Update your Booksy profile with the website link

---

**Good luck! 💖✨**
