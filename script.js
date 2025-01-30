// Add this device detection function at the top of your script.js
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || 
         (navigator.userAgent.indexOf('IEMobile') !== -1) ||
         (window.matchMedia('(max-width: 768px) and (hover: none)').matches);
}

// Modified dot animation code
function initDots() {
  dots = [];
  const dotCount = isMobileDevice() ? 10 : 100; // Reduce dots for mobile
  const speedMultiplier = isMobileDevice() ? 0.3 : 1; // Slow down for mobile
  
  for (let i = 0; i < dotCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dot = new Dot(x, y);
    
    // Reduce speed for mobile
    if(isMobileDevice()) {
      dot.vx *= speedMultiplier;
      dot.vy *= speedMultiplier;
    }
    
    dots.push(dot);
  }
}

// Modified drawLines function
function drawLines() {
  const lineDistance = isMobileDevice() ? 50 : 100; // Increase distance for fewer lines
  
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < lineDistance) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = body.classList.contains('light-mode') ? '#000' : '#fff';
        ctx.lineWidth = isMobileDevice() ? 0.3 : 0.5; // Thinner lines for mobile
        ctx.stroke();
      }
    }
  }
}

// Modified animate function with frame skipping
let frameCount = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Skip every other frame on mobile
  if(!isMobileDevice() || frameCount % 2 === 0) {
    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });
    drawLines();
  }
  
  frameCount++;
  requestAnimationFrame(animate);
}
document.addEventListener('DOMContentLoaded', () => {
  // ========== THEME DETECTION & TOGGLE ========== //
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Detect system theme
  function detectSystemTheme() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
      } else {
        body.classList.remove('light-mode');
        themeIcon.textContent = '☀️';
      }
    } catch (e) {
      // Fallback to dark mode if detection fails
      body.classList.remove('light-mode');
      themeIcon.textContent = '☀️';
    }
  }

  // Check localStorage for user preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
  } else if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    themeIcon.textContent = '☀️';
  } else {
    // No saved preference - use system theme
    detectSystemTheme();
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeIcon.textContent = isLightMode ? '🌙' : '☀️';
  });

  // ========== DOT BACKGROUND ANIMATION ========== //
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.radius = Math.random() * 2 + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = body.classList.contains('light-mode') ? '#000' : '#fff';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
  }

  let dots = [];
  function initDots() {
    dots = [];
    for (let i = 0; i < 100; i++) {
      dots.push(new Dot(Math.random() * canvas.width, Math.random() * canvas.height));
    }
  }

  function drawLines() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = body.classList.contains('light-mode') ? '#000' : '#fff';
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });
    drawLines();
    requestAnimationFrame(animate);
  }

  initDots();
  animate();

  // ========== TYPEWRITER EFFECT ========== //
  const typewriterText = "Elevating Creativity Through Art";
  const typewriterElement = document.querySelector('.typewriter');
  let i = 0;

  function typeWriter() {
    if (i < typewriterText.length) {
      typewriterElement.innerHTML += typewriterText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();

  // ========== SCROLL BLUR EFFECT ========== //
  const heroCanvas = document.getElementById('hero-canvas');
  window.addEventListener('scroll', () => {
    const blurAmount = Math.min(window.scrollY / 100, 10);
    heroCanvas.style.filter = `blur(${blurAmount}px)`;
  });

  // ========== GSAP ANIMATIONS ========== //
  gsap.registerPlugin(ScrollTrigger);

  // Fix for disappearing CTA button
  gsap.from('.cta-btn', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 1.5,
    onComplete: () => {
      document.querySelector('.cta-btn').style.visibility = 'visible';
    }
  });

  // Section animations
  gsap.from('.portfolio-section', {
    scrollTrigger: {
      trigger: '.portfolio-section',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});
