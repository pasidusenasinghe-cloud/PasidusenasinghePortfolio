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

// ==========================================================================
// 5. THEME (light / dark) SWITCH  — remembers choice
// ==========================================================================
(function () {
  const saved = (function(){ try { return localStorage.getItem('theme'); } catch(e){ return null; } })();
  const startDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', startDark ? 'dark' : 'light');
})();

function buildThemeToggle() {
  const container = document.querySelector('.nav-container');
  if (!container || document.getElementById('themeToggle')) return;
  const btn = document.createElement('button');
  btn.id = 'themeToggle';
  btn.className = 'theme-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Switch dark / light mode');
  btn.innerHTML =
    '<svg class="ico-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
    '<svg class="ico-moon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
  // wrap toggle + hamburger so they sit together
  const menu = document.getElementById('menuToggle');
  const wrap = document.createElement('div');
  wrap.className = 'nav-actions';
  wrap.appendChild(btn);
  if (menu) wrap.appendChild(menu);
  container.appendChild(wrap);
}

// ==========================================================================
// 6. SKILLS WORK DROPDOWN
// ==========================================================================
function buildDropdown() {
  const link = document.querySelector('.nav-links a[href="skills-work.html"]');
  if (!link || link.parentElement.classList.contains('nav-dropdown')) return;
  const wrap = document.createElement('div');
  wrap.className = 'nav-dropdown';
  link.parentNode.insertBefore(wrap, link);
  wrap.appendChild(link);
  link.insertAdjacentHTML('beforeend', '<span class="caret">&#9660;</span>');
  if (/self-reflection|study-schedule|academic-summary/.test(location.pathname)) link.classList.add('active');
  const menu = document.createElement('div');
  menu.className = 'dropdown-menu';
  menu.innerHTML =
    '<a href="self-reflection.html">Self Reflection Essay</a>' +
    '<a href="study-schedule.html">Study Schedule</a>' +
    '<a href="academic-summary.html">Academic Article Summary</a>';
  wrap.appendChild(menu);
  // mobile: tap caret to open
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !wrap.classList.contains('open')) { e.preventDefault(); wrap.classList.add('open'); }
  });
}

// ==========================================================================
// 7. NEXT / PREVIOUS PAGE BUTTONS  (edit PAGE_ORDER to reorder)
// ==========================================================================
const PAGE_ORDER = [
  ['index.html', 'Home'],
  ['skills-work.html', 'Skills Work'],
  ['research-project.html', 'Research Project'],
  ['oral-presentation.html', 'Oral Presentation'],
  ['peer-reviews.html', 'Peer Reviews'],
  ['contact.html', 'Contact']
];
function buildPageNav() {
  const main = document.querySelector('main');
  if (!main || document.querySelector('.page-nav')) return;
  const file = location.pathname.split('/').pop() || 'index.html';
  // sub pages of Skills Work belong to the Skills Work position
  const key = /self-reflection|study-schedule|academic-summary/.test(file) ? 'skills-work.html' : file;
  const i = PAGE_ORDER.findIndex(p => p[0] === key);
  if (i < 0) return;
  const prev = PAGE_ORDER[i - 1], next = PAGE_ORDER[i + 1];
  const bar = document.createElement('div');
  bar.className = 'page-nav';
  bar.innerHTML =
    (prev ? `<a class="page-nav-btn" href="${prev[0]}">&larr; ${prev[1]}</a>` : '<span class="page-nav-btn disabled">.</span>') +
    (next ? `<a class="page-nav-btn" href="${next[0]}">${next[1]} &rarr;</a>` : '<span class="page-nav-btn disabled">.</span>');
  main.insertAdjacentElement('afterend', bar);
}

// ==========================================================================
// 8. WHATSAPP FLOATING BUTTON  (number = country code + digits, no + or spaces)
// ==========================================================================
const WHATSAPP_NUMBER = '947590516712';
function buildWhatsApp() {
  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hello Pasidu, I visited your e-portfolio.');
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(a => { a.href = url; });
  if (document.querySelector('.social-dial')) return;
  const svg = (d, s) => `<svg viewBox="0 0 24 24" fill="currentColor" width="${s}" height="${s}"><path d="${d}"/></svg>`;
  const WA = 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z';
  const LI = 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z';
  const GH = 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';
  const EM = 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z';
  const wrap = document.createElement('div');
  wrap.className = 'social-dial';
  wrap.innerHTML =
    `<a class="dial-main" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">${svg(WA, 28)}</a>` +
    '<div class="dial-items">' +
    `<a class="dial-item li" href="https://www.linkedin.com/in/pasidu-senasinghe-56795a415/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${svg(LI, 20)}</a>` +
    `<a class="dial-item gh" href="https://github.com/pasidusenasinghe-cloud" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${svg(GH, 20)}</a>` +
    `<a class="dial-item em" href="mailto:pasidusenasinghe@gmail.com" aria-label="Email">${svg(EM, 20)}</a>` +
    '</div>';
  document.body.appendChild(wrap);
  // touch screens have no hover: first tap opens the row, second tap opens WhatsApp
  const main = wrap.querySelector('.dial-main');
  main.addEventListener('click', (e) => {
    if (window.matchMedia('(hover: none)').matches && !wrap.classList.contains('open')) { e.preventDefault(); wrap.classList.add('open'); }
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) wrap.classList.remove('open'); });
}

// ==========================================================================
// 9. SCROLL REVEAL ANIMATION
// ==========================================================================
function initReveal() {
  const items = document.querySelectorAll('.about-grid, .project-card-link, .slide-deck-container, .contact-form, .about-footer-actions');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .12 });
  items.forEach((el, n) => { el.classList.add('reveal'); el.style.transitionDelay = (n % 3) * 0.12 + 's'; io.observe(el); });
}

document.addEventListener('DOMContentLoaded', () => {
  buildDropdown();
  buildThemeToggle();
  buildPageNav();
  buildWhatsApp();
  initReveal();
});
