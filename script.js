// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? '&#10005;' : '&#9776;';
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
    });
});

// Enhanced Intersection Observer for Scroll Reveals
const revealOptions = { threshold: 0.15 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal, .bento-item, .price-card').forEach(el => {
    el.classList.add('reveal'); // Ensure they have the base class
    revealObserver.observe(el);
});

// Sticky Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(10, 10, 10, 0.95)";
        nav.style.padding = "15px 5%";
    } else {
        nav.style.background = "rgba(10, 10, 10, 0.8)";
        nav.style.padding = "20px 5%";
    }
});
