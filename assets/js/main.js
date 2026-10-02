/**
 * Abeer Wael — Personal Portfolio
 * Interactive Architecture & Experience Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initBackgroundCanvas();
  initNavigation();
  initProjectModals();
  initCertificateLightbox();
  initCVModal();
  initContactForm();
  initClipboardActions();
});

/* --------------------------------------------------------------------------
   1. Preloader Screen
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.remove('modal-open');
    }, 550);
  });

  // Fallback in case window load event already fired
  setTimeout(() => {
    if (!preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
    }
  }, 1800);
}

/* --------------------------------------------------------------------------
   2. Custom Cursor (Desktop Only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // Touch screen check
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(renderRing);
    }
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  }

  // Hover effect over interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .cert-card, .course-chip, .skill-pill, .platform-badge, .clickable');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    });
  });

  // Tactile click response
  window.addEventListener('mousedown', () => {
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.8)`;
  });
  window.addEventListener('mouseup', () => {
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(1)`;
  });

  // Window exit / enter
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* --------------------------------------------------------------------------
   3. Ambient Particle / Geometric Canvas
   -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 55);

  let mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.size = Math.random() * 1.5 + 1;
      this.alpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting faint lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const lineAlpha = (1 - dist / 130) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. Sticky Navigation, Scrollspy & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  // Scroll Progress & Nav Background Blur
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (scrollTop > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scrollspy section detection
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
      document.body.classList.toggle('modal-open', isActive);
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close when clicking mobile links
    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.classList.remove('modal-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Interactive Project Modals & Category Filtering
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
  'escape-room': {
    title: 'Escape Room Game (AI Project – Python)',
    subtitle: 'Team Project • Faculty of Computer & Information Science',
    category: 'AI & Algorithms',
    tags: ['Python', 'Breadth-First Search (BFS)', 'OOP', 'AI Problem Solving', 'Tkinter GUI'],
    image: 'assets/images/escape_room_main.png',
    gallery: [
      { src: 'assets/images/escape_room_main.png', label: 'Main Overview' },
      { src: 'assets/images/escape_room/escape_room_menu.png', label: 'Menu & Modes' },
      { src: 'assets/images/escape_room/escape_room_level1.png', label: 'Level 1: 5×5 Grid' },
      { src: 'assets/images/escape_room/escape_room_puzzle.png', label: 'Math Riddle' },
      { src: 'assets/images/escape_room/escape_room_level2.png', label: 'Level 2: 6×7 Grid' }
    ],
    overview: 'An interactive escape room simulation built in Python with a graphical user interface, featuring an intelligent AI agent designed to navigate intricate maze environments and locate the mathematically optimal escape route using the Breadth-First Search (BFS) algorithm.',
    problem: 'Creating an automated pathfinding agent that systematically traverses game maps without loops or redundant exploration while maintaining a scalable Object-Oriented design and providing responsive human gameplay.',
    solution: 'Designed and implemented the core AI agent using the Breadth-First Search (BFS) algorithm with queue-based frontier tracking. Modeled game tiles, inventory states, and agent behaviors through strict OOP classes with both manual human mode and autonomous AI watch mode.',
    role: 'Abeer conceived and presented the initial project idea to the team, coordinated task distribution among members, collected and reviewed team contributions, and authored the AI Breadth-First Search algorithm.',
    features: [
      'Implemented Breadth-First Search (BFS) ensuring guaranteed shortest path identification.',
      'Object-Oriented Programming (OOP) hierarchy for game entities, barriers, and agent states.',
      'Two interactive play modes: manual human controls and autonomous AI solve display.',
      'Interactive mathematical riddle challenge (e.g. 5x + 7 = -33) required to unlock the escape door.',
      'Team leadership: project conception, task coordination, and comprehensive component integration.'
    ]
  },
  'ems': {
    title: 'Educational Management System (Java Project)',
    subtitle: 'Team Project • Faculty of Computer & Information Science',
    category: 'Desktop & Databases',
    tags: ['Java', 'Java Swing', 'Microsoft SQL Server', 'Database Design', 'OOP', 'Data Structures'],
    image: 'assets/images/ems_main.png',
    gallery: [
      { src: 'assets/images/ems_main.png', label: 'System Overview' },
      { src: 'assets/images/ems/01_login.png', label: 'Login Authentication' },
      { src: 'assets/images/ems/02_student_dashboard.png', label: 'Student Dashboard' },
      { src: 'assets/images/ems/03_create_course.png', label: 'Create Course' },
      { src: 'assets/images/ems/04_register_courses.png', label: 'Register Course' },
      { src: 'assets/images/ems/05_create_assignments.png', label: 'Create Assignment' },
      { src: 'assets/images/ems/06_answer_assignment.png', label: 'Answer Assignment' },
      { src: 'assets/images/ems/07_all_assignments_table.png', label: 'Assignments Table' },
      { src: 'assets/images/ems/08_grade_student_assignment.png', label: 'Grade Submissions' },
      { src: 'assets/images/ems/09_remove_assignment.png', label: 'Remove Assignment' },
      { src: 'assets/images/ems/10_view_all_courses.png', label: 'View All Courses' }
    ],
    overview: 'A full-featured educational desktop management solution connecting faculty, doctors, and students for course registration, assignment distribution, submissions, and grading.',
    problem: 'Educational workflows require structured, tamper-proof relational data storage coupled with an intuitive graphical interface for multiple user roles (Students and Doctors).',
    solution: 'Constructed an end-to-end relational schema in Microsoft SQL Server. Implemented Data Access Objects (DAO) for transactional safety, crafted user-friendly GUI screens in Java Swing, and integrated team modules.',
    role: 'Abeer designed and implemented the entire SQL Server relational database, developed key graphical user interface screens in Java Swing, integrated the database layer with application business logic, and combined team modules.',
    features: [
      'Complete relational database architecture designed and deployed in Microsoft SQL Server.',
      'Interactive desktop user interfaces built with Java Swing (Doctor & Student dashboards).',
      'Data Access Object (DAO) design pattern applied for clean database-application decoupling.',
      'Full integration of assignments, course registrations, student submissions, and user authentication.'
    ]
  },
  'pizza-web': {
    title: "Za's Place — Pizza Restaurant Website",
    subtitle: 'Individual Project • Independent Web Development',
    category: 'Frontend Web',
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'UI/UX Design', 'DOM Manipulation', 'Responsive Web Design'],
    image: 'assets/images/pizza_main.png',
    gallery: [
      { src: 'assets/images/pizza_main.png', label: 'Website Overview' },
      { src: 'assets/images/pizza/01_hero_story.png', label: 'Hero Section & Rotating Pizza' },
      { src: 'assets/images/pizza/02_about_story.png', label: 'About Story & Artisanal Oven' },
      { src: 'assets/images/pizza/03_services_grid.png', label: 'Services Showcase Grid' },
      { src: 'assets/images/pizza/04_recipes_cta.png', label: 'Authentic Recipes & Action CTA' },
      { src: 'assets/images/pizza/05_menu_selection.png', label: 'Menu Pizzas & Price Selection' },
      { src: 'assets/images/pizza/06_menu_specialties.png', label: 'Specialty Pizzas & Order Now' },
      { src: 'assets/images/pizza/07_contact_location.png', label: 'Contact, Location Map & Order Form' }
    ],
    overview: 'A complete five-page responsive restaurant website developed from scratch to deliver an enticing dining presentation, interactive UI components, and intuitive order creation.',
    problem: 'Building a multi-page interactive web application without heavy external frameworks while maintaining strict responsive consistency and engaging visual feedback.',
    solution: 'Structured and styled five coherent pages (Home, Menu, About, Contact, Order). Built dynamic JavaScript UI elements including an animated pizza rotation and auto-adjusting input field layouts.',
    role: 'Abeer independently conceptualized, coded, and tested the entire project — developing the HTML markup, CSS styling rules, JavaScript interactivity, and order form validation.',
    features: [
      'Five structured pages: Home, Menu, About, Contact, and Order with unified navigation.',
      'Interactive animated pizza rotation UI effect powered by vanilla JavaScript.',
      'Basic order form interface with responsive form handling and feedback.',
      'Dynamic input field sizing to maintain visual balance and layout consistency across devices.'
    ]
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Project Modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project');
      const data = PROJECT_DATABASE[pid];
      if (!data) return;

      const mainModalImg = document.getElementById('modal-project-img');
      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-sub').textContent = data.subtitle;
      mainModalImg.src = data.image;
      mainModalImg.alt = data.title;
      document.getElementById('modal-project-overview').textContent = data.overview;
      document.getElementById('modal-project-problem').textContent = data.problem;
      document.getElementById('modal-project-solution').textContent = data.solution;
      document.getElementById('modal-project-role').textContent = data.role;

      // Gallery Thumbnails inside Modal
      const thumbsContainer = document.getElementById('modal-project-gallery-thumbs');
      if (thumbsContainer) {
        if (data.gallery && data.gallery.length > 0) {
          thumbsContainer.style.display = 'flex';
          thumbsContainer.innerHTML = data.gallery.map((g, idx) => `
            <button class="modal-thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${g.src}" aria-label="${g.label}">
              <img src="${g.src}" alt="${g.label}">
            </button>
          `).join('');

          thumbsContainer.querySelectorAll('.modal-thumb-btn').forEach(tb => {
            tb.addEventListener('click', () => {
              thumbsContainer.querySelectorAll('.modal-thumb-btn').forEach(b => b.classList.remove('active'));
              tb.classList.add('active');
              mainModalImg.src = tb.getAttribute('data-src');
            });
          });
        } else {
          thumbsContainer.style.display = 'none';
          thumbsContainer.innerHTML = '';
        }
      }

      // Tech tags
      const techWrap = document.getElementById('modal-project-tech');
      techWrap.innerHTML = data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

      // Features list
      const featWrap = document.getElementById('modal-project-features');
      featWrap.innerHTML = data.features.map(f => `
        <li class="exp-bullet-item">
          <span class="bullet-icon"></span>
          <span>${f}</span>
        </li>
      `).join('');

      modal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  // Close handlers
  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   6. Lightbox for Certificates & Project Screenshots
   -------------------------------------------------------------------------- */
function initCertificateLightbox() {
  const lightbox = document.getElementById('cert-lightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.modal-close-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxVerifyLink = document.getElementById('lightbox-verify-link');
  const triggerCards = document.querySelectorAll('.cert-card, .gallery-card');

  triggerCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc') || '';
      const verifyUrl = card.getAttribute('data-verify');

      lightboxImg.src = imgSrc;
      lightboxTitle.textContent = title;
      if (lightboxDesc) {
        lightboxDesc.textContent = desc;
        lightboxDesc.style.display = desc ? 'block' : 'none';
      }

      if (verifyUrl && verifyUrl !== '#') {
        lightboxVerifyLink.href = verifyUrl;
        lightboxVerifyLink.style.display = 'inline-flex';
      } else {
        lightboxVerifyLink.style.display = 'none';
      }

      lightbox.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}

/* --------------------------------------------------------------------------
   7. CV Modal & Viewer
   -------------------------------------------------------------------------- */
function initCVModal() {
  const cvModal = document.getElementById('cv-modal');
  if (!cvModal) return;

  const openTriggers = document.querySelectorAll('.open-cv-modal');
  const closeBtn = cvModal.querySelector('.modal-close-btn');

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  function closeCV() {
    cvModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeCV);
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCV();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) closeCV();
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Validation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Direct mailto fallback or simulated success
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    showToast('Message sent! Opening your email client to dispatch...');
    setTimeout(() => {
      window.location.href = `mailto:abeer.wael18@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   9. Clipboard Actions & Toast Feedback
   -------------------------------------------------------------------------- */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: "${textToCopy}"`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
