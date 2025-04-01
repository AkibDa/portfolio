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
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(type, newTextDelay + 250);
});

window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
  });
  
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
  
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      initFloatingLabels();
      
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
          return;
        }
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
          const response = await simulateFormSubmission(formData);
          
          showFormFeedback('success', 'Message sent successfully!');
          contactForm.reset();
          resetFloatingLabels();
        } catch (error) {
          showFormFeedback('error', 'Failed to send message. Please try again.');
        } finally {
          setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
          }, 3000);
        }
      });
    }
    
    function initFloatingLabels() {
      const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
      
      formInputs.forEach(input => {
        if (input.value) {
          input.parentElement.classList.add('focused', 'has-value');
        }
        
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          if (!this.value) {
            this.parentElement.classList.remove('focused');
          }
          this.parentElement.classList.toggle('has-value', !!this.value);
        });
        
        input.addEventListener('input', function() {
          validateField(this);
        });
      });
    }
    
    function resetFloatingLabels() {
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused', 'has-value');
      });
    }
    
    function validateField(field) {
      const group = field.parentElement;
      const errorElement = group.querySelector('.error-message') || createErrorElement(group);
      
      group.classList.remove('invalid');
      errorElement.textContent = '';
      
      if (field.required && !field.value.trim()) {
        showFieldError(group, errorElement, 'This field is required');
        return false;
      }
      
      if (field.type === 'email' && !isValidEmail(field.value)) {
        showFieldError(group, errorElement, 'Please enter a valid email');
        return false;
      }
      
      return true;
    }
    
    function validateForm() {
      let isValid = true;
      const requiredFields = document.querySelectorAll('.form-group [required]');
      
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      return isValid;
    }
    
    function createErrorElement(group) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      group.appendChild(errorElement);
      return errorElement;
    }
    
    function showFieldError(group, errorElement, message) {
      group.classList.add('invalid');
      errorElement.textContent = message;
      return false;
    }
    
    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    function showFormFeedback(type, message) {
      const feedbackElement = document.createElement('div');
      feedbackElement.className = `form-feedback ${type}`;
      feedbackElement.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
      `;
      
      const formContainer = document.querySelector('.contact-info-card');
      const existingFeedback = document.querySelector('.form-feedback');
      
      if (existingFeedback) {
        existingFeedback.replaceWith(feedbackElement);
      } else {
        formContainer.prepend(feedbackElement);
      }
      
      setTimeout(() => {
        feedbackElement.classList.add('fade-out');
        setTimeout(() => feedbackElement.remove(), 300);
      }, 5000);
    }
    
    function simulateFormSubmission(formData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.1 ? resolve({
            status: 200,
            message: 'Success'
          }) : reject({
            status: 500,
            message: 'Server error'
          });
        }, 1500);
      });
    }
  });