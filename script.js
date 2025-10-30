window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});
const sections = document.querySelectorAll('.fade');
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);






const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const trackName = document.getElementById('trackName');
const trackCover = document.getElementById('trackCover');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const playlist = document.getElementById('playlist');

// 🎶 Lista de canciones
const tracks = [
  { name: "Northe - Algo está pasando", src: "audio/Master Algo esta pasando NOR-T.mp3", cover: "assets/northe.png" },
  { name: "Northe - Algo de mi", src: "audio/Master Algo de mi NORT-T.mp3", cover: "assets/northe.png" },
  { name: "Northe - Lo que espero", src: "audio/Master Lo que espero NORT-T.mp3", cover: "assets/northe.png" },
  { name: "Serie2 - La flor", src: "audio/la flor seri2.mp3", cover: "assets/flor.png" },
  { name: "Serie2 - Así fue", src: "audio/Master Cover Asi fue.mp3", cover: "assets/asi fue .png" },
  { name: "Serie2 - Llegaste tu", src: "audio/Master Llegaste tu.mp3", cover: "assets/asi fue .png" },
  { name: "Serie2 - Mirame", src: "audio/Master Mirame.mp3", cover: "assets/asi fue .png" },
  { name: "Serie2 - Vamos nena", src: "audio/Master Vamos Nena.mp3", cover: "assets/asi fue .png" },
  { name: "Laureles - El títere", src: "audio/El Titere By Laureles Mastering.mp3", cover: "assets/laureles.jpg" },
  { name: "Laureles - Niebla del riachuelo", src: "audio/Niebla del Riachuelo By laureles Mastering.mp3", cover: "assets/laureles.jpg" },
  { name: "Laureles - El candombe", src: "audio/El Candombe by Laureles Mastering.mp3", cover: "assets/laureles.jpg" },
  { name: "Ciudad Paraiso - Tributo Guns Roses", src: "audio/Ciudad paraiso Tributo Guns  Nicolás Espinola.mp3", cover: "assets/ciudad paraiso.png" },
  { name: "Doble de Riesgo - Lo que dijo el viento", src: "audio/MASTER Lo que dijo el viento Wind FX.mp3", cover: "assets/doble.png" },
  { name: "Doble de Riesgo - Puñalada", src: "audio/Master Punalada Final.mp3", cover: "assets/doble.png" },
  { name: "Ayakkrob - Summer Days", src: "audio/Master V2 Summerdays.mp3", cover: "assets/ayakrob.png" },
  { name: "Vivo en mitos argentinos - Popu Kuryaki - La maquina", src: "audio/Copia de Master V1 Popu Kuriakys.mp3", cover: "assets/mitos.png" },
  { name: "Vivo en mitos argentinos - Sobre mis pasos - Jalez", src: "audio/Copia de Master V1 Sobre mis pasos.mp3", cover: "assets/mitos.png" },
  { name: "Vivo en mitos argentinos - Amnesia temporal - Jalez", src: "audio/Master V1 Intro Amnesia temporal-cm.mp3", cover: "assets/mitos.png" },
  { name: "Vivo en mitos argentinos - El tempo de momo - Tesoro", src: "audio/El tesoro - El templo de momo.mp3", cover: "assets/mitos.png" },
  { name: "Indigo Latinoamerica - La soledad", src: "audio/INDIGO ANTO-NICO SOLEDAD Mastering V1.mp3", cover: "assets/mitos.png" }
];

let current = 0;

// Generar playlist visual
tracks.forEach((track, i) => {
  const li = document.createElement('li');
  li.innerHTML = `<i class="fa-solid fa-music"></i> ${track.name}`;
  li.addEventListener('click', () => {
    current = i;
    loadTrack(i);
    audio.play();
  });
  playlist.appendChild(li);
});

const trackItems = playlist.querySelectorAll('li');

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  trackName.textContent = track.name;
  trackCover.src = track.cover;
  trackItems.forEach(t => t.classList.remove('active'));
  trackItems[index].classList.add('active');
  updatePlayIcon();
}

function updatePlayIcon() {
  playBtn.innerHTML = audio.paused
    ? '<i class="fa-solid fa-play"></i>'
    : '<i class="fa-solid fa-pause"></i>';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});
audio.addEventListener('play', updatePlayIcon);
audio.addEventListener('pause', updatePlayIcon);

nextBtn.addEventListener('click', () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
  audio.play();
});
prevBtn.addEventListener('click', () => {
  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
  audio.play();
});

audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;

    const durMin = Math.floor(audio.duration / 60);
    const durSec = Math.floor(audio.duration % 60);
    durationEl.textContent = `${durMin}:${durSec.toString().padStart(2, '0')}`;
  }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
audio.addEventListener('ended', () => nextBtn.click());

// Inicial
loadTrack(current);










// --- NAV SCROLL (si ya existe, omitir duplicado) ---
if (!window._navScrollBound) {
  window._navScrollBound = true;
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

// --- Lightbox simple para gallery ---
(function(){
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if(!img) return;
    const src = img.dataset.large || img.src;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'grid';
    overlay.style.placeItems = 'center';
    overlay.style.background = 'rgba(0,0,0,0.88)';
    overlay.style.zIndex = 9999;
    overlay.style.cursor = 'zoom-out';

    const big = document.createElement('img');
    big.src = src;
    big.style.maxWidth = '92%';
    big.style.maxHeight = '92%';
    big.style.borderRadius = '8px';
    big.style.boxShadow = '0 10px 60px rgba(0,0,0,0.7)';
    overlay.appendChild(big);

    // close on click or ESC
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);

    const escHandler = (ev) => {
      if (ev.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);
  });
})();



// --- efecto de desaparición del hero al hacer scroll ---
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (!hero) return;
  const scrollY = window.scrollY;
  if (scrollY > window.innerHeight * 0.3) hero.classList.add('scrolled');
  else hero.classList.remove('scrolled');
});




// --- MENU HAMBURGUESA MOVIL ---
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Animación de la hamburguesa al abrir/cerrar
hamburger.classList.remove('open'); // inicial

hamburger.addEventListener('click', () => {
  const spans = hamburger.querySelectorAll('span');
  spans[0].classList.toggle('rotate1');
  spans[1].classList.toggle('fade');
  spans[2].classList.toggle('rotate2');
});




