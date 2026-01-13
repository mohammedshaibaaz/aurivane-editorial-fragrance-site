// ====================================
// AURIVANE - Main JavaScript
// Mobile menu, animations, and interactions
// ====================================

(function() {
  'use strict';

  // ====================================
  // MOBILE MENU TOGGLE
  // ====================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  const header = document.querySelector('.site-header');

  if (menuToggle && mobileMenu) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      
      // Prevent body scroll when menu is open
      if (isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (body.classList.contains('menu-open') && 
          !mobileMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        body.style.overflow = '';
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }

  // ====================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ====================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#" or empty
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 60;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ====================================
  // INTERSECTION OBSERVER - FADE IN ON SCROLL
  // ====================================
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
  } else {
    // If user prefers reduced motion, show all elements immediately
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('fade-in-visible');
    });
  }

  // ====================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ====================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function() {
      let current = '';
      const scrollPosition = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  // ====================================
  // HEADER SCROLL EFFECT (OPTIONAL)
  // ====================================
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // ====================================
  // CONSOLE WELCOME MESSAGE
  // ====================================
  console.log('%c🌟 Aurivane Parfums', 'font-size: 20px; font-weight: bold; color: #c8a96b;');
  console.log('%cWebsite crafted with attention to detail', 'font-size: 12px; color: #7a6f66;');

  // ====================================
  // NEWSLETTER FORM VALIDATION & HANDLING
  // ====================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterEmailError = document.getElementById('newsletter-email-error');
  const newsletterMessage = document.getElementById('newsletter-message');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email function
  function validateEmail(email) {
    return emailRegex.test(email.trim());
  }

  // Show email error
  function showEmailError(message) {
    if (newsletterEmailError) {
      newsletterEmailError.textContent = message;
      newsletterEmailError.classList.add('show');
    }
    if (newsletterEmail) {
      newsletterEmail.classList.add('error');
    }
  }

  // Clear email error
  function clearEmailError() {
    if (newsletterEmailError) {
      newsletterEmailError.textContent = '';
      newsletterEmailError.classList.remove('show');
    }
    if (newsletterEmail) {
      newsletterEmail.classList.remove('error');
    }
  }

  // Real-time validation on input
  if (newsletterEmail) {
    newsletterEmail.addEventListener('input', function() {
      if (this.value.trim() === '') {
        clearEmailError();
      } else if (validateEmail(this.value)) {
        clearEmailError();
      }
    });

    // Validate on blur
    newsletterEmail.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        // Empty is okay on blur, will validate on submit
        clearEmailError();
      } else if (!validateEmail(this.value)) {
        showEmailError('Please enter a valid email address');
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate email before submission
      const email = newsletterEmail.value.trim();
      if (!email) {
        showEmailError('Email address is required');
        newsletterEmail.focus();
        return;
      }

      if (!validateEmail(email)) {
        showEmailError('Please enter a valid email address');
        newsletterEmail.focus();
        return;
      }

      // Check if user already subscribed
      if (localStorage.getItem('aurivane_subscribed') === 'true') {
        showMessage(newsletterMessage, 'You are already subscribed to our newsletter.', 'info');
        return;
      }

      clearEmailError();
      const formData = new FormData(newsletterForm);
      const submitButton = newsletterForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      try {
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          // Store subscription status and timestamp
          localStorage.setItem('aurivane_subscribed', 'true');
          localStorage.setItem('aurivane_subscribed_date', new Date().toISOString());
          
          showMessage(newsletterMessage, 'Thank you for subscribing to Aurivane\'s scent journey ✨', 'success');
          newsletterForm.reset();
          clearEmailError();

          // Track conversion in GA4
          if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
              'event_category': 'engagement',
              'event_label': 'Newsletter Subscription',
              'value': 1
            });
          }
        } else {
          showMessage(newsletterMessage, 'Something went wrong. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Newsletter submission error:', error);
        showMessage(newsletterMessage, 'Network error. Please check your connection.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });

    // Check subscription status on page load
    if (localStorage.getItem('aurivane_subscribed') === 'true') {
      const subscribeDate = localStorage.getItem('aurivane_subscribed_date');
      const dateStr = subscribeDate ? new Date(subscribeDate).toLocaleDateString() : '';
      showMessage(newsletterMessage, `Already subscribed ${dateStr ? 'on ' + dateStr : ''}`, 'info');
    }
  }

  // ====================================
  // HELPER: SHOW FORM MESSAGES
  // ====================================
  function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = 'form-message form-message--' + type;
    element.style.display = 'block';

    // Auto-hide after 5 seconds for success/error messages
    if (type !== 'info') {
      setTimeout(() => {
        element.style.display = 'none';
      }, 5000);
    }
  }

  // ====================================
  // GA4: TRACK TIME ON PAGE
  // ====================================
  let startTime = Date.now();
  
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
    
    if (typeof gtag !== 'undefined' && timeSpent > 10) {
      gtag('event', 'timing_complete', {
        'name': 'page_engagement',
        'value': timeSpent,
        'event_category': 'engagement'
      });
    }
  });

})();
