// Initialize the animation
window.onload = initBackgroundAnimation;

// Function to check if the device is a mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to initialize the background animation
function initBackgroundAnimation() {
  // Get the canvas element
  const canvas = document.getElementById('hero-canvas');

  // Check if the device is a mobile device
  if (isMobileDevice()) {
    // Disable the animation for mobile devices
    canvas.style.display = 'none'; // Hide the canvas
    document.body.style.backgroundColor = '#f0f0f0'; // Set a plain background color
    return; // Exit the function
  }

  // Enable the animation for PCs
  resizeCanvas();

  const dots = [];
  const dotCount = 100;

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
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
  }

  for (let i = 0; i < dotCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    dots.push(new Dot(x, y));
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
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
      dots[i].update();
      dots[i].draw();
    }

    drawLines();

    requestAnimationFrame(animate);
  }

  const ctx = canvas.getContext('2d');
  animate();
}

// Function to resize the canvas
function resizeCanvas() {
  const canvas = document.getElementById('hero-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Add event listener to resize the canvas on window resize
window.addEventListener('resize', resizeCanvas);

// Add scroll down blur effect
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const heroSection = document.getElementById('hero-section');
  const heroCanvas = document.getElementById('hero-canvas');

  if (scrollPosition > 0) {
    heroCanvas.style.filter = `blur(${scrollPosition / 10}px)`;
    heroSection.style.filter = `blur(${scrollPosition / 10}px)`;
  } else {
    heroCanvas.style.filter = 'blur(0px)';
    heroSection.style.filter = 'blur(0px)';
  }
});
