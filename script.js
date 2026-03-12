// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Mobile Hamburger Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
});

// ===========================
// Smooth Scroll for Nav Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }
    });
});

// ===========================
// Animated Counter for Stats
// ===========================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// ===========================
// Intersection Observer for Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Observer for reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal class to sections and cards
document.querySelectorAll('.feature-card, .about-card, .info-card, .section-header, .about-content, .contact-form').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Observer for stats counter animation
let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="40" stroke-dashoffset="10">
                <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/>
            </circle>
        </svg>
        Sending...
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10L9 14L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Message Sent!
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// ===========================
// Parallax Effect for Gradient Orbs
// ===========================
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });
    
    requestAnimationFrame(animateParallax);
}

animateParallax();

// ===========================
// Staggered Feature Card Animation
// ===========================
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===========================
// Typing Effect for Hero Badge
// ===========================
const badge = document.querySelector('.hero-badge');
if (badge) {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        badge.style.transition = 'all 0.6s ease-out';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 300);
}

console.log('🚀 TestTest website loaded successfully!');
