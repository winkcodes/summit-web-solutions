// Homepage interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in-on-scroll class
  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Interactive process timeline
  const timelineSteps = document.querySelectorAll('.timeline-step');
  timelineSteps.forEach((step) => {
    step.addEventListener('mouseenter', () => {
      step.style.transform = 'scale(1.02)';
      step.style.zIndex = '10';
    });

    step.addEventListener('mouseleave', () => {
      step.style.transform = 'scale(1)';
      step.style.zIndex = '1';
    });
  });

  // Enhanced service card interactions
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add glow effect
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
      // Remove glow effect
      card.style.boxShadow = '';
    });
  });

  // Form validation and enhancement
  const form = document.querySelector('#contact-form');
  if (form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add focus/blur animations
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });

      // Real-time validation
      input.addEventListener('input', () => {
        validateField(input);
      });
    });

    form.addEventListener('submit', handleFormSubmit);
  }

  // CTA button enhancements
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
      `;
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Parallax effect for hero background elements
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach((element, index) => {
      const rate = scrolled * -0.5 * (index + 1);
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });

  // Loading performance optimization
  const preloadImages = [
    // Add any critical images here
  ];

  preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Analytics tracking for interactions
  function trackInteraction(action, element) {
    // Add your analytics tracking here
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: 'engagement',
        event_label: element
      });
    }
  }

  // Track CTA clicks
  document.querySelectorAll('[data-track]').forEach(element => {
    element.addEventListener('click', () => {
      trackInteraction('click', element.dataset.track);
    });
  });
});

// Utility functions
function validateField(field) {
  const value = field.value.trim();
  const fieldContainer = field.parentElement;
  const errorElement = fieldContainer.querySelector('.field-error');

  // Remove existing error
  if (errorElement) {
    errorElement.remove();
  }
  fieldContainer.classList.remove('field-invalid');

  let isValid = true;
  let errorMessage = '';

  // Validate based on field type
  switch (field.type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      break;
    
    case 'tel':
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (value && !phoneRegex.test(value.replace(/\D/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
      break;
    
    case 'url':
      try {
        if (value && !new URL(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid URL';
        }
      } catch {
        if (value) {
          isValid = false;
          errorMessage = 'Please enter a valid URL';
        }
      }
      break;
  }

  // Check required fields
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }

  if (!isValid) {
    fieldContainer.classList.add('field-invalid');
    const error = document.createElement('div');
    error.className = 'field-error text-red-500 text-sm mt-1';
    error.textContent = errorMessage;
    fieldContainer.appendChild(error);
  }

  return isValid;
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea, select');
  let isFormValid = true;

  // Validate all fields
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Show success message
      showNotification('Thank you! We\'ll be in touch within 24 hours.', 'success');
      form.reset();
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      // Track conversion
      trackInteraction('form_submit', 'contact_form');
    }, 2000);
  } else {
    showNotification('Please fix the errors above and try again.', 'error');
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(full)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);