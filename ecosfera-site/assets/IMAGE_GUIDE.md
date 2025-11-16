# Image Guidelines for Ecosfera Website

## 📸 Required Images

### Hero & Homepage

1. **hero.jpg** (1920×1080px, <300KB)
   - Beautiful interior shot of the salon
   - Natural lighting preferred
   - Show styling area with elegant furniture
   - Alternative: Stylist at work with client (back view for privacy)

### Service Categories

2. **service-refresh.jpg** (800×600px, <200KB)
   - Close-up of haircut in progress
   - Clean, bright, professional
   - Show scissors, comb, and styled hair

3. **service-color.jpg** (800×600px, <200KB)
   - Color application scene
   - Show bowls, brushes, foil
   - Warm, inviting lighting

4. **service-bridal.jpg** (800×600px, <200KB)
   - Elegant bridal updo or styling
   - Soft, romantic feel
   - Could include accessories (veil, flowers)

### Transformations (Before/After)

5-7. **before-after-1.jpg, before-after-2.jpg, before-after-3.jpg** (800×800px each, <200KB)
   - Side-by-side or split-screen format
   - Same lighting & angle for both shots
   - Clear difference visible
   - Examples:
     - Balayage transformation
     - Color change (dark to light)
     - Haircut (long to short/medium)

### Testimonials / Clients

8-10. **avatar-1.jpg, avatar-2.jpg, avatar-3.jpg** (400×400px, <100KB each)
   - Client headshots (with written permission!)
   - Smiling, friendly faces
   - Natural or salon background
   - Square crop, centered face
   - Alternative: Use placeholder avatars or initials

### Team (Optional, for future)

11-14. **team-member-1.jpg, team-member-2.jpg, etc.** (600×800px, <200KB each)
   - Professional stylist photos
   - Portrait orientation
   - Uniform background or salon setting
   - Consistent lighting across all photos

---

## 🎨 Photo Style Guidelines

### Lighting
- Natural light or warm artificial light
- Avoid harsh shadows
- Soft, diffused lighting preferred

### Colors
- Match website palette (warm beiges, soft pinks)
- Avoid overly saturated or artificial colors
- Consistent color grading across photos

### Composition
- Clean, uncluttered backgrounds
- Follow rule of thirds
- Show faces when appropriate (with consent)
- Focus on hands, tools, hair details

### Privacy & Consent
- ⚠️ **Always get written consent** before using client photos
- Offer incentive (discount) for photo permission
- Alternative: Use stock photos from:
  - [Unsplash](https://unsplash.com/s/photos/hair-salon)
  - [Pexels](https://www.pexels.com/search/hairdresser/)
  - [Pixabay](https://pixabay.com/images/search/beauty-salon/)

---

## 🛠 Image Optimization

### Before Uploading

1. **Resize** to recommended dimensions (use [Squoosh](https://squoosh.app/) or Photoshop)
2. **Compress** at [TinyPNG](https://tinypng.com) or [ImageOptim](https://imageoptim.com)
3. **Format**: 
   - Use **JPG** for photos (smaller file size)
   - Use **WebP** if browser support is OK (modern browsers only)
   - Use **PNG** only for logos/graphics with transparency

### Target File Sizes

| Image Type | Max Size | Ideal Size |
|------------|----------|------------|
| Hero | 300KB | 150-200KB |
| Services | 200KB | 100-150KB |
| Before/After | 200KB | 100-150KB |
| Avatars | 100KB | 50-80KB |
| Team | 200KB | 100-150KB |

### Quick Compress Commands

If you have ImageMagick installed:

```bash
# Resize hero image
convert hero-original.jpg -resize 1920x1080 -quality 85 hero.jpg

# Resize service images
convert service-original.jpg -resize 800x600 -quality 85 service-refresh.jpg

# Resize avatars
convert avatar-original.jpg -resize 400x400 -quality 85 avatar-1.jpg
```

---

## 📝 Naming Convention

Use clear, descriptive names:

✅ **Good**:
- `hero-salon-interior.jpg`
- `service-balayage-process.jpg`
- `before-after-blonde-transformation.jpg`
- `team-anna-kowalska.jpg`

❌ **Bad**:
- `IMG_1234.jpg`
- `photo.jpg`
- `untitled.jpg`

---

## 🚀 Where to Place Images

All images go in: `/ecosfera-site/images/`

```
ecosfera-site/
  images/
    hero.jpg
    service-refresh.jpg
    service-color.jpg
    service-bridal.jpg
    before-after-1.jpg
    before-after-2.jpg
    before-after-3.jpg
    avatar-1.jpg
    avatar-2.jpg
    avatar-3.jpg
```

---

## 🎁 Bonus: Free Stock Photos

Until you have your own photos, use these free stock images:

### Salon Interior
- [Unsplash Salon Search](https://unsplash.com/s/photos/hair-salon-interior)
- [Pexels Beauty Salon](https://www.pexels.com/search/beauty%20salon/)

### Hair Styling
- [Unsplash Hairstylist](https://unsplash.com/s/photos/hairstylist)
- [Pexels Hair Color](https://www.pexels.com/search/hair%20color/)

### Transformations
- [Unsplash Hair Transformation](https://unsplash.com/s/photos/hair-before-after)
- Instagram: Ask permission to use client posts (with credit)

---

## ✅ Image Checklist

Before launch, ensure:

- [ ] All images compressed (<200KB each)
- [ ] All images resized to recommended dimensions
- [ ] All client photos have written consent
- [ ] All images have descriptive filenames
- [ ] All images placed in `/images/` folder
- [ ] Test website loading speed (<3 seconds)
- [ ] Images look good on mobile devices
- [ ] No pixelation or blur on high-res displays

---

**Need help with photos?**
Consider hiring a professional photographer for a 2-hour salon shoot (approx. 800-1500 PLN). It's a one-time investment that will significantly improve your website's appeal and conversion rate.

**Alternative**: Use a good smartphone camera (iPhone 12+ or recent Android flagship) with natural window light. Take 50+ photos and select the best 12-15.
