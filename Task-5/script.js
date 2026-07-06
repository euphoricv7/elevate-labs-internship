/* ==========================================================================
   SIMPLE PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            
            // Toggle hamburger icon to cross icon
            const icon = menuBtn.querySelector("i");
            if (navbar.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }

    // Close the mobile menu when clicking on any navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbar.classList.contains("active")) {
                navbar.classList.remove("active");
                menuBtn.querySelector("i").className = "fa-solid fa-bars";
            }
        });
    });

    // 2. Simple Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    if (contactForm && successMessage) {
        contactForm.addEventListener("submit", (e) => {
            // Stop the form from reloading the page
            e.preventDefault();
            
            // Hide the form and show the success message
            contactForm.classList.add("hidden");
            successMessage.classList.remove("hidden");
            
            // Reset form fields
            contactForm.reset();
        });
    }
});
