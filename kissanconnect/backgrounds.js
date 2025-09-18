// --- Enhanced Thematic Background Image Collections ---
import { 
  HOME_BG, 
  LOGIN_BG, 
  FARMER_DASH_BG, 
  CUSTOMER_DASH_BG, 
  AGRI_BG, 
  PRODUCTS_BG, 
  CART_BG, 
  ABOUT_BG, 
  CONTACT_BG, 
  MANAGE_LISTINGS_BG, 
  VIEW_ORDERS_BG, 
  EARNINGS_BG, 
  WASTE_TO_COMPANY_BG 
} from './assets/backgrounds.js';

const bgImages = {
  '/': HOME_BG,
  '/login': LOGIN_BG,
  '/register': LOGIN_BG,
  '/farmer-dashboard': FARMER_DASH_BG,
  '/farmer-dashboard/manage-listings': MANAGE_LISTINGS_BG,
  '/farmer-dashboard/view-orders': VIEW_ORDERS_BG,
  '/farmer-dashboard/earnings-summary': EARNINGS_BG,
  '/farmer-dashboard/waste-to-company': WASTE_TO_COMPANY_BG,
  '/customer-dashboard': CUSTOMER_DASH_BG,
  '/agri-services': AGRI_BG,
  '/fertilizer-store': AGRI_BG,
  '/products': PRODUCTS_BG,
  '/cart': CART_BG,
  '/about': ABOUT_BG,
  '/contact': CONTACT_BG,
  '/contact-support': CONTACT_BG
};

// --- Background Rotator Component Logic ---
let state = {
  timer: null,
  currentIndex: 0,
  preloader: new Image(),
  bgElement: null,
  layers: [],
  currentPath: null,
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

function ensureBgElement() {
  if (state.bgElement) return;
  state.bgElement = document.createElement('div');
  state.bgElement.className = 'global-bg';
  state.bgElement.innerHTML = `<div class="bg-layer active"></div><div class="bg-layer"></div><div class="bg-scrim"></div><div class="bg-particles" aria-hidden="true"></div>`;
  document.body.prepend(state.bgElement);
  state.layers = Array.from(state.bgElement.querySelectorAll('.bg-layer'));
}

function stopSlideshow() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function crossfade(images, fadeMs) {
  const [a, b] = state.layers;
  const activeLayer = a.classList.contains('active') ? a : b;
  const nextLayer = activeLayer === a ? b : a;

  // Preload next image before showing it
  const nextIndex = (state.currentIndex + 1) % images.length;
  state.preloader.src = images[nextIndex];

  // Set the next image and transition
  nextLayer.style.backgroundImage = `url("${images[state.currentIndex]}")`;
  nextLayer.classList.add('fade-in');
  nextLayer.classList.add('active');
  activeLayer.classList.remove('active');
  
  // Clean up animation class after it finishes
  setTimeout(() => nextLayer.classList.remove('fade-in'), fadeMs);
}

function startSlideshow({ images, intervalMs = 2500, fadeMs = 700 }) {
  stopSlideshow(); 
  ensureBgElement();

  if (state.prefersReducedMotion) {
    state.layers[0].style.backgroundImage = `url("${images[0]}")`;
    state.layers[0].classList.add('active');
    state.layers[1].classList.remove('active');
    return;
  }

  // Set initial image to avoid any blank state
  state.layers[0].style.backgroundImage = `url("${images[0]}")`;
  state.layers[0].classList.add('active');
  state.layers[1].classList.remove('active');
  state.currentIndex = (images.length > 1) ? 1 : 0;
  state.preloader.src = images[state.currentIndex];

  const run = () => {
    crossfade(images, fadeMs);
    state.currentIndex = (state.currentIndex + 1) % images.length;
  };

  state.timer = setInterval(run, intervalMs);
}

export function BackgroundRotator({ images, intervalMs = 2500, fadeMs = 700 } = {}) {
  ensureBgElement();
  startSlideshow({ images, intervalMs, fadeMs });
  return { destroy: stopSlideshow };
}

export function setBackgroundFor(path) {
  // Normalize paths for matching
  const routeKey = Object.keys(bgImages).find(p => path.startsWith(p) && p !== '/') || '/';

  // Only restart slideshow if the image set is different
  if (state.currentPath === routeKey) return;

  state.currentPath = routeKey;
  state.currentIndex = 0;

  const images = bgImages[routeKey] || HOME_BG;
  BackgroundRotator({ images, intervalMs: 2500, fadeMs: 700 });

  // Home-only particles toggle
  ensureBgElement();
  const particles = state.bgElement.querySelector('.bg-particles');
  if (routeKey === '/') {
    particles.classList.add('visible');
    if (!particles.dataset.spawned) {
      particles.dataset.spawned = '1';
      for (let i = 0; i < 24; i++) {
        const s = document.createElement('span');
        s.className = 'particle';
        s.style.left = `${Math.random()*100}%`;
        s.style.animationDelay = `${Math.random()*6}s`;
        s.style.animationDuration = `${8 + Math.random()*8}s`;
        s.style.opacity = `${0.15 + Math.random()*0.25}`;
        s.style.transform = `scale(${0.6 + Math.random()*0.8})`;
        particles.appendChild(s);
      }
    }
  } else {
    particles.classList.remove('visible');
  }
}