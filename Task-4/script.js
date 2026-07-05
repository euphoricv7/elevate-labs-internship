// Hamburger toggle — Step 5 of the task guide
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a nav link is tapped
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
