/* ==========================================================================
   TASK 6: CONTACT FORM VALIDATION SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Select Form and Inputs
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Select Input Groups (to apply .error or .success borders)
    const nameGroup = document.getElementById("name-group");
    const emailGroup = document.getElementById("email-group");
    const messageGroup = document.getElementById("message-group");

    // Select Success Message Elements
    const successMessage = document.getElementById("successMessage");
    const resetBtn = document.getElementById("resetFormBtn");

    // ==========================================================================
    // HELPER FUNCTIONS FOR VISUAL STATUSES
    // ==========================================================================
    
    // Shows the error border and error message
    function setError(groupElement) {
        groupElement.classList.add("error");
        groupElement.classList.remove("success");
    }

    // Shows the green success border and hides error messages
    function setSuccess(groupElement) {
        groupElement.classList.add("success");
        groupElement.classList.remove("error");
    }

    // Clears all red/green highlight classes
    function clearStatus(groupElement) {
        groupElement.classList.remove("error");
        groupElement.classList.remove("success");
    }

    // ==========================================================================
    // VALIDATION LOGIC FUNCTIONS
    // ==========================================================================

    // Validates the Name field
    function validateName() {
        const nameValue = nameInput.value.trim();
        
        if (nameValue === "") {
            setError(nameGroup);
            return false;
        } else {
            setSuccess(nameGroup);
            return true;
        }
    }

    // Validates the Email field using a Regular Expression
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        
        // Simple, standard email regex: checks for characters, @, domain, and extension
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === "") {
            setError(emailGroup);
            return false;
        } else if (!emailRegex.test(emailValue)) {
            setError(emailGroup);
            return false;
        } else {
            setSuccess(emailGroup);
            return true;
        }
    }

    // Validates the Message textarea
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        
        if (messageValue === "") {
            setError(messageGroup);
            return false;
        } else {
            setSuccess(messageGroup);
            return true;
        }
    }

    // ==========================================================================
    // EVENT LISTENERS
    // ==========================================================================

    // Real-time validation (clears errors dynamically as the user types)
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);

    // Form Submission Handler
    form.addEventListener("submit", (event) => {
        // Prevent default form submission (stops the page from reloading)
        event.preventDefault();

        // Run validation on all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all fields are valid, show success card and hide the form
        if (isNameValid && isEmailValid && isMessageValid) {
            form.classList.add("hidden");
            successMessage.classList.remove("hidden");
        }
    });

    // Reset Form button handler to send a new message
    resetBtn.addEventListener("click", () => {
        // Clear input values
        form.reset();

        // Clear green/red highlight statuses
        clearStatus(nameGroup);
        clearStatus(emailGroup);
        clearStatus(messageGroup);

        // Toggle visibility
        form.classList.remove("hidden");
        successMessage.classList.add("hidden");
    });
});
