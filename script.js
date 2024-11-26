// Navbar Scroll Animation
gsap.from(".navbar", { y: -100, duration: 1, ease: "power3.out" });

// Hero Text Animation
gsap.from(".hero-title", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero-subtitle", { opacity: 0, y: 50, duration: 1, delay: 0.3 });

// Portfolio Section Animation
gsap.from(".section-title", { opacity: 0, y: -20, duration: 1, stagger: 0.2 });

// Photo Tilt Effect
VanillaTilt.init(document.querySelectorAll(".photo-card"), {
  max: 20,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});
// Smooth scrolling
document.querySelectorAll('.navbar a[href^="#"], .cta-btn').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 80; // Fixed navbar height offset
      const elementPosition = targetElement.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  });
});
