/**
 * BlurText Animation
 * Vanilla JS implementation of blur-in text animation
 * Adapted from reactbits.dev/default/TextAnimations/BlurText
 */

class BlurTextAnimator {
  constructor(element, options = {}) {
    this.element = element;
    this.text = element.textContent.trim();
    this.delay = options.delay || parseInt(element.dataset.blurDelay) || 150;
    this.animateBy = options.animateBy || 'words';
    this.direction = options.direction || element.dataset.blurDirection || 'top';
    this.threshold = options.threshold || 0.1;
    this.rootMargin = options.rootMargin || '0px';
    this.onComplete = options.onAnimationComplete;
    this.stepDuration = options.stepDuration || 350; // milliseconds
    
    this.init();
  }
  
  init() {
    // Split text into segments
    const segments = this.animateBy === 'words' 
      ? this.text.split(' ') 
      : this.text.split('');
    
    // Clear original content
    this.element.textContent = '';
    this.element.style.display = 'flex';
    this.element.style.flexWrap = 'wrap';
    this.element.style.justifyContent = 'center';
    
    // Create span for each segment
    this.spans = segments.map((segment, index) => {
      const span = document.createElement('span');
      span.className = 'blur-word';
      span.textContent = segment;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, filter, opacity';
      
      // Initial state
      span.style.filter = 'blur(10px)';
      span.style.opacity = '0';
      span.style.transform = this.direction === 'top' ? 'translateY(-50px)' : 'translateY(50px)';
      span.style.transition = `all ${this.stepDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      
      this.element.appendChild(span);
      
      return span;
    });
    
    // Set up intersection observer
    this.setupObserver();
  }
  
  setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate();
            observer.unobserve(this.element);
          }
        });
      },
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin
      }
    );
    
    observer.observe(this.element);
  }
  
  animate() {
    this.spans.forEach((span, index) => {
      const totalDelay = index * this.delay;
      
      setTimeout(() => {
        // First step: partial blur and movement
        setTimeout(() => {
          span.style.filter = 'blur(5px)';
          span.style.opacity = '0.5';
          span.style.transform = this.direction === 'top' ? 'translateY(5px)' : 'translateY(-5px)';
        }, 0);
        
        // Second step: fully clear
        setTimeout(() => {
          span.style.filter = 'blur(0px)';
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
          
          // Call completion callback on last element
          if (index === this.spans.length - 1 && this.onComplete) {
            setTimeout(() => {
              this.onComplete();
            }, this.stepDuration);
          }
        }, this.stepDuration);
      }, totalDelay);
    });
  }
}

// Auto-initialize all elements with .blur-text class
function initBlurText() {
  const elements = document.querySelectorAll('.blur-text');
  elements.forEach(element => {
    new BlurTextAnimator(element);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlurText);
} else {
  initBlurText();
}

// Export for manual initialization if needed
if (typeof window !== 'undefined') {
  window.BlurTextAnimator = BlurTextAnimator;
  window.initBlurText = initBlurText;
}
