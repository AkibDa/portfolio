// ==== Typing Animation ====
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["Sk Akib Ahammed", "a Developer", "an AI Engineer", "a Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    setTimeout(type, typingDelay + 1100);
  }
}

// ==== Scroll Events (Debounced) ====
function debounce(func, wait = 20) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercentage + '%';
}

function toggleNavbarScrolled() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// ==== Smooth Anchor Scroll ====
function enableSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ==== Scroll-based Animation ====
function observeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
}

// ==== Project Card Hover Effect ====
function enableCardHover() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
  });
}

// ==== Contact Form Logic ====
function initFloatingLabels() {
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    if (input.value) input.parentElement.classList.add('focused', 'has-value');

    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));

    input.addEventListener('blur', () => {
      input.parentElement.classList.toggle('has-value', !!input.value);
      if (!input.value) input.parentElement.classList.remove('focused');
    });

    input.addEventListener('input', () => validateField(input));
  });
}

function resetFloatingLabels() {
  document.querySelectorAll('.form-group').forEach(group => group.classList.remove('focused', 'has-value'));
}

function validateField(field) {
  const group = field.parentElement;
  const errorElement = group.querySelector('.error-message') || createErrorElement(group);
  group.classList.remove('invalid');
  errorElement.textContent = '';

  if (field.required && !field.value.trim()) {
    return showFieldError(group, errorElement, 'This field is required');
  }

  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    return showFieldError(group, errorElement, 'Please enter a valid email');
  }

  return true;
}

function showFieldError(group, errorElement, message) {
  group.classList.add('invalid');
  errorElement.textContent = message;
  return false;
}

function createErrorElement(group) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  group.appendChild(errorElement);
  return errorElement;
}

function validateForm() {
  let isValid = true;
  document.querySelectorAll('.form-group [required]').forEach(field => {
    if (!validateField(field)) isValid = false;
  });
  return isValid;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('.submit-btn');
  const originalBtnContent = submitBtn.innerHTML;
  const formData = new FormData(form);

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    if (!validateForm()) throw new Error("Validation failed");

    const response = await fetch(form.action || '/your-endpoint', {
      method: form.method || 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
      submitBtn.style.background = '#00b894';
      form.reset();
      resetFloatingLabels();
      showAlert('Message sent successfully!', 'success');
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
    submitBtn.style.background = '#ff7675';
    showAlert('Failed to send message. Please try again.', 'error');
  } finally {
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 5000);
  }
}

function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `form-alert ${type}`;
  alertDiv.textContent = message;
  const form = document.getElementById('contactForm');
  form.prepend(alertDiv);

  setTimeout(() => {
    alertDiv.classList.add('fade-out');
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

// ==== DOM Ready ====
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, newTextDelay + 250);
  enableSmoothScroll();
  observeScrollAnimations();
  enableCardHover();

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    initFloatingLabels();
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

window.addEventListener('scroll', debounce(updateScrollProgress));
window.addEventListener('scroll', debounce(toggleNavbarScrolled));
