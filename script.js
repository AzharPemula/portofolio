/* ═══════════════════════════════════════════════════════════════
   CLEAN PREMIUM LIGHT v6.0 — script.js
   Muhammad Azhar Firdaus | Web Developer
═══════════════════════════════════════════════════════════════ */

/* ── 1. SCROLL PROGRESS BAR (FEATURE) ── */
const progressBar = document.getElementById('scrollProgressBar');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled  = (winScroll / height) * 100;

  if (progressBar) {
    progressBar.style.width = `${scrolled}%`;
  }

  // Back to top visibility
  if (backToTopBtn) {
    if (winScroll > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── 2. TOAST NOTIFICATION ENGINE (FEATURE) ── */
function showToast(message, icon = '✓') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function copyEmailToClipboard(email) {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Email ${email} berhasil disalin!`, '📋');
  }).catch(() => {
    showToast('Gagal menyalin email.', '⚠️');
  });
}

/* ── 3. SCROLL REVEAL ANIMATIONS ── */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ── 4. 3D CARD TILT INTERACTIVITY ── */
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const midX   = rect.width / 2;
    const midY   = rect.height / 2;
    const rotX   = ((y - midY) / midY) * -5;
    const rotY   = ((x - midX) / midX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});

/* ── 5. ANIMATED NUMBER COUNTERS ── */
const counterNumbers = document.querySelectorAll('.counter-num');
let countersTriggered = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersTriggered) {
      countersTriggered = true;
      counterNumbers.forEach(counter => {
        const target   = +counter.getAttribute('data-target');
        const duration = 1500;
        const start    = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * (target - start) + start);
          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(updateCounter);
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('about');
if (statsSection) counterObserver.observe(statsSection);

/* ── 6. PROJECT CATEGORY FILTER (FEATURE) ── */
const filterPills = document.querySelectorAll('.filter-pill');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filter === 'all' || cardCategory === filter) {
        card.classList.remove('hidden');
        card.classList.remove('fade-in');
        void card.offsetWidth; // trigger reflow
        card.classList.add('fade-in');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── 7. THEME SWITCHER ENGINE ── */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon      = document.getElementById('themeIcon');
const htmlRoot       = document.documentElement;

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
    showToast(`Mode ${nextTheme === 'light' ? 'Terang' : 'Gelap'} diaktifkan`, nextTheme === 'light' ? '☀️' : '🌙');
  });
}

/* ── 8. DIGITAL CV / RESUME MODAL (FEATURE) ── */
const cvModalBackdrop = document.getElementById('cvModalBackdrop');

function openCvModal() {
  if (cvModalBackdrop) {
    cvModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCvModal(e) {
  if (e && e.target !== cvModalBackdrop && !e.target.closest('.modal-close')) {
    return;
  }
  if (cvModalBackdrop) {
    cvModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ── 9. PROJECT SPECIFICATION MODAL ── */
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

// Global Escape Key to close any open modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (cvModalBackdrop && cvModalBackdrop.classList.contains('active')) {
      closeCvModal();
    }
    if (modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  }
});

/* ── 10. DIRECT WHATSAPP FORM SUBMISSION ── */
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
  showToast('Membuka WhatsApp...', '💬');
  e.target.reset();
}

/* ── 11. ANIMATED ROLE TYPEWRITER & SKILL METER ── */
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

// Skill Fill Animation
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

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}
