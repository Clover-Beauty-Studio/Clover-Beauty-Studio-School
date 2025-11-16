/*
   CLOVER BEAUTY STUDIO & SCHOOL - MAIN JAVASCRIPT
   Multi-language website with smooth animations
   Author: Web Developer
   Last Modified: January 2025
*/

(function() {
  'use strict';

  // === Language Support ===
  let currentLang = localStorage.getItem('clover-lang') || 'pl';
  const translationsCache = {};
  const hasLegacyTranslations = typeof window !== 'undefined' && window.translations;

  async function ensureLang(lang) {
    if (translationsCache[lang]) return;
    try {
      const res = await fetch(`js/i18n/${lang}.json`, { cache: 'no-store' });
      if (res.ok) {
        translationsCache[lang] = await res.json();
      }
    } catch (_) {
      // ignore network errors, fallback to legacy
    }
    if (!translationsCache[lang] && hasLegacyTranslations) {
      translationsCache[lang] = window.translations[lang] || {};
    }
  }

  // Translate key with fallbacks
  function t(key) {
    return (
      translationsCache[currentLang]?.[key] ||
      (hasLegacyTranslations ? (window.translations[currentLang]?.[key] || window.translations['pl']?.[key]) : undefined) ||
      translationsCache['pl']?.[key] ||
      key
    );
  }

  // === Auto-contrast for text on colored backgrounds ===
  function srgbToLinear(c) {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  }

  function luminance([r, g, b]) {
    const R = srgbToLinear(r);
    const G = srgbToLinear(g);
    const B = srgbToLinear(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  function parseRgb(str) {
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
    if (!m) return null;
    return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), m[4] !== undefined ? parseFloat(m[4]) : 1];
  }

  function getEffectiveBackground(el) {
    let node = el;
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      const bg = cs.backgroundColor;
      const rgba = parseRgb(bg);
      if (rgba && rgba[3] > 0) return rgba;
      node = node.parentElement;
    }
    return [255, 255, 255, 1];
  }

  function chooseTextColor(bgRgb) {
    const L = luminance(bgRgb);
    const contrastWhite = (1.05) / (L + 0.05);
    const contrastBlack = (L + 0.05) / 0.05;
    return contrastWhite >= contrastBlack ? '#ffffff' : '#000000';
  }

  function applyAutoContrast() {
    const targets = document.querySelectorAll([
      '.btn-primary',
      '.btn-secondary',
      '.btn-team',
      '.service-badge',
      '.service-badge-small',
      '.profile-card-button',
      '[data-auto-contrast]'
    ].join(','));

    targets.forEach((el) => {
      const rgba = getEffectiveBackground(el);
      const color = chooseTextColor(rgba);
      el.style.color = color;
    });
  }

  // Update all translatable elements
  function updateTranslations() {
    // Text content translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = translation;
        }
      } else {
        // Handle blur-text elements specially
        if (el.classList.contains('blur-text')) {
          // Store original text for re-animation
          const originalText = el.textContent;
          if (originalText !== translation) {
            // Re-initialize blur animation with new text
            el.textContent = translation;
            if (window.BlurTextAnimator) {
              new window.BlurTextAnimator(el);
            }
          }
        } else {
          el.textContent = translation;
        }
      }
    });

    // Alt attribute translations
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const translation = t(key);
      el.setAttribute('alt', translation);
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });

    // Update document lang attribute
    document.documentElement.lang = currentLang;
    
    // Update active language in switcher
    updateLanguageSwitcherState();

    // Ensure readable text colors after content updates
    try { applyAutoContrast(); } catch (e) {}
  }

  // Switch language
  async function switchLanguage(lang) {
    await ensureLang(lang);
    currentLang = lang;
    localStorage.setItem('clover-lang', lang);
    updateTranslations();
  }

  // Update language switcher button states
  function updateLanguageSwitcherState() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initialize language switcher
  async function initLanguageSwitcher() {
    const dropdownBtn = document.getElementById('langDropdownBtn');
    const dropdownMenu = document.getElementById('langDropdownMenu');
    const currentFlagEl = document.getElementById('currentFlag');
    const currentLangEl = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!dropdownBtn || !dropdownMenu) return;

    // Language flags and names
    const langData = {
      'pl': { flag: '🇵🇱', name: 'PL' },
      'en': { flag: '🇬🇧', name: 'EN' },
      'ua': { flag: '🇺🇦', name: 'UA' }
    };

    // Load dictionary for current language first
    await ensureLang(currentLang);

    // Set initial language display
    const data = langData[currentLang] || langData['pl'];
    if (currentFlagEl) currentFlagEl.textContent = data.flag;
    if (currentLangEl) currentLangEl.textContent = data.name;

    // Toggle dropdown
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownMenu.classList.toggle('active');
    });

    // Handle language selection
    langOptions.forEach(option => {
      const lang = option.getAttribute('data-lang');
      
      // Mark active language
      if (lang === currentLang) {
        option.classList.add('active');
      }

      option.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Update language
        switchLanguage(lang);
        
        // Update UI
        const data = langData[lang];
        if (currentFlagEl) currentFlagEl.textContent = data.flag;
        if (currentLangEl) currentLangEl.textContent = data.name;
        
        // Update active state
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Close dropdown
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('active');
      }
    });

    // Update initial state
    updateTranslations();
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

  // === Mobile Navigation ===
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navRight = document.querySelector('.nav-right');
  const nav = document.querySelector('.nav');

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });

  if (mobileMenuToggle && navRight) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navRight.classList.toggle('open');
      document.body.style.overflow = navRight.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navRight.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navRight.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navRight.classList.contains('open')) {
        navRight.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // === Scroll Animations ===
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate service cards, transformation cards, and testimonials
  const animatedElements = document.querySelectorAll(
    '.service-card, .transformation-card, .testimonial-card, .service-item'
  );
  
  animatedElements.forEach(el => {
    // Set initial state for elements that don't have animation defined in CSS
    if (!el.style.animation) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 0.9, 0.35, 1), transform 0.6s cubic-bezier(0.22, 0.9, 0.35, 1)';
    }
    animateOnScroll.observe(el);
  });

  // === Cookie Banner ===
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  // Check if user has already made a choice
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('show');
      // Initialize analytics here if needed
      console.log('Cookies accepted');
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  // === Newsletter Form ===
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('input[type="email"]').value;
      const button = newsletterForm.querySelector('button[type="submit"]');
      const originalText = button.textContent;

      // Show loading state
      button.textContent = t('newsletter.sending');
      button.disabled = true;

      // Simulate API call (replace with actual endpoint)
      setTimeout(() => {
        button.textContent = t('newsletter.saved');
        button.style.background = '#4CAF50';
        
        // Show success message
        const successMsg = document.createElement('p');
        successMsg.textContent = t('newsletter.success');
        successMsg.style.color = '#4CAF50';
        successMsg.style.marginTop = '1rem';
        newsletterForm.appendChild(successMsg);
        
        // Reset form
        newsletterForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.style.background = '';
          if (successMsg.parentNode) {
            successMsg.remove();
          }
        }, 3000);
      }, 1500);
    });
  }

  // === Service Category Filter ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCategories = document.querySelectorAll('.service-category');

  if (filterButtons.length > 0 && serviceCategories.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter categories
        serviceCategories.forEach(section => {
          const sectionCategory = section.getAttribute('data-category');
          
          if (category === 'all') {
            section.style.display = 'block';
            // Fade in animation
            section.style.opacity = '0';
            setTimeout(() => {
              section.style.transition = 'opacity 0.3s';
              section.style.opacity = '1';
            }, 10);
          } else if (sectionCategory === category) {
            section.style.display = 'block';
            section.style.opacity = '0';
            setTimeout(() => {
              section.style.transition = 'opacity 0.3s';
              section.style.opacity = '1';
            }, 10);
          } else {
            section.style.display = 'none';
          }
        });
        
        // Smooth scroll to first visible category
        const firstVisible = Array.from(serviceCategories).find(s => s.style.display !== 'none');
        if (firstVisible && category !== 'all') {
          firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === Before/After Slider ===
  const initBeforeAfterSlider = () => {
    const containers = document.querySelectorAll('.before-after-container');
    
    containers.forEach(container => {
      const slider = container.querySelector('.before-after-slider');
      const afterImage = slider.querySelector('.after-image');
      const handle = slider.querySelector('.slider-handle');
      let isDragging = false;
      
      const updateSlider = (x) => {
        const rect = container.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        
        // Clamp between 0 and 100
        position = Math.max(0, Math.min(100, position));
        
        // Update clip-path for after image
        afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        
        // Update handle position
        handle.style.left = `${position}%`;
      };
      
      // Mouse events
      const startDragging = (e) => {
        isDragging = true;
        container.style.cursor = 'ew-resize';
        updateSlider(e.pageX || e.touches[0].pageX);
      };
      
      const stopDragging = () => {
        isDragging = false;
        container.style.cursor = 'ew-resize';
      };
      
      const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || (e.touches && e.touches[0].pageX);
        updateSlider(x);
      };
      
      // Event listeners
      container.addEventListener('mousedown', startDragging);
      container.addEventListener('touchstart', (e) => startDragging(e));
      
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('touchmove', onDrag);
      
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchend', stopDragging);
      
      // Handle click/tap to move slider
      container.addEventListener('click', (e) => {
        if (!isDragging) {
          updateSlider(e.pageX);
        }
      });
      
      // Prevent image dragging
      slider.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
      });
    });
  };

  // === Spotlight Card Mouse Tracking ===
  const initSpotlightCards = () => {
    const spotlightCards = document.querySelectorAll('.spotlight-card, .profile-card, .service-item, .gallery-item, .lanyard-card');
    
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      });
    });
  };

  // === Profile Card 3D Tilt Engine ===
  const initProfileCards = () => {
    // Disabled - using simpler team cards now
    // Check if pc-card-wrapper elements exist
    const profileCardWrappers = document.querySelectorAll('.pc-card-wrapper');
    if (profileCardWrappers.length === 0) {
      return; // Exit if no 3D profile cards found
    }
    
    // Only initialize if old-style profile cards exist
    const ANIMATION_CONFIG = {
      INITIAL_DURATION: 1200,
      INITIAL_X_OFFSET: 70,
      INITIAL_Y_OFFSET: 60,
      ENTER_TRANSITION_MS: 180
    };

    const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
    const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
    const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

    const createTiltEngine = (shellRef, wrapRef) => {
      let rafId = null;
      let running = false;
      let lastTs = 0;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;
      const DEFAULT_TAU = 0.14;
      const INITIAL_TAU = 0.6;
      let initialUntil = 0;

      const setVarsFromXY = (x, y) => {
        if (!shellRef || !wrapRef) return;

        const width = shellRef.clientWidth || 1;
        const height = shellRef.clientHeight || 1;
        const percentX = clamp((100 / width) * x);
        const percentY = clamp((100 / height) * y);
        const centerX = percentX - 50;
        const centerY = percentY - 50;

        wrapRef.style.setProperty('--pointer-x', `${percentX}%`);
        wrapRef.style.setProperty('--pointer-y', `${percentY}%`);
        wrapRef.style.setProperty('--background-x', `${adjust(percentX, 0, 100, 35, 65)}%`);
        wrapRef.style.setProperty('--background-y', `${adjust(percentY, 0, 100, 35, 65)}%`);
        wrapRef.style.setProperty('--pointer-from-center', `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`);
        wrapRef.style.setProperty('--pointer-from-top', `${percentY / 100}`);
        wrapRef.style.setProperty('--pointer-from-left', `${percentX / 100}`);
        wrapRef.style.setProperty('--rotate-x', `${round(-(centerX / 3))}deg`);
        wrapRef.style.setProperty('--rotate-y', `${round(centerY / 2.5)}deg`);
      };

      const step = (ts) => {
        if (!running) return;
        if (lastTs === 0) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;

        const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
        const k = 1 - Math.exp(-dt / tau);

        currentX += (targetX - currentX) * k;
        currentY += (targetY - currentY) * k;

        setVarsFromXY(currentX, currentY);

        const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

        if (stillFar || document.hasFocus()) {
          rafId = requestAnimationFrame(step);
        } else {
          running = false;
          lastTs = 0;
        }
      };

      const start = () => {
        if (running) return;
        running = true;
        lastTs = 0;
        rafId = requestAnimationFrame(step);
      };

      return {
        setImmediate(x, y) {
          currentX = x;
          currentY = y;
          setVarsFromXY(currentX, currentY);
        },
        setTarget(x, y) {
          targetX = x;
          targetY = y;
          start();
        },
        toCenter() {
          if (!shellRef) return;
          this.setTarget(shellRef.clientWidth / 2, shellRef.clientHeight / 2);
        },
        beginInitial(durationMs) {
          initialUntil = performance.now() + durationMs;
          start();
        },
        getCurrent() {
          return { x: currentX, y: currentY, tx: targetX, ty: targetY };
        },
        cancel() {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
          running = false;
          lastTs = 0;
        }
      };
    };

    const getOffsets = (evt, el) => {
      const rect = el.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    document.querySelectorAll('.pc-card-wrapper').forEach(wrapper => {
      const shell = wrapper.querySelector('.pc-card-shell');
      if (!shell) return;

      const tiltEngine = createTiltEngine(shell, wrapper);
      let enterTimer = null;
      let leaveRaf = null;

      const handlePointerMove = (event) => {
        const { x, y } = getOffsets(event, shell);
        tiltEngine.setTarget(x, y);
      };

      const handlePointerEnter = (event) => {
        shell.classList.add('active');
        shell.classList.add('entering');
        wrapper.classList.add('active');
        
        if (enterTimer) clearTimeout(enterTimer);
        enterTimer = setTimeout(() => {
          shell.classList.remove('entering');
        }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

        const { x, y } = getOffsets(event, shell);
        tiltEngine.setTarget(x, y);
      };

      const handlePointerLeave = () => {
        tiltEngine.toCenter();

        const checkSettle = () => {
          const { x, y, tx, ty } = tiltEngine.getCurrent();
          const settled = Math.hypot(tx - x, ty - y) < 0.6;
          if (settled) {
            shell.classList.remove('active');
            wrapper.classList.remove('active');
            leaveRaf = null;
          } else {
            leaveRaf = requestAnimationFrame(checkSettle);
          }
        };
        if (leaveRaf) cancelAnimationFrame(leaveRaf);
        leaveRaf = requestAnimationFrame(checkSettle);
      };

      shell.addEventListener('pointerenter', handlePointerEnter);
      shell.addEventListener('pointermove', handlePointerMove);
      shell.addEventListener('pointerleave', handlePointerLeave);

      // Initial animation
      const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
      const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
      tiltEngine.setImmediate(initialX, initialY);
      tiltEngine.toCenter();
      tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
    });
  };

  initBeforeAfterSlider();
  initSpotlightCards();
  // initProfileCards(); // Disabled for performance - using simpler cards
  

  // === Lazy Loading Images ===
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading natively
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const lazyLoad = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    };
    
    const imageObserver = new IntersectionObserver(lazyLoad, {
      rootMargin: '50px 0px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // === Performance: Reduce animations if user prefers reduced motion ===
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // === Add current year to footer ===
  const currentYearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  currentYearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // === Booksy Widget Integration (if available) ===
  // Uncomment and configure if Booksy provides an embeddable widget
  /*
  const booksyWidgetContainer = document.getElementById('booksy-widget');
  if (booksyWidgetContainer) {
    // Load Booksy widget script
    const script = document.createElement('script');
    script.src = 'https://booksy.com/widget.js'; // Replace with actual Booksy widget URL
    script.async = true;
    document.body.appendChild(script);
  }
  */

  // === Service Price Tooltips ===
  const servicePrices = document.querySelectorAll('.service-price');
  
  servicePrices.forEach(price => {
    price.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'price-tooltip';
      tooltip.textContent = t('price.tooltip.estimate');
      tooltip.style.cssText = `
        position: absolute;
        background: #2B2B2B;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.75rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      
      document.body.appendChild(tooltip);
      
      const rect = price.getBoundingClientRect();
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + window.scrollY + 'px';
      tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
      
      setTimeout(() => { tooltip.style.opacity = '1'; }, 10);
      
      price.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.remove();
          }
        }, 300);
      }, { once: true });
    });
  });

  // === Initialize all features when DOM is ready ===
  console.log('Clover Beauty Studio website initialized ✨');
  
})();


// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const images = document.querySelectorAll('[data-lightbox]');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const closeBtn = document.querySelector('[data-lightbox-close]');
  images.forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb() {
    lightbox.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  closeBtn?.addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLb();
  });
  window.addEventListener('keyup', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
}
