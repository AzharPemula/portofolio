/* ═══════════════════════════════════════════════════════════════
   CYBER HUD V4.0 — script.js
   Muhammad Azhar Firdaus | Web Developer
   Features:
    1. Dark / Light Mode Switcher with localStorage
    2. Interactive Live Terminal Shell CLI
    3. Project Specification Modal Pop-up
    4. Custom Cursor with Glow Ring Follower
    5. Direct WhatsApp Form Router
    6. Animated Role Typewriter & Skill Meters
═══════════════════════════════════════════════════════════════ */

/* ── 1. DARK / LIGHT MODE ENGINE ── */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon      = document.getElementById('themeIcon');
const htmlRoot       = document.documentElement;

// Initialize theme from storage or default to 'dark'
const savedTheme = localStorage.getItem('azhar_hud_theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  htmlRoot.setAttribute('data-theme', theme);
  localStorage.setItem('azhar_hud_theme', theme);

  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Cyber HUD');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Light Laboratory');
    }
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const nextTheme    = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

/* ── 2. CUSTOM MOUSE CURSOR ── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = -100, mouseY = -100;
let ringX  = -100, ringY  = -100;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top  = `${mouseY}px`;
  }
});

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top  = `${ringY}px`;
  }
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Add hover effect when hovering over interactive elements
const hoverables = document.querySelectorAll('a, button, input, textarea, .project-hud-card, .skill-hud-card');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ── 3. MOBILE NAV TOGGLE & SCROLL ACTIVE ── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-menu a:not(.nav-btn)');

window.addEventListener('scroll', () => {
  let currentId = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) {
      currentId = sec.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${currentId}`) {
      a.classList.add('active');
    }
  });
});

/* ── 4. ANIMATED ROLE TYPEWRITER ── */
const roles = [
  'Web Developer',
  'Frontend Engineer',
  'Clean Code Craftsman',
  'Fullstack Explorer'
];
const typingRole = document.getElementById('typingRole');
let rIdx = 0, cIdx = 0, isDeleting = false;

function loopTypewriter() {
  if (!typingRole) return;
  const currentText = roles[rIdx];

  if (!isDeleting) {
    typingRole.textContent = currentText.slice(0, ++cIdx);
    if (cIdx === currentText.length) {
      isDeleting = true;
      setTimeout(loopTypewriter, 2000);
      return;
    }
  } else {
    typingRole.textContent = currentText.slice(0, --cIdx);
    if (cIdx === 0) {
      isDeleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
  setTimeout(loopTypewriter, isDeleting ? 45 : 85);
}

if (typingRole) {
  setTimeout(loopTypewriter, 600);
}

/* ── 5. SKILL PROGRESS BAR ANIMATION ── */
const meterFills = document.querySelectorAll('.hud-meter-fill');
const meterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = `${entry.target.dataset.width}%`;
      meterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

meterFills.forEach(bar => meterObserver.observe(bar));

/* ── 6. FEATURE 1: INTERACTIVE LIVE TERMINAL CLI ENGINE ── */
const terminalHistory = document.getElementById('terminalHistory');
const terminalInput   = document.getElementById('terminalInput');
const terminalScreen  = document.getElementById('terminalScreen');

const COMMANDS = {
  help: () => `
<div style="color: var(--cyan); font-weight: 700;">AVAILABLE COMMANDS:</div>
  <span style="color: var(--emerald);">help</span>       - Tampilkan panduan ini
  <span style="color: var(--emerald);">about</span>      - Informasi profil dan biografi singkat
  <span style="color: var(--emerald);">skills</span>     - Ringkasan keahlian teknis (Frontend/Backend)
  <span style="color: var(--emerald);">projects</span>   - Daftar proyek unggulan yang tersedia
  <span style="color: var(--emerald);">contact</span>    - Saluran komunikasi (Email, WhatsApp, Lokasi)
  <span style="color: var(--emerald);">sudo hire</span>  - Kirim sinyal perekrutan langsung!
  <span style="color: var(--emerald);">github</span>     - Buka profil GitHub resmi (@AzharPemula)
  <span style="color: var(--emerald);">theme</span>      - Beralih antara Dark Cyber dan Light Mode
  <span style="color: var(--emerald);">date</span>       - Waktu dan status sistem saat ini
  <span style="color: var(--emerald);">clear</span>      - Bersihkan layar terminal
`,
  about: () => `
<div style="color: var(--cyan); font-weight: 700;">[IDENTITY SPECIFICATION]</div>
Nama      : Muhammad Azhar Firdaus
Peran     : Web Developer (Fresh Graduate)
Basis     : Banten, Indonesia
Dedikasi  : Membangun web performa tinggi, arsitektur modular, dan antarmuka reaktif.
`,
  skills: () => `
<div style="color: var(--cyan); font-weight: 700;">[TECHNICAL CAPABILITIES]</div>
Frontend  : HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js, Next.js, Vue.js
Backend   : Node.js, Express, PHP, Laravel, RESTful API Design
Database  : MySQL, PostgreSQL, MongoDB, Redis (Basic)
Tooling   : Git, GitHub, VS Code, Linux, Postman, Vercel, Vite
`,
  projects: () => `
<div style="color: var(--cyan); font-weight: 700;">[DEPLOYED PROJECTS MATRIX]</div>
1. <span style="color: var(--emerald);">Modern E-Commerce Platform</span> (React, Node.js, MongoDB)
2. <span style="color: var(--emerald);">Productivity Kanban Hub</span> (Vue.js, Laravel, MySQL)
3. <span style="color: var(--emerald);">Scalable Micro-API Gateway</span> (Node.js, Express, Redis)
4. <span style="color: var(--emerald);">Real-Time Metrics Dashboard</span> (React, D3.js, PostgreSQL)
5. <span style="color: var(--emerald);">Smart Financial Tracker</span> (React Native, Firebase)
Ketik 'contact' atau klik [INSPECT SPEC] di bawah untuk detail lengkap.
`,
  contact: () => `
<div style="color: var(--cyan); font-weight: 700;">[COMMUNICATION FREQUENCIES]</div>
WhatsApp  : <a href="https://wa.me/6281287372759" target="_blank" style="color: var(--emerald); text-decoration: underline;">+62 812-8737-2759 (Click to Chat)</a>
Email     : <a href="mailto:azharxbd@gmail.com" style="color: var(--cyan); text-decoration: underline;">azharxbd@gmail.com</a>
GitHub    : <a href="https://github.com/AzharPemula" target="_blank" style="color: var(--text-primary); text-decoration: underline;">github.com/AzharPemula</a>
LinkedIn  : <a href="https://www.linkedin.com/in/muhammad-azhar-firdaus-737588345/" target="_blank" style="color: var(--text-primary); text-decoration: underline;">Muhammad Azhar Firdaus</a>
`,
  'sudo hire': () => {
    setTimeout(() => {
      window.open('https://wa.me/6281287372759?text=Halo%20Azhar,%20saya%20tertarik%20merekrut%20/%20bekerja%20sama%20dengan%20Anda!', '_blank');
    }, 800);
    return `<div style="color: var(--emerald); font-weight: 700;">[ACCESS GRANTED] Membuka saluran perekrutan prioritas ke WhatsApp Muhammad Azhar Firdaus... 🚀</div>`;
  },
  github: () => {
    setTimeout(() => window.open('https://github.com/AzharPemula', '_blank'), 500);
    return `<span style="color: var(--cyan);">Membuka GitHub: https://github.com/AzharPemula</span>`;
  },
  theme: () => {
    const cur = htmlRoot.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    return `<span style="color: var(--emerald);">Tema berhasil diubah ke mode: [${next.toUpperCase()}]</span>`;
  },
  date: () => `<span style="color: var(--text-muted);">${new Date().toString()}</span>`
};

function handleTerminalSubmit(e) {
  e.preventDefault();
  if (!terminalInput) return;

  const rawCmd = terminalInput.value.trim();
  const cmd = rawCmd.toLowerCase();
  terminalInput.value = '';

  if (!cmd) return;

  // Append user's input line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'terminal-line';
  cmdLine.innerHTML = `<span class="prompt-prefix">guest@azhar-dev:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
  terminalHistory.appendChild(cmdLine);

  if (cmd === 'clear') {
    terminalHistory.innerHTML = '';
    return;
  }

  // Generate response
  const outLine = document.createElement('div');
  outLine.className = 'terminal-output';

  if (COMMANDS[cmd]) {
    outLine.innerHTML = COMMANDS[cmd]();
  } else {
    outLine.innerHTML = `<span style="color: var(--rose);">Command not recognized: '${escapeHtml(rawCmd)}'. Type <span style="color: var(--emerald); font-weight: 700;">'help'</span> for instructions.</span>`;
  }

  terminalHistory.appendChild(outLine);

  // Auto-scroll to bottom of terminal screen
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ── 7. FEATURE 2: PROJECT SPECIFICATION MODAL POP-UP ── */
const PROJECT_SPECS = {
  ecommerce: {
    tag: '// SPEC // ECOMMERCE_FULLSTACK_V2',
    title: 'Modern E-Commerce Engine Platform',
    desc: 'Platform toko daring menyeluruh dengan arsitektur RESTful API yang memisahkan frontend reaktif dengan backend layanan data. Dibangun untuk kecepatan akses tinggi dan alur transaksi yang lancar.',
    features: [
      'Katalog produk interaktif dengan filtering kategori dan pencarian instan.',
      'Sistem keranjang belanja (Shopping Cart) reaktif dengan persistensi sesi pengguna.',
      'Integrasi checkout terstruktur dan dasbor manajemen inventaris untuk admin.',
      'Desain mobile-first responsif yang dioptimalkan untuk rasio konversi tinggi.'
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    repo: 'https://github.com/AzharPemula'
  },
  kanban: {
    tag: '// SPEC // PRODUCTIVITY_KANBAN_HUB',
    title: 'Productivity Kanban Hub & Task Manager',
    desc: 'Aplikasi manajemen alur kerja tim berbasis Kanban board yang memungkinkan pengaturan tugas, pelacakan sprint, dan visibilitas progres tim secara terstruktur.',
    features: [
      'Visualisasi board interaktif: Todo, In Progress, Review, dan Completed.',
      'Sistem pelacakan tenggat waktu dan label prioritas tugas yang dinamis.',
      'Manajemen otentikasi peran tim dan laporan penyelesaian milestone.',
      'Performa rendering cepat menggunakan komponen Vue.js dan API Laravel.'
    ],
    tech: ['Vue.js', 'Laravel', 'PHP', 'MySQL', 'CSS Grid', 'RESTful API'],
    repo: 'https://github.com/AzharPemula'
  },
  api: {
    tag: '// SPEC // SCALABLE_API_GATEWAY',
    title: 'Scalable Micro-API Gateway Architecture',
    desc: 'Layanan gerbang API backend yang mengatur autentikasi terpusat, pengamanan rute, proteksi DDoS via rate limiting, dan dokumentasi endpoint otomatis.',
    features: [
      'Autentikasi tanpa status (Stateless) menggunakan Json Web Token (JWT).',
      'Rate limiting terdistribusi berbasis Redis untuk mencegah brute-force request.',
      'Validasi payload request ketat dan error handling terpusat yang aman.',
      'Auto-generated API documentation interaktif berbasis Swagger/OpenAPI.'
    ],
    tech: ['Node.js', 'Express.js', 'Redis', 'JWT', 'Swagger', 'Docker'],
    repo: 'https://github.com/AzharPemula'
  },
  dashboard: {
    tag: '// SPEC // TELEMETRY_METRICS_DASHBOARD',
    title: 'Real-Time Metrics & Business Dashboard',
    desc: 'Dasbor analitik data telemetri bisnis dengan visualisasi grafik interaktif, pemrosesan metrik agregasi tinggi, dan ekspor laporan berkala.',
    features: [
      'Visualisasi grafik data interaktif (Line, Bar, Doughnut) menggunakan D3.js.',
      'Penyaringan data multi-dimensi (tanggal, kategori produk, performa penjualan).',
      'Desain antarmuka gelap dengan kontras visual tajam untuk analisis efisien.',
      'Dukungan ekspor dataset ke format CSV dan PDF siap cetak.'
    ],
    tech: ['React.js', 'D3.js', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
    repo: 'https://github.com/AzharPemula'
  },
  finance: {
    tag: '// SPEC // MOBILE_FINANCE_TRACKER',
    title: 'Smart Financial Tracker Mobile App',
    desc: 'Aplikasi manajemen keuangan personal yang membantu pengguna mencatat arus kas masuk dan keluar secara intuitif dengan sinkronisasi cloud waktu nyata.',
    features: [
      'Pencatatan transaksi cepat dengan kategorisasi pintar dan tagging otomatis.',
      'Grafik visual rasio anggaran bulanan versus realisasi pengeluaran.',
      'Sinkronisasi multi-device waktu nyata dengan database Firebase Cloud.',
      'Notifikasi pengingat pembayaran tagihan berkala untuk menjaga stabilitas finansial.'
    ],
    tech: ['React Native', 'Firebase Cloud Firestore', 'Charts UI', 'Mobile First'],
    repo: 'https://github.com/AzharPemula'
  }
};

const modalOverlay = document.getElementById('projectModalOverlay');
const modalTag     = document.getElementById('modalTag');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDescription');
const modalFeat    = document.getElementById('modalFeatures');
const modalTech    = document.getElementById('modalTechStack');
const modalRepoBtn = document.getElementById('modalRepoBtn');

function openProjectModal(key) {
  const spec = PROJECT_SPECS[key];
  if (!spec || !modalOverlay) return;

  modalTag.textContent   = spec.tag;
  modalTitle.textContent = spec.title;
  modalDesc.textContent  = spec.desc;

  // Populate features
  modalFeat.innerHTML = spec.features.map(f => `
    <li><i class="fas fa-check-circle"></i> <span>${f}</span></li>
  `).join('');

  // Populate tech stack
  modalTech.innerHTML = spec.tech.map(t => `
    <span>${t}</span>
  `).join('');

  modalRepoBtn.setAttribute('href', spec.repo);

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(e) {
  if (e && e.target !== modalOverlay && !e.target.closest('.modal-close-btn') && !e.target.closest('.btn-hud')) {
    return;
  }
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
    closeProjectModal();
  }
});

/* ── 8. BULLETPROOF DIRECT WHATSAPP SUBMIT ── */
function handleDirectSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  const textMessage = 
    `Halo Azhar, saya *${name}* (${email}).\n\n` +
    `*Subjek:* ${subject}\n\n` +
    `*Pesan:* \n${message}\n\n` +
    `_Dikirim via Formulir Cyber HUD di azharpemula.github.io_`;

  const waUrl = `https://wa.me/6281287372759?text=${encodeURIComponent(textMessage)}`;
  window.open(waUrl, '_blank');
  e.target.reset();
}
