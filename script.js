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
}, { threshold: 0.35 });

sections.forEach(s => observeNav.observe(s));

/* ── 3. SCROLL REVEAL ── */
const revealEls = [];

function addReveal(selector, delay = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${delay + i * 70}ms`;
    revealEls.push(el);
  });
}

addReveal('.stat-card',        0);
addReveal('.skill-category',   0);
addReveal('.project-card',     0);
addReveal('.timeline-item',    0);
addReveal('.testimonial-card', 0);
addReveal('.about-card-box',   0);
addReveal('.contact-info',     0);
addReveal('.contact-form',     0);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

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
}, { threshold: 0.25 });

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
      if (match) {
        setTimeout(() => card.classList.add('visible'), 10);
      }
    });
  });
});

/* ── 6. CONTACT FORM — EmailJS ── */
const EMAILJS_SERVICE_ID  = 'service_w4oenmu';
const EMAILJS_TEMPLATE_ID = 'template_92hr3bk';

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
      statusEl.textContent = '❌ Gagal mengirim pesan. Silakan kontak langsung via email/WhatsApp.';
    })
    .finally(() => {
      btn.disabled  = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan Sekarang';
      setTimeout(() => { statusEl.textContent = ''; }, 6000);
    });
}

/* ── 7. BACK TO TOP ── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 8. TYPING EFFECT FOR HERO TITLE ── */
const titles = ['Web Developer', 'Frontend Engineer', 'UI/UX Craftsman', 'Creative Problem Solver'];
const typingTarget = document.querySelector('.typing-target');
let tIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const current = titles[tIdx];
  if (!deleting) {
    typingTarget.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typingTarget.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 85);
}

if (typingTarget) {
  setTimeout(typeLoop, 600);
}
