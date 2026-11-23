/* ═══════════════════════════════════════════════════════════════
   BENTO GRID STUDIO — script.js
   Muhammad Azhar Firdaus | Web Developer
═══════════════════════════════════════════════════════════════ */

/* ── 1. MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

/* ── 2. ACTIVE NAV LINK OBSERVER ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-btn)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ── 3. TYPING EFFECT FOR HERO ROLE ── */
const roles = [
  'Web Developer',
  'Frontend Engineer',
  'Clean Code Enthusiast',
  'Fullstack Explorer'
];
const typingEl = document.getElementById('typingRole');
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeRoleLoop() {
  if (!typingEl) return;
  const currentRole = roles[roleIdx];

  if (!isDeleting) {
    typingEl.textContent = currentRole.slice(0, ++charIdx);
    if (charIdx === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRoleLoop, 2200);
      return;
    }
  } else {
    typingEl.textContent = currentRole.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRoleLoop, isDeleting ? 45 : 80);
}

if (typingEl) {
  setTimeout(typeRoleLoop, 500);
}

/* ── 4. BULLETPROOF DIRECT WHATSAPP SUBMIT ── */
function handleDirectSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  // Format a clean, professional WhatsApp template
  const textMessage = 
    `Halo Azhar, saya *${name}* (${email}).\n\n` +
    `*Subjek:* ${subject}\n\n` +
    `*Pesan:* \n${message}\n\n` +
    `_Dikirim melalui formulir portofolio azharpemula.github.io_`;

  const waUrl = `https://wa.me/6281287372759?text=${encodeURIComponent(textMessage)}`;

  // Open direct WhatsApp chat
  window.open(waUrl, '_blank');

  // Also reset form
  e.target.reset();
}
