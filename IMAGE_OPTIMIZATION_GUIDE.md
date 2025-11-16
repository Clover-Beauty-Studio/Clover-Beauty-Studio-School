# Image Optimization & Profile Photo Quality Improvement

## Goals
- Sharper, cleaner stylist profile photos on high-DPI (Retina) displays.
- Faster loading without sacrificing perceived quality.
- Future-proof markup for modern formats (AVIF / WebP) with graceful fallback.

## Current State
Team photos are loaded directly from remote JPEG URLs with unknown intrinsic resolution. They appear soft likely due to one or more factors:
1. Source images are smaller than displayed size (upscaling blur).
2. High-compression JPEG artifacts.
3. Lack of responsive variants for different device pixel ratios.
4. No modern codec alternatives (WebP/AVIF) which could preserve detail at lower file sizes.

## Recommended Workflow
1. Acquire Original Assets
   - Request original uncompressed photos (at least 1600px on the shortest side, sRGB color space, good lighting).
2. Crop & Framing
   - Standardize aspect ratio to 4:5 (portrait) to match existing card layout.
   - Center subject; leave safe space above head; avoid tight cropping.
3. Non-Destructive Adjustments
   - Apply mild exposure correction and white balance.
   - Increase clarity/texture slightly (+5–10) — avoid oversharpening halos.
   - Export a master TIFF/PNG (archival) and working PSD/XCF if needed.
4. Generate Optimized Derivatives (example sizes)
   - 320w (small phones)
   - 480w (phones / narrow tablets)
   - 640w (standard display)
   - 800w (large cards / retina fallback)
   - Optional: 960w (2x for 480 layout if very sharp needed)
5. Encode Formats
   - AVIF (quality target: cq-level ~30–35 or perceptually tuned)
   - WebP (quality 80–85) for broader support.
   - JPEG fallback (quality 82, progressive, optimized).
6. Naming Convention
   - `team-anna-320.avif`, `team-anna-480.webp`, `team-anna-480.jpg`, etc.
   - Keep lowercase, hyphenated names; avoid spaces.
7. Add to Markup (example snippet)
```html
<picture class="team-photo">
  <source
    type="image/avif"
    srcset="images/team-anna-320.avif 320w,
            images/team-anna-480.avif 480w,
            images/team-anna-640.avif 640w,
            images/team-anna-800.avif 800w"
    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 320px">
  <source
    type="image/webp"
    srcset="images/team-anna-320.webp 320w,
            images/team-anna-480.webp 480w,
            images/team-anna-640.webp 640w,
            images/team-anna-800.webp 800w"
    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 320px">
  <img src="images/team-anna-640.jpg" width="320" height="400" alt="Anna – Specjalistka koloryzacji" loading="lazy" decoding="async">
</picture>
```
8. Lighthouse / WebPageTest Validation
   - Check "Properly sized images" and "Serve images in next-gen formats" audits.
   - Ensure no dimension mismatches causing layout shifts (CLS).
9. Optional Enhancements
   - Preload most visible first team photo: `<link rel="preload" as="image" href="images/team-anna-640.webp" type="image/webp" imagesrcset="..." imagesizes="...">` (only if above the fold).
   - Add `fetchpriority="high"` to first image if directly visible on load.
10. Accessibility
   - Use descriptive alt text including role and specialty: `alt="Sylwia – Stylistka strzyżeń i stylizacji okolicznościowych"`.

## Command-Line Example (macOS/Linux)
```bash
# Requires: magick (ImageMagick), cwebp, avifenc (libavif) or ffmpeg
ORIG=anna-original.jpg
magick "$ORIG" -strip -resize 800x -quality 82 team-anna-800.jpg
magick "$ORIG" -strip -resize 640x -quality 82 team-anna-640.jpg
magick "$ORIG" -strip -resize 480x -quality 82 team-anna-480.jpg
magick "$ORIG" -strip -resize 320x -quality 82 team-anna-320.jpg

# WebP
for S in 320 480 640 800; do cwebp -q 82 team-anna-$S.jpg -o team-anna-$S.webp; done

# AVIF (using avifenc)
for S in 320 480 640 800; do avifenc --min 25 --max 35 --speed 6 team-anna-$S.jpg team-anna-$S.avif; done
```

## Deployment Checklist
- [ ] Original high-res images supplied
- [ ] Derivative sizes exported (JPG/WebP/AVIF)
- [ ] `<picture>` markup updated
- [ ] Dimensions (width/height) match aspect ratio to avoid CLS
- [ ] Alt texts reviewed for clarity
- [ ] Performance audit re-run

## Next Steps
Once new assets are ready, remove remote CDN JPEG references in `team.html` and point `<img src>` fallback to local `*-640.jpg`. Commit images under `ecosfera-site/images/`.

---
Need help automating this? Ask and we can add a small Node/CLI script.