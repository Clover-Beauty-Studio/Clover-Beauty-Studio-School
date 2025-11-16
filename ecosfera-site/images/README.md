# Obrazy dla strony Ecosfera Salon Fryzjerski

## Struktura katalogów

Ta strona wymaga następujących obrazów:

### Strona główna (index.html)
- `hero-pattern.svg` - wzór tła dla sekcji hero (opcjonalny)
- `service-refresh.jpg` - zdjęcie dla karty "Szybkie odświeżenie" (np. strzyżenie)
- `service-color.jpg` - zdjęcie dla karty "Koloryzacja i transformacja" (np. balay age)
- `service-bridal.jpg` - zdjęcie dla karty "Ślubne i okolicznościowe" (np. upięcie)
- `before-after-1.jpg` - transformacja balayage
- `before-after-2.jpg` - transformacja kolor
- `before-after-3.jpg` - transformacja strzyżenie
- `avatar-1.jpg` - awatar klientki 1
- `avatar-2.jpg` - awatar klientki 2
- `avatar-3.jpg` - awatar klientki 3

### Galeria (gallery.html)
- `gallery1.jpg` - przykład pracy (np. balayage przed/po)
- `gallery2.jpg` - przykład pracy (np. strzyżenie damskie)
- `gallery3.jpg` - przykład pracy (np. strzyżenie męskie)

### Zespół (team.html)
- `stylist1.jpg` - zdjęcie stylistki Anny
- `stylist2.jpg` - zdjęcie stylistki Marty

## Wytyczne dotyczące obrazów

### Rozmiary rekomendowane:
- **Karty usług** (service-*.jpg): 800x600px, format JPG, jakość 80%
- **Transformacje** (before-after-*.jpg): 1200x800px, format JPG, jakość 85%
- **Galeria** (gallery*.jpg): 1000x1200px (pionowe), format JPG, jakość 80%
- **Zespół** (stylist*.jpg): 800x1000px (pionowe), format JPG, jakość 80%
- **Awatary** (avatar-*.jpg): 200x200px, format JPG, jakość 75%

### Format i optymalizacja:
- Preferowany format: **JPG** dla zdjęć, **SVG** dla ikon
- Kompresja: używaj narzędzi takich jak TinyJPG, ImageOptim
- Responsive: rozważ stworzenie wersji @2x dla ekranów Retina
- Alt text: wszystkie obrazy mają już zdefiniowane opisy alt w HTML

### Źródła obrazów placeholder:
Tymczasowo możesz użyć:
- Unsplash.com - darmowe zdjęcia wysokiej jakości
- Pexels.com - darmowe zdjęcia
- Flaticon.com - ikony SVG

### Nazewnictwo:
- Używaj małych liter
- Używaj myślników zamiast spacji
- Używaj opisowych nazw (np. `balayage-before-after.jpg`)

## Optymalizacja wydajności

1. **Kompresja**: Wszystkie obrazy powinny być skompresowane przed wgraniem
2. **Lazy loading**: Zaimplementowane w HTML (`loading="lazy"`)
3. **WebP**: Rozważ konwersję do WebP dla lepszej kompresji
4. **CDN**: Dla produkcji rozważ użycie CDN do hostowania obrazów

## Narzędzia pomocne:

- **Squoosh** (squoosh.app) - kompresja online
- **TinyPNG** (tinypng.com) - kompresja PNG/JPG
- **SVGOMG** (jakearchibald.github.io/svgomg/) - optymalizacja SVG
- **ImageOptim** (imageoptim.com/mac) - aplikacja na macOS

## Lista TODO:

- [ ] Zamień placeholder images na prawdziwe zdjęcia z salonu
- [ ] Dodaj zdjęcia transformacji przed/po
- [ ] Dodaj profesjonalne zdjęcia zespołu
- [ ] Dodaj logo salonu (opcjonalnie)
- [ ] Stwórz favicon (16x16, 32x32, 192x192px)
- [ ] Optymalizuj wszystkie obrazy przed wdrożeniem

## Uwagi prawne:

- Upewnij się, że masz prawa do wszystkich użytych zdjęć
- Uzyskaj zgodę klientów na publikację zdjęć przed/po
- Dla zdjęć zespołu - upewnij się, że pracownicy wyrazili zgodę
