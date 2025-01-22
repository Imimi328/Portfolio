// Get the canvas element
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the dot properties
const dots = [];
const numDots = 100;
const dotRadius = 2;
const dotColor = '#ffffff';
const connectionDistance = 100;

// Create the dots
for (let i = 0; i < numDots; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 2 - 1, // Increased speed
    vy: Math.random() * 2 - 1, // Increased speed
  });
}

// Animate the dots
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numDots; i++) {
    const dot = dots[i];
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    dot.x += dot.vx;
    dot.y += dot.vy;
    if (dot.x < 0 || dot.x > canvas.width) {
      dot.vx *= -1;
    }
    if (dot.y < 0 || dot.y > canvas.height) {
      dot.vy *= -1;
    }
  }
  // Connect the dots
  for (let i = 0; i < numDots; i++) {
    for (let j = i + 1; j < numDots; j++) {
      const dot1 = dots[i];
      const dot2 = dots[j];
      const distance = Math.sqrt((dot1.x - dot2.x) ** 2 + (dot1.y - dot2.y) ** 2);
      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(dot1.x, dot1.y);
        ctx.lineTo(dot2.x, dot2.y);
        ctx.strokeStyle = dotColor;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

animate();

// Add event listener for mouse movement
let mouseTimeout;
canvas.addEventListener('mousemove', (e) => {
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    const x = e.clientX;
    const y = e.clientY;
    for (let i = 0; i < numDots; i++) {
      const dot = dots[i];
      const distance = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
      if (distance < 100) {
        dot.vx += (x - dot.x) / 50; // Increased attraction speed
        dot.vy += (y - dot.y) / 50; // Increased attraction speed
      }
    }
  }, 50); // Keep the delay
});

// Add event listener for scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blurAmount = (scrollY / window.innerHeight) * 10;
  canvas.style.filter = `blur(${blurAmount}px)`;
});
