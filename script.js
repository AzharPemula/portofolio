/* ═══════════════════════════════════════════════════════════════
   CLEAN PREMIUM LIGHT — script.js
   Muhammad Azhar Firdaus | Web Developer
═══════════════════════════════════════════════════════════════ */

/* ── 1. THEME SWITCHER ENGINE (Default: Light Mode) ── */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon      = document.getElementById('themeIcon');
const htmlRoot       = document.documentElement;

// Initialize theme from storage or default to 'light'
const savedTheme = localStorage.getItem('azhar_clean_theme') || 'light';
applyTheme(savedTheme);

function applyTheme(theme) {
  htmlRoot.setAttribute('data-theme', theme);
  localStorage.setItem('azhar_clean_theme', theme);

  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
      themeToggleBtn.setAttribute('title', 'Beralih ke Mode Terang');
    } else {
      themeIcon.className = 'fas fa-moon';
      themeToggleBtn.setAttribute('title', 'Beralih ke Mode Gelap');
    }
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const nextTheme    = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

/* ── 2. MOBILE NAVIGATION ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ── 3. ACTIVE NAV HIGHLIGHTER ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

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
  'UI/UX Enthusiast',
  'Creative Problem Solver'
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
      setTimeout(loopTypewriter, 2200);
      return;
    }
  } else {
    typingRole.textContent = currentText.slice(0, --cIdx);
    if (cIdx === 0) {
      isDeleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
  setTimeout(loopTypewriter, isDeleting ? 40 : 80);
}

if (typingRole) {
  setTimeout(loopTypewriter, 500);
}

/* ── 5. SKILL METER ANIMATION ── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = `${entry.target.dataset.width}%`;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

skillFills.forEach(bar => skillObserver.observe(bar));

/* ── 6. PROJECT DETAIL SPEC MODAL ── */
const PROJECT_DATA = {
  ecommerce: {
    tag: 'Web Application // E-Commerce',
    title: 'Modern E-Commerce Engine Platform',
    desc: 'Platform belanja daring komprehensif yang memadukan antarmuka frontend reaktif dengan arsitektur backend RESTful API. Didesain untuk performa cepat dan navigasi belanja yang mulus.',
    features: [
      'Katalog produk terstruktur dengan pencarian dan filter kategori instan.',
      'Shopping cart reaktif dengan manajemen kuantitas dan penyimpanan sesi.',
      'Sistem checkout terintegrasi dan halaman riwayat pesanan pengguna.',
      'Dashboard admin responsif untuk manajemen produk dan status pesanan.'
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    repo: 'https://github.com/AzharPemula'
  },
  kanban: {
    tag: 'Collaboration Tool // Productivity',
    title: 'Productivity Kanban Hub & Task Manager',
    desc: 'Aplikasi manajemen alur kerja tim berbasis papan Kanban interaktif yang membantu tim melacak progres tugas dan pencapaian milestone secara transparan.',
    features: [
      'Kolom alur kerja dinamis: To Do, In Progress, Review, dan Done.',
      'Pengaturan label prioritas tugas, estimasi waktu, dan status tim.',
      'Performa rendering cepat menggunakan komponen Vue.js dan backend Laravel.',
      'Desain antarmuka bersih yang memudahkan fokus pada prioritas kerja harian.'
    ],
    tech: ['Vue.js', 'Laravel', 'PHP', 'MySQL', 'RESTful API'],
    repo: 'https://github.com/AzharPemula'
  },
  api: {
    tag: 'Backend Architecture // Gateway',
    title: 'Scalable Micro-API Gateway Service',
    desc: 'Layanan API gateway backend yang mengatur otentikasi terpusat, pengamanan rute akses data, pembatasan laju request (rate limiting), dan dokumentasi endpoint otomatis.',
    features: [
      'Otentikasi aman berbasis Json Web Token (JWT) stateless.',
      'Proteksi rate-limiting terdistribusi berbasis Redis untuk mencegah brute-force.',
      'Validasi data request terpusat dengan penanganan error yang rapi.',
      'Dokumentasi otomatis endpoint interaktif berbasis Swagger/OpenAPI.'
    ],
    tech: ['Node.js', 'Express.js', 'Redis', 'JWT', 'Swagger'],
    repo: 'https://github.com/AzharPemula'
  },
  dashboard: {
    tag: 'Data Visualization // Analytics',
    title: 'Real-Time Metrics & Business Dashboard',
    desc: 'Dasbor analitik data bisnis dengan grafik telemetri interaktif, pemrosesan metrik penjualan, dan ekspor laporan berkala untuk pengambilan keputusan cepat.',
    features: [
      'Visualisasi data interaktif (Line Chart, Bar Chart, Donut) berbasis D3.js.',
      'Penyaringan data multi-kategori berdasarkan rentang tanggal dan jenis produk.',
      'Desain modern dengan kontras warna yang nyaman untuk analisis data.',
      'Dukungan ekspor dataset ke format CSV.'
    ],
    tech: ['React.js', 'D3.js', 'PostgreSQL', 'Tailwind CSS'],
    repo: 'https://github.com/AzharPemula'
  },
  finance: {
    tag: 'Mobile App // Personal Finance',
    title: 'Smart Financial Tracker Mobile App',
    desc: 'Aplikasi pencatatan keuangan personal yang membantu pengguna memantau arus kas pemasukan dan pengeluaran secara intuitif dengan sinkronisasi database cloud.',
    features: [
      'Pencatatan transaksi cepat dengan kategorisasi pintar pengeluaran.',
      'Grafik visual alokasi anggaran bulanan versus realisasi pengeluaran.',
      'Sinkronisasi multi-device waktu nyata dengan database Firebase Cloud.',
      'Notifikasi pengingat pengeluaran untuk menjaga kedisiplinan finansial.'
    ],
    tech: ['React Native', 'Firebase Firestore', 'Charts UI'],
    repo: 'https://github.com/AzharPemula'
  }
};

const modalBackdrop = document.getElementById('projectModalBackdrop');
const modalTag      = document.getElementById('modalTag');
const modalTitle    = document.getElementById('modalTitle');
const modalDesc     = document.getElementById('modalDescription');
const modalFeat     = document.getElementById('modalFeatures');
const modalTech     = document.getElementById('modalTechList');
const modalRepoLink = document.getElementById('modalRepoLink');

function openProjectModal(key) {
  const data = PROJECT_DATA[key];
  if (!data || !modalBackdrop) return;

  modalTag.textContent   = data.tag;
  modalTitle.textContent = data.title;
  modalDesc.textContent  = data.desc;

  modalFeat.innerHTML = data.features.map(f => `
    <li><i class="fas fa-check-circle"></i> <span>${f}</span></li>
  `).join('');

  modalTech.innerHTML = data.tech.map(t => `
    <span>${t}</span>
  `).join('');

  modalRepoLink.setAttribute('href', data.repo);

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(e) {
  if (e && e.target !== modalBackdrop && !e.target.closest('.modal-close') && !e.target.closest('.btn-outline')) {
    return;
  }
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
    closeProjectModal();
  }
});

/* ── 7. DIRECT WHATSAPP FORM SUBMISSION ── */
function handleDirectSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  const formattedMsg = 
    `Halo Azhar, saya *${name}* (${email}).\n\n` +
    `*Subjek:* ${subject}\n\n` +
    `*Pesan:* \n${message}\n\n` +
    `_Dikirim melalui formulir portofolio azharpemula.github.io_`;

  const waUrl = `https://wa.me/6281287372759?text=${encodeURIComponent(formattedMsg)}`;
  window.open(waUrl, '_blank');
  e.target.reset();
}
