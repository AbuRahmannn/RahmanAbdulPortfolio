/* ============================================================
   RAHMAN ABDUL — PORTFOLIO SCRIPT
   Interactions, Animations & Effects
============================================================ */

'use strict';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {

  initPreloader();
  initCursor();
  initCanvas();
  initNavbar();
  initTyping();
  initScrollProgress();
  initReveal();
  initSkillBars();
  initCounters();
  initSmoothScroll();
  initActiveNav();
  initFooter();
  consoleBrand();

});

/* ============================================================
   PRELOADER
============================================================ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.remove(), 600);
    }, 1800);
  });
}

/* ============================================================
   CUSTOM CURSOR
============================================================ */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover enlarge on interactive elements
  const hoverables = document.querySelectorAll(
    'a, button, .btn, .project-card, .cert-card, .social-btn, .skill-group, .tl-body'
  );
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* ============================================================
   PARTICLE CANVAS BACKGROUND
============================================================ */
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor((W * H) / 16000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const GOLD = [219, 168, 78];
    const WHITE = [180, 200, 240];

    particles.forEach((p, i) => {
      // Update
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Draw dot
      const isGold = i % 5 === 0;
      const [r, g, b] = isGold ? GOLD : WHITE;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const lineAlpha = (1 - dist / 100) * 0.08;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(219,168,78,${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

/* ============================================================
   NAVBAR
============================================================ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!navbar) return;

  // Scroll styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else                      navbar.classList.remove('scrolled');
  });

  // Mobile toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ============================================================
   TYPING EFFECT
============================================================ */
function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Full Stack Developer',
    'AI Enthusiast',
    'SIH 2025 Team Leader',
    'React Developer',
    'Java Developer',
    'Spring Boot Developer',
    'Problem Solver',
  ];

  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 45 : 90);
  }
  type();
}

/* ============================================================
   SCROLL PROGRESS BAR
============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  });
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          siblings.forEach((sib, idx) => {
            setTimeout(() => sib.classList.add('visible'), idx * 80);
          });
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ============================================================
   SKILL BARS — animate on scroll
============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.sbar');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill  = entry.target.querySelector('.sbar-fill');
          const level = entry.target.getAttribute('data-level');
          if (fill) {
            setTimeout(() => {
              fill.style.width = level + '%';
            }, 200);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(b => observer.observe(b));
}

/* ============================================================
   COUNTER ANIMATION
============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

function animateCount(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step     = 16;
  const steps    = duration / step;
  let current    = 0;

  const timer = setInterval(() => {
    current += target / steps;
    el.textContent = Math.floor(current);
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, step);
}

/* ============================================================
   SMOOTH SCROLL
============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   ACTIVE NAV LINK
============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + entry.target.id) {
              item.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   FOOTER YEAR
============================================================ */
function initFooter() {
  const el = document.getElementById('footerCopy');
  if (el) {
    el.textContent = `© ${new Date().getFullYear()} Rahman Abdul. All Rights Reserved.`;
  }
}

/* ============================================================
   HERO NAME GLITCH — subtle effect on hover
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const heroName = document.getElementById('heroName');
  if (!heroName) return;

  heroName.addEventListener('mouseenter', () => {
    heroName.style.animation = 'none';
    heroName.style.letterSpacing = '2px';
    setTimeout(() => heroName.style.letterSpacing = '', 300);
  });
});

/* ============================================================
   CARD TILT — 3D hover on project & cert cards
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const tiltCards = document.querySelectorAll('.project-card, .cert-card, .skill-group');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * 5;
      const rotY = ((cx - x) / cx) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

/* ============================================================
   FLOATING BLOBS / PARALLAX — subtle mouse movement
============================================================ */
document.addEventListener('mousemove', e => {
  if (window.innerWidth < 768) return;
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  // Gentle parallax shift of canvas
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  canvas.style.transform = `translate(${x}px,${y}px)`;
});

/* ============================================================
   CONSOLE BRANDING
============================================================ */
function consoleBrand() {
  console.log(
    '%c\n  RAHMAN ABDUL \n  Full Stack Developer\n',
    'color:#dba84e;font-size:14px;font-weight:bold;font-family:monospace;' +
    'background:#070b12;padding:10px 20px;border-left:4px solid #dba84e;'
  );
  console.log('%c📧 ima.rahman06@gmail.com',            'color:#b0bcd0');
  console.log('%c🔗 github.com/AbuRahmannn',             'color:#b0bcd0');
  console.log('%c🔗 linkedin.com/in/rahmanabd',          'color:#b0bcd0');
}
