document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked (especially useful for single-page anchors)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        
        // Update active class immediately on click
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  // 2. Sticky Header and Scroll State
  const header = document.querySelector('.main-header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight correct navigation link based on scroll position
    highlightActiveLink();
  });

  // 3. Highlight active nav link on scroll
  const sections = document.querySelectorAll('section, header');
  
  function highlightActiveLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // If we're at the top, clear or set active to first
    if (window.scrollY < scrollThreshold) {
      currentSectionId = '';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href === '#' && !currentSectionId) {
        link.classList.add('active');
      } else if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  // 4. Contact Form Handler with Micro-interactions
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      // Visual feedback: disable and loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.7';

      // Capture name for personalization
      const nameInput = document.getElementById('name').value;

      // Simulate API request delay
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.opacity = '1';

        // Success state
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `<strong>Arom (Pleasant)!</strong> Thank you, ${nameInput}. Your message has been received. We will contact you shortly to confirm your reservation.`;
        
        // Reset form inputs
        contactForm.reset();

        // Fade out status after 6 seconds
        setTimeout(() => {
          formStatus.style.transition = 'opacity 1s ease';
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.style.opacity = '1';
            formStatus.className = 'form-status';
          }, 1000);
        }, 6000);

      }, 1500);
    });
  }

  // 5. Scroll animation triggers using Intersection Observer
  const animElements = document.querySelectorAll(
    '.welcome-image-wrapper, .dish-card, .contact-form-wrapper, .contact-info-wrapper'
  );

  // Setup styles for animated elements
  animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        // Stop observing once animated in
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animElements.forEach(el => {
    scrollObserver.observe(el);
  });
});
