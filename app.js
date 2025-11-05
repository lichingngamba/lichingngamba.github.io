// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
let currentTheme = 'dark'; // Default to dark as per modern SaaS design
if (html.getAttribute('data-color-scheme')) {
  currentTheme = html.getAttribute('data-color-scheme');
} else {
  html.setAttribute('data-color-scheme', currentTheme);
}

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-color-scheme', currentTheme);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth Scroll and Active Link
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// Scroll Event for Nav Background and Active Links
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveLink();
});

// Intersection Observer for Reveal Animations
const revealItems = document.querySelectorAll('.reveal-item');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100); // Stagger animation
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
);

revealItems.forEach(item => {
  revealObserver.observe(item);
});

// Animated Particles in Hero
const particlesContainer = document.getElementById('particles');
const particleCount = 20;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = Math.random() * 4 + 2 + 'px';
  particle.style.height = particle.style.width;
  particle.style.background = `rgba(${currentTheme === 'dark' ? '50, 184, 198' : '33, 128, 141'}, ${Math.random() * 0.5 + 0.2})`;
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
  particle.style.animationDelay = Math.random() * 5 + 's';
  particlesContainer.appendChild(particle);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    50% {
      transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${Math.random() + 0.5});
    }
  }
`;
document.head.appendChild(style);

// // Contact Form Submission
// const contactForm = document.getElementById('contactForm');
// const formMessage = document.getElementById('formMessage');

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // Get form values
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const message = document.getElementById('message').value;

  
//   if (!name || !email || !message) {
//     formMessage.textContent = 'Please fill in all fields.';
//     formMessage.className = 'form-message error';
//     return;
//   }


//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     formMessage.textContent = 'Please enter a valid email address.';
//     formMessage.className = 'form-message error';
//     return;
//   }


//   formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
//   formMessage.className = 'form-message success';

//   // Reset form
//   contactForm.reset();

//   // Hide message after 5 seconds
//   setTimeout(() => {
//     formMessage.style.display = 'none';
//   }, 5000);
// });

// Add smooth scroll behavior for anchor links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  const heroGradient = document.querySelector('.hero-gradient');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
  
  if (heroGradient && scrolled < window.innerHeight) {
    heroGradient.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px) scale(1.1)`;
  }
});

// Initial call to set active link on page load
updateActiveLink();