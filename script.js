function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

/* Scroll animation */
const faders = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
    faders.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});
