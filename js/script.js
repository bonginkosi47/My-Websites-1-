/* Azania Izwe Lokudla - Part 3 JavaScript Enhancements */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Form Validation (Enquiry Form & Contact Form)
    const enquiryForm = document.getElementById("enquiryForm");
    const contactForm = document.getElementById("contactForm");

    function validateForm(event) {
        let isValid = true;
        const form = event.target;
        
        // Clear previous error messages
        const existingErrors = form.querySelectorAll(".error-message");
        existingErrors.forEach(err => err.remove());

        // Validate Full Name
        const nameInput = form.querySelector("input[name='fullname']");
        if (nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your full name.");
            isValid = false;
        }

        // Validate Email
        const emailInput = form.querySelector("input[type='email']");
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, "Please enter a valid email address.");
                isValid = false;
            }
        }

        // Validate Phone (10 digits)
        const phoneInput = form.querySelector("input[type='tel']");
        if (phoneInput && phoneInput.value.trim() !== "") {
            const phoneRegex = /^\d{10,}$/;
            const cleanPhone = phoneInput.value.replace(/[-\s()]/g, "");
            if (!phoneRegex.test(cleanPhone)) {
                showError(phoneInput, "Please enter a valid 10-digit phone number.");
                isValid = false;
            }
        }

        // Validate Message / Textarea
        const messageInput = form.querySelector("textarea");
        if (messageInput && messageInput.value.trim().length < 10) {
            showError(messageInput, "Please enter a message (at least 10 characters).");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Stop submission if invalid
        } else {
            alert("Success! Your enquiry has been submitted.");
        }
    }

    function showError(inputElement, message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.color = "#ff4d4d";
        errorDiv.style.fontSize = "0.85rem";
        errorDiv.style.marginTop = "4px";
        errorDiv.innerText = message;
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }

    if (enquiryForm) enquiryForm.addEventListener("submit", validateForm);
    if (contactForm) contactForm.addEventListener("submit", validateForm);

    // 2. Dynamic Content Filtering / Search
    const searchInput = document.getElementById("menuSearch");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const filter = searchInput.value.toLowerCase();
            const items = document.querySelectorAll(".menu-item, .service-card");

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }
});