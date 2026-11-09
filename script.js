/**
 * E-PORTFOLIO MULTI-PAGE & SLIDE CONTROLLER
 * Author: Pasidu Daham Senasighe
 * Major: Business Analytics | RMIT & Swinburne NCHS
 */

// ==========================================================================
// 1. REUSABLE SLIDE-BY-SLIDE VIEWER ENGINE
// ==========================================================================

/**
 * Initializes an interactive slide deck inside a container
 * @param {string} containerId - Element ID of .slide-deck-container
 * @param {Array} slides - Array of { filename, label, altFilename }
 */
function initSlideDeck(containerId, slides) {
  const container = document.getElementById(containerId);
  if (!container || !slides || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // DOM Elements inside the container
  const imgElement = container.querySelector('.slide-real-img');
  const placeholderCard = container.querySelector('.slide-placeholder-card');
  const placeholderTitle = container.querySelector('.placeholder-title');
  const placeholderPath = container.querySelector('.placeholder-path');
  const counterElement = container.querySelector('.deck-counter');
  const prevBtn = container.querySelector('.stage-arrow.left');
  const nextBtn = container.querySelector('.stage-arrow.right');
  const progressFill = container.querySelector('.deck-progress-fill');
  const thumbsContainer = container.querySelector('.deck-thumbs-strip');

  function updateSlide() {
    const current = slides[currentIndex];

    // Update Counter & Progress
    if (counterElement) {
      counterElement.textContent = `${currentIndex + 1} of ${totalSlides}`;
    }
    if (progressFill) {
      const percentage = ((currentIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Try loading actual image with fallback handling
    if (imgElement && placeholderCard) {
      imgElement.style.display = 'block';
      placeholderCard.style.display = 'none';

      imgElement.dataset.attempts = '0';
      imgElement.dataset.primary = current.filename;
      imgElement.dataset.alt = current.altFilename || '';
      imgElement.dataset.label = current.label;

      imgElement.onerror = function () {
        handleSlideImageError(imgElement, placeholderCard, placeholderTitle, placeholderPath);
      };

      // Set source: try images/ folder first
      imgElement.src = `images/${current.filename}`;
      imgElement.alt = current.label;
    }

    // Update Active Thumbnail
    if (thumbsContainer) {
      const thumbBtns = thumbsContainer.querySelectorAll('.deck-thumb-btn');
      thumbBtns.forEach((btn, idx) => {
        if (idx === currentIndex) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  function handleSlideImageError(img, placeholder, titleEl, pathEl) {
    const attempts = parseInt(img.dataset.attempts || '0', 10);
    const primary = img.dataset.primary;
    const alt = img.dataset.alt;

    if (attempts === 0) {
      // Attempt 1: try root directory without "images/" prefix
      img.dataset.attempts = '1';
      img.src = primary;
    } else if (attempts === 1 && alt) {
      // Attempt 2: try alternative filename in images/
      img.dataset.attempts = '2';
      img.src = `images/${alt}`;
    } else if (attempts === 2 && alt) {
      // Attempt 3: try alternative filename in root
      img.dataset.attempts = '3';
      img.src = alt;
    } else {
      // Fallback: Show sleek slide mockup with filename & instructions
      img.onerror = null;
      img.style.display = 'none';
      placeholder.style.display = 'flex';
      if (titleEl) titleEl.textContent = img.dataset.label || 'Slide Preview';
      if (pathEl) pathEl.textContent = `images/${primary}`;
    }
  }

  // Setup Thumbnails
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    slides.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `deck-thumb-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = `${idx + 1}`;
      btn.title = item.label;
      btn.addEventListener('click', () => {
        currentIndex = idx;
        updateSlide();
      });
      thumbsContainer.appendChild(btn);
    });
  }

  // Next / Previous Handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    }
  });

  // Initial render
  updateSlide();
}

// ==========================================================================
// 2. MOBILE NAVIGATION TOGGLE
// ==========================================================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

// ==========================================================================
// 3. FLOATING BACK TO TOP BUTTON
// ==========================================================================
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================================================
// 4. CONTACT FORM SUBMISSION HANDLER
// ==========================================================================
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!name || !email || !message) {
    if (statusDiv) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = 'Please fill in all required fields before submitting.';
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';
  }

  setTimeout(() => {
    if (statusDiv) {
      statusDiv.className = 'form-status success';
      statusDiv.textContent = `Thank you, ${name}! Your message has been sent successfully. Pasidu will get back to you shortly.`;
    }
    const form = document.getElementById('contactForm');
    if (form) form.reset();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit</span>';
    }

    setTimeout(() => {
      if (statusDiv) {
        statusDiv.style.display = 'none';
        statusDiv.className = 'form-status';
      }
    }, 6000);
  }, 750);
}