/* ════════════════════════════════════════════
   PORTFOLIO — script.js
   Muhammad Azhar Firdaus | Web Developer
════════════════════════════════════════════ */

/* ── 1. NAVBAR: scroll behaviour & mobile menu ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── 2. ACTIVE NAV LINK on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchs = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const observeNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observeNav.observe(s));

/* ── 3. SCROLL REVEAL ── */
const revealEls = [];

function addReveal(selector, delay = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${delay + i * 80}ms`;
    revealEls.push(el);
  });
}

addReveal('.stat-card',      0);
addReveal('.skill-category', 0);
addReveal('.project-card',   0);
addReveal('.timeline-item',  0);
addReveal('.testimonial-card', 0);
addReveal('.about-text',     0);
addReveal('.contact-info',   0);
addReveal('.contact-form',   0);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 4. SKILL BARS ANIMATION ── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

/* ── 5. PROJECT FILTER ── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      // re-trigger reveal
      if (match) {
        setTimeout(() => card.classList.add('visible'), 10);
      }
    });
  });
});

/* ── 6. CONTACT FORM — EmailJS ── */
// ════════════════════════════════════════════════════
// SETUP: Buat akun di https://www.emailjs.com (gratis)
//  1. Buat Email Service (Gmail dsb) → catat SERVICE_ID
//  2. Buat Email Template → catat TEMPLATE_ID
//     Template variables: {{from_name}}, {{from_email}},
//                         {{subject}}, {{message}}
//  3. Salin Public Key dari Account → Settings
//  4. Ganti ketiga nilai di bawah + di <head> index.html
// ════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID  = 'service_w4oenmu';
const EMAILJS_TEMPLATE_ID = 'template_92hr3bk';
// Public key sudah di-init di <head> index.html

function handleSubmit(e) {
  e.preventDefault();
  const form     = e.target;
  const statusEl = document.getElementById('formStatus');
  const btn      = form.querySelector('button[type="submit"]');

  btn.disabled    = true;
  btn.innerHTML   = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  statusEl.className   = 'form-status';
  statusEl.textContent = '';

  const params = {
    from_name : form.name.value,
    from_email: form.email.value,
    subject   : form.subject.value,
    message   : form.message.value,
    to_email  : 'azharxbd@gmail.com',
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      statusEl.className   = 'form-status success';
      statusEl.textContent = '✅ Pesan berhasil dikirim! Saya akan segera menghubungi Anda.';
      form.reset();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      statusEl.className   = 'form-status error';
      statusEl.textContent = '❌ Gagal mengirim pesan. Silakan hubungi langsung via email.';
    })
    .finally(() => {
      btn.disabled  = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
      setTimeout(() => { statusEl.textContent = ''; }, 6000);
    });
}

/* ── 7. BACK TO TOP ── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 8. TYPING EFFECT for hero title ── */
const titles  = ['Web Developer', 'Web Designer', 'Frontend Developer', 'Problem Solver'];
const titleEl = document.querySelector('.hero-title');
let   tIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const current = titles[tIdx];
  if (!deleting) {
    titleEl.firstChild.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    titleEl.firstChild.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 90);
}

// wrap text node for typing
if (titleEl) {
  titleEl.innerHTML = '<span></span><span class="cursor">|</span>';
  setTimeout(typeLoop, 800);
}

/* ── 9. SMOOTH ACTIVE STYLE for nav ── */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--primary) !important; font-weight: 600 !important; }`;
document.head.appendChild(style);
