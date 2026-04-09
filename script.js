// Intersection Observer for Scroll Animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.bento-item').forEach(el => observer.observe(el));

// Sticky Navbar Logic
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    nav.style.padding = window.scrollY > 50 ? "10px 5%" : "20px 5%";
});

// Refined Smooth Scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    const offset = 80; // Navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
        function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, // Adjust for fixed navbar height
            behavior: 'smooth'
        });
    }
}
    });
}
