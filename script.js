function addToCart() {
  alert("Product added to cart!");
}// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });
}

// Close menu after click (mobile UX improvement)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
