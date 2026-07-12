# Task 6: Interview Questions Study Guide

This document provides clear, simple answers to the 10 form validation and handling interview questions to help you prepare for your internship project reviews.

---

### 1. How to validate form inputs in JavaScript?
To validate form inputs in JavaScript:
1. **Select the elements**: Use `document.getElementById` or `document.querySelector` to reference the form inputs.
2. **Access input values**: Retrieve the values inside them using the `.value` property, usually stripping empty space with `.trim()`.
3. **Run checks**: Use conditions (`if/else`) to check if fields are empty, have the correct length, or match a specific pattern (like email formats).
4. **Update the UI**: If a check fails, dynamically add css classes (like `.classList.add('error')`) to display warning borders and text messages.

---

### 2. What is `event.preventDefault()`?
`event.preventDefault()` is a standard JavaScript method that prevents the browser's default action for a specific event.
* **For Form Submission**: The browser's default action is to submit the data, reload the page, and clear the inputs.
* **Why we use it**: By calling `event.preventDefault()` inside the form's submit listener, we stop the automatic page reload. This allows our JavaScript script to check the inputs first, display error messages locally, and control when the data is ready to send.

---

### 3. How to check email format with regex?
A **Regular Expression (Regex)** is a sequence of characters that forms a search pattern. In JavaScript, we check formats using the `regex.test()` method.
* **Example Regex for Emails**:
  ```javascript
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(emailInput.value);
  ```
* **How it works:**
  - `^` and `$` assert the start and end of the text.
  - `[^\s@]+` matches one or more characters that are **not** spaces or `@` symbols (the local mailbox name).
  - `@` matches the literal `@` sign.
  - `[^\s@]+` matches the domain name.
  - `\.` matches the literal dot.
  - `[^\s@]+` matches the domain extension (like `com` or `org`).

---

### 4. Difference between client-side and server-side validation?
* **Client-Side Validation (Browser)**:
  - Runs inside the user's browser using HTML5 attributes or JavaScript.
  - **Pros**: Instant feedback for the user (improves User Experience) and reduces traffic to the server.
  - **Cons**: Unsecure. It can be easily bypassed by disabling JavaScript or using browser inspect tools.
* **Server-Side Validation (Server)**:
  - Runs on the backend server after the data is submitted (e.g., in Node.js/Express).
  - **Pros**: Highly secure. It cannot be bypassed by the client. It protects databases from bad or malicious data.
  - **Cons**: Slower feedback because data must travel to the server and back.
* **Best Practice**: Always use **both**. Client-side for a smooth user experience, and server-side for security.

---

### 5. How to show error messages dynamically?
You can show error messages dynamically in two main ways:
1. **Using CSS Classes (Recommended)**: Create `<span class="error-message">` placeholders in your HTML. Hide them by default using `display: none` in CSS. When validation fails in JavaScript, add an `.error` class to the input group. In CSS, define `.error .error-message { display: block; }` to reveal it.
2. **Direct DOM Manipulation**: Modify the element's text content and display styles directly in JavaScript:
   ```javascript
   errorSpan.textContent = "Error message here";
   errorSpan.style.display = "block";
   ```

---

### 6. What is form submission?
**Form submission** is the process where a browser packages the user-entered input data inside a form and transmits it to a server. 
- It uses HTTP methods (usually **POST** for creating/sending data, or **GET** for querying data).
- The destination server URL is defined in the form's `action` attribute.

---

### 7. How to improve form accessibility?
To make forms accessible to users with screen readers or keyboard navigation:
* **Use Semantic Elements**: Always use `<form>`, `<label>`, `<input>`, and `<textarea>`.
* **Explicit Association**: Connect every `<label>` to its `<input>` by matching the label's `for` attribute with the input's `id` attribute. This allows screen readers to read the label when the input is selected.
* **Focus Indicators**: Keep outline focus styles visible so keyboard users can see where they are tabbing.
* **Descriptive Errors**: Use the `aria-describedby` attribute to link inputs to their dynamic error messages.

---

### 8. How to handle form reset?
When resetting a form, you must:
1. **Reset Values**: Call `form.reset()` in JavaScript to restore all input values to their defaults (empty).
2. **Clear UI Highlights**: Manually loop through your inputs and remove any custom validation classes (like `.error` or `.success`) that were added dynamically by your JavaScript.

---

### 9. What are common security issues with forms?
* **Cross-Site Scripting (XSS)**: Attackers submit malicious JavaScript code into input fields (like comments) that runs in other users' browsers.
* **SQL Injection (SQLi)**: Attackers submit database commands inside text inputs to trick the server into running malicious queries.
* **Spam Submissions**: Automated bots filling forms repeatedly.
* **Prevention**: Always sanitize (clean) and validate data on the server side, escape HTML characters, use CSRF protection tokens, and implement Captchas.

---

### 10. How does HTML5 built-in validation differ from JS validation?
* **HTML5 Built-In Validation**:
  - Uses standard attributes inside the HTML tag, such as `required`, `type="email"`, or `pattern="[A-Za-z]+"` (regex).
  - Works instantly without writing any JavaScript code.
  - Browser-specific tooltips are difficult to style consistently across Chrome, Safari, and Firefox.
* **JavaScript Validation**:
  - Requires custom scripts to handle events like `submit` or `input`.
  - Allows you to write complex, custom validation rules (e.g. comparing two password inputs).
  - Offers total control over how and where error messages and styling are displayed.
