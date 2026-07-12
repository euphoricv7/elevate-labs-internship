# Task 6: Contact Form with JavaScript Input Validation

This folder contains the deliverables for **Task 6** of the Elevate Labs Web Development Internship. It consists of a contact form with complete client-side validation using HTML, CSS, and vanilla JavaScript.

---

## 🔮 Project Overview

A clean, responsive, dark-themed contact form built to capture and validate user inputs before mock submission. It features:
- **Client-Side Validation**: Ensures Name and Message fields are not empty, and the Email input matches a correct email pattern.
- **Real-Time Input Validation**: Listens for the `input` event on fields, so error borders and messages clear dynamically as the user corrects their input.
- **Custom Error Elements**: Uses custom `<span class="error-message">` tags below each input. Disables browser default tooltips using the `novalidate` attribute on the `<form>`.
- **Submission Lock**: Prevents form submission and page reloading using `event.preventDefault()` if validation checks fail.
- **Success Block & Reset**: Hides the form and displays a confirmation success screen on valid submission. Includes a reset button allowing the user to send another message.

---

## 📂 Folder Structure

```text
Task-6/
├── index.html     # HTML5 structure with error containers and novalidate attribute
├── style.css      # Dark theme form elements, borders, icons, and layout rules
├── script.js     # JavaScript validation functions, real-time events, and resets
└── README.md      # Project overview (this file)
```

---

## 🛠️ How to Run Locally
1. Open this directory in your code editor (e.g. VS Code).
2. Right-click `index.html` and select **Open with Live Server** (or double-click the file to open it directly in a web browser).
