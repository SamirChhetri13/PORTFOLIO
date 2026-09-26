/**
 * Samir Chhetri — Portfolio Interactivity & Logic (Vanilla JS)
 * Fully Responsive, Accessible, and High-Performance Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Theme Toggle System (Dark / Light Mode) ---
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlEl = document.documentElement;
  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return systemDarkQuery.matches ? 'dark' : 'light';
  }

  function setTheme(theme, isUserAction = true) {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      htmlEl.classList.remove('light');
    } else {
      htmlEl.classList.add('light');
      htmlEl.classList.remove('dark');
    }

    if (isUserAction) {
      localStorage.setItem('theme', theme);
    }
    updateThemeIcons(theme);
  }

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach((btn) => {
      const sunIcon = btn.querySelector('.sun-icon');
      const moonIcon = btn.querySelector('.moon-icon');
      const themeText = btn.querySelector('.theme-text');
      
      if (theme === 'dark') {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
        if (themeText) themeText.textContent = 'Dark';
        btn.setAttribute('aria-label', 'Switch to light theme');
      } else {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
        if (themeText) themeText.textContent = 'Light';
        btn.setAttribute('aria-label', 'Switch to dark theme');
      }
    });
  }

  // Initialize theme on load
  const initialTheme = getInitialTheme();
  setTheme(initialTheme, false);

  // Sync with OS preference changes if no manual override stored
  systemDarkQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // Toggle button click handlers
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlEl.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme, true);
    });
  });

  // --- 2. Scroll Progress Bar ---
  const scrollProgressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    if (!scrollProgressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // --- 3. Header Scrolled State & Active Navigation Highlighting ---
  const headerEl = document.getElementById('header-navbar');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];
  const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'services', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  // Header elevation styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      headerEl?.classList.add('scrolled');
    } else {
      headerEl?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Active section updater
  function setActiveSection(activeId) {
    allNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${activeId}`;

      if (isMatch) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      } else {
        link.setAttribute('aria-current', 'false');
        link.classList.remove('active');
      }
    });
  }

  // IntersectionObserver for active section highlighting
  let activeSectionId = 'home';
  const visibleSections = new Map();

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visibleSections.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    });

    // Determine the section with highest visibility ratio
    let maxRatio = 0;
    let bestSection = activeSectionId;

    visibleSections.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestSection = id;
      }
    });

    // Check if at the absolute bottom of page for contact section
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    if (isAtBottom) {
      bestSection = 'contact';
    }

    if (bestSection && bestSection !== activeSectionId) {
      activeSectionId = bestSection;
      setActiveSection(activeSectionId);
    }
  }, {
    root: null,
    rootMargin: '-20% 0px -50% 0px',
    threshold: [0, 0.2, 0.5, 0.8, 1.0]
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  // Initial active section set
  setActiveSection('home');

  // --- 4. Mobile Navigation Drawer & Accessibility ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navOverlay = document.getElementById('nav-overlay');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  let isMobileMenuOpen = false;

  function openMobileMenu() {
    isMobileMenuOpen = true;
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      navOverlay?.classList.add('active');
      document.body.classList.add('nav-active');
      
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      mobileMenuBtn?.setAttribute('aria-label', 'Close menu');
      
      menuIconOpen?.classList.add('hidden');
      menuIconClose?.classList.remove('hidden');

      // Focus first focusable item in drawer
      const firstFocusable = mobileDrawer.querySelector('a, button');
      firstFocusable?.focus();
    }
  }

  function closeMobileMenu() {
    if (!isMobileMenuOpen) return;
    isMobileMenuOpen = false;
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      navOverlay?.classList.remove('active');
      document.body.classList.remove('nav-active');
      
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      mobileMenuBtn?.setAttribute('aria-label', 'Open menu');
      
      menuIconOpen?.classList.remove('hidden');
      menuIconClose?.classList.add('hidden');

      // Return focus to menu button if focus was inside drawer
      if (mobileDrawer.contains(document.activeElement)) {
        mobileMenuBtn?.focus();
      }
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Keyboard navigation & focus trapping for Mobile Drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    if (isMobileMenuOpen && e.key === 'Tab') {
      const focusableElements = mobileDrawer.querySelectorAll('a[href], button:not([disabled])');
      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

  // --- 5. Smooth Anchor Scrolling & Auto-Close Drawer ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeMobileMenu();

        const offsetTop = targetEl.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Set section active state immediately
        const cleanId = targetId.replace('#', '');
        setActiveSection(cleanId);
      }
    });
  });

  // --- 6. Resume Preview Modal & Focus Trapping ---
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  let lastFocusedElement = null;

  function openModal() {
    if (resumeModal) {
      lastFocusedElement = document.activeElement;
      closeMobileMenu();
      
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Shift focus to close button inside modal
      setTimeout(() => {
        closeResumeBtn?.focus();
      }, 50);
    }
  }

  function closeModal() {
    if (resumeModal && !resumeModal.classList.contains('hidden')) {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = '';
      
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }
  }

  openResumeBtns.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Keyboard events for Modal (Escape & Tab focus trap)
  document.addEventListener('keydown', (e) => {
    if (!resumeModal || resumeModal.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = resumeModal.querySelectorAll('a[href], button:not([disabled]), object');
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

  // --- 7. Projects Grid / List View Switcher ---
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');
  const projectsContainer = document.getElementById('projects-container');
  const projectCards = document.querySelectorAll('.project-card');

  if (viewGridBtn && viewListBtn && projectsContainer) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      viewGridBtn.classList.remove('text-slate-600', 'dark:text-slate-400');
      viewListBtn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      viewListBtn.classList.add('text-slate-600', 'dark:text-slate-400');

      projectsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-8';
      projectCards.forEach((card) => {
        card.classList.remove('lg:flex-row');
        const imgBox = card.querySelector('.project-img-container');
        if (imgBox) {
          imgBox.className = 'project-img-container relative overflow-hidden bg-slate-100 dark:bg-slate-950 h-56 sm:h-64';
        }
      });
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      viewListBtn.classList.remove('text-slate-600', 'dark:text-slate-400');
      viewGridBtn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      viewGridBtn.classList.add('text-slate-600', 'dark:text-slate-400');

      projectsContainer.className = 'space-y-6';
      projectCards.forEach((card) => {
        card.classList.add('lg:flex-row');
        const imgBox = card.querySelector('.project-img-container');
        if (imgBox) {
          imgBox.className = 'project-img-container relative overflow-hidden bg-slate-100 dark:bg-slate-950 lg:w-2/5 min-h-[220px]';
        }
      });
    });
  }

  // --- 8. Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');
  const copyEmailIcon = document.getElementById('copy-email-icon');
  const copiedIcon = document.getElementById('copied-icon');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'samirchhetri075@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyEmailText) copyEmailText.textContent = 'Copied!';
        if (copyEmailText) copyEmailText.classList.add('text-emerald-600', 'dark:text-emerald-400');
        if (copyEmailIcon) copyEmailIcon.classList.add('hidden');
        if (copiedIcon) copiedIcon.classList.remove('hidden');

        setTimeout(() => {
          if (copyEmailText) copyEmailText.textContent = 'Copy';
          if (copyEmailText) copyEmailText.classList.remove('text-emerald-600', 'dark:text-emerald-400');
          if (copyEmailIcon) copyEmailIcon.classList.remove('hidden');
          if (copiedIcon) copiedIcon.classList.add('hidden');
        }, 2500);
      }).catch(() => {
        if (copyEmailText) copyEmailText.textContent = 'Failed';
      });
    });
  }

  // --- 9. Contact Form Submission Handling ---
  const contactForm = document.getElementById('contact-form');
  const formStatusSuccess = document.getElementById('form-status-success');
  const formStatusError = document.getElementById('form-status-error');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending message...</span>';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>contact.send()</span> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
        }

        if (formStatusSuccess) formStatusSuccess.classList.remove('hidden');
        if (formStatusError) formStatusError.classList.add('hidden');
        contactForm.reset();

        setTimeout(() => {
          if (formStatusSuccess) formStatusSuccess.classList.add('hidden');
        }, 5000);
      }, 700);
    });
  }

  // --- 10. Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 11. Directional Scroll Reveal Observer (data-reveal) ---
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => revealObserver.observe(el));
});
