// Vanilla JS GooeyNav – adapted from ReactBits GooeyNav
(function () {
  function noise(n) { return n / 2 - Math.random() * n; }

  function getXY(distance, pointIndex, totalPoints) {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  }

  function createParticle(i, t, d, r, particleCount, colors) {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  }

  function GooeyNav(ulEl, opts) {
    if (!ulEl) return;
    const options = Object.assign({
      animationTime: 600,
      particleCount: 15,
      particleDistances: [90, 10],
      particleR: 100,
      timeVariance: 300,
      colors: [1, 2, 3, 1, 2, 3, 1, 4],
      initialActiveIndex: 0
    }, opts || {});

    // Build structure: wrap UL into .gooey-nav-container > nav > ul
    const container = document.createElement('div');
    container.className = 'gooey-nav-container';
    const nav = document.createElement('nav');
    const parent = ulEl.parentElement;
    parent.insertBefore(container, ulEl);
    container.appendChild(nav);
    nav.appendChild(ulEl);

    // Effects
    const filterEl = document.createElement('span');
    filterEl.className = 'effect filter';
    const textEl = document.createElement('span');
    textEl.className = 'effect text';
    container.appendChild(filterEl);
    container.appendChild(textEl);

    const lis = Array.from(ulEl.querySelectorAll('li'));
    let activeIndex = options.initialActiveIndex;
    const currentActive = ulEl.querySelector('a.active');
    if (currentActive) {
      const li = currentActive.closest('li');
      const idx = lis.indexOf(li);
      if (idx >= 0) activeIndex = idx;
      lis.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    } else if (lis.length) {
      lis.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    }

    function updateEffectPosition(el) {
      if (!container || !filterEl || !textEl || !el) return;
      const containerRect = container.getBoundingClientRect();
      const pos = el.getBoundingClientRect();
      const styles = {
        left: (pos.x - containerRect.x) + 'px',
        top: (pos.y - containerRect.y) + 'px',
        width: pos.width + 'px',
        height: pos.height + 'px'
      };
      Object.assign(filterEl.style, styles);
      Object.assign(textEl.style, styles);
      const a = el.querySelector('a');
      textEl.innerText = a ? a.innerText : el.innerText || '';
    }

    function makeParticles(element) {
      const d = options.particleDistances;
      const r = options.particleR;
      const bubbleTime = options.animationTime * 2 + options.timeVariance;
      element.style.setProperty('--time', bubbleTime + 'ms');
      for (let i = 0; i < options.particleCount; i++) {
        const t = options.animationTime * 2 + noise(options.timeVariance * 2);
        const p = createParticle(i, t, d, r, options.particleCount, options.colors);
        element.classList.remove('active');
        setTimeout(() => {
          const particle = document.createElement('span');
          const point = document.createElement('span');
          particle.classList.add('particle');
          particle.style.setProperty('--start-x', p.start[0] + 'px');
          particle.style.setProperty('--start-y', p.start[1] + 'px');
          particle.style.setProperty('--end-x', p.end[0] + 'px');
          particle.style.setProperty('--end-y', p.end[1] + 'px');
          particle.style.setProperty('--time', p.time + 'ms');
          particle.style.setProperty('--scale', String(p.scale));
          particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
          particle.style.setProperty('--rotate', p.rotate + 'deg');
          point.classList.add('point');
          particle.appendChild(point);
          element.appendChild(particle);
          requestAnimationFrame(() => {
            element.classList.add('active');
          });
          setTimeout(() => {
            try { element.removeChild(particle); } catch {}
          }, t);
        }, 30);
      }
    }

    function setActive(idx, targetLi) {
      if (idx === activeIndex) return;
      activeIndex = idx;
      lis.forEach((li, i) => li.classList.toggle('active', i === activeIndex));
      updateEffectPosition(targetLi);
      // clear old particles
      filterEl.querySelectorAll('.particle').forEach(p => p.remove());
      textEl.classList.remove('active');
      void textEl.offsetWidth; // reflow
      textEl.classList.add('active');
      if (options.particleCount > 0) {
        makeParticles(filterEl);
      }
    }

    // Bind events
    lis.forEach((li, index) => {
      const a = li.querySelector('a');
      if (!a) return;
      a.addEventListener('click', (e) => {
        // allow navigation but animate immediately
        setActive(index, li);
      });
      a.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive(index, li);
        }
      });
    });

    // Initial position
    const initialLi = lis[activeIndex];
    if (initialLi) {
      updateEffectPosition(initialLi);
      textEl.classList.add('active');
    }

    // Resize observer to reposition
    const resizeObserver = new ResizeObserver(() => {
      const currentLi = lis[activeIndex];
      if (currentLi) updateEffectPosition(currentLi);
    });
    resizeObserver.observe(container);
  }

  function initGooeyNav() {
    // target the existing nav links list
    document.querySelectorAll('.nav .nav-right .nav-links').forEach((ul) => {
      // If already enhanced, skip
      if (ul.closest('.gooey-nav-container')) return;
      // Wrap <li> anchors into required structure and start GooeyNav
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const perfLow = document.documentElement.getAttribute('data-perf') === 'low';
      // Adaptive particle count
      let particleCount = 12;
      if (prefersReduced) particleCount = 0;
      else if (perfLow) particleCount = 5;
      else particleCount = 15;
      GooeyNav(ul, {
        particleCount,
        particleDistances: [90, 10],
        particleR: 100,
        animationTime: 600,
        timeVariance: 300,
        colors: [1, 2, 3, 1, 2, 3, 1, 4],
        initialActiveIndex: Math.max(0, Array.from(ul.querySelectorAll('li')).findIndex(li => li.querySelector('a.active')))
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGooeyNav);
  } else {
    initGooeyNav();
  }
})();
