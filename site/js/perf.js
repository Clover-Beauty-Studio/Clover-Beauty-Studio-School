(function(){
  try {
    const docEl = document.documentElement;
    const nav = navigator || {};
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

    // Respect existing settings first
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      docEl.setAttribute('data-perf', 'low');
      return;
    }

    // Quick heuristics
    const lowDeviceMemory = (nav.deviceMemory && nav.deviceMemory <= 4);
    const lowCores = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4);
    const saveData = !!(conn && conn.saveData);

    let heuristicLow = saveData || (lowDeviceMemory && lowCores);

    // FPS sampling (~1s)
    let frames = 0;
    let start = performance.now();
    function tick(now){
      frames++;
      if (now - start < 1000) {
        requestAnimationFrame(tick);
      } else {
        const fps = Math.round((frames * 1000) / (now - start));
        const low = heuristicLow || fps < 45; // threshold
        if (low) docEl.setAttribute('data-perf', 'low');
        else docEl.setAttribute('data-perf', 'high');
      }
    }
    requestAnimationFrame(tick);
  } catch(e) {
    // Fail safe: do nothing
  }
})();
