const heroHeadline = "Kissan Connect – Bridging Farmers and Customers with AgriServices";

const heroTagline = "Empowering Agriculture Through Technology";

const heroSlideIntervalMs = 4500;

const heroSlides = [
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
  "hero-banner.png",
  "asset tractor-1.png",
  "asset drone-1.png",
  "asset fertilizer-1.png"
];

const services = [
  { key: "buy", title: "Buy Fresh Produce", desc: "Browse fresh, local vegetables and fruits at fair prices.", img: "assets/tomato.png", audience: "customer", href: "#/products" },
  { key: "post", title: "Post an Ad", desc: "Farmers can easily list produce and services to reach buyers.", img: "asset join-icon.png", audience: "farmer", href: "#/post-ad" },
  { key: "agri", title: "AgriServices", desc: "Rent tractors & drones. Buy or sell fertilizers.", img: "asset tractor-1.png", audience: "farmer", href: "#/agri-services" },
  { key: "direct", title: "Direct Sales", desc: "Farmer-to-customer trade with transparent pricing.", img: "assets/green-beans.png", audience: "all", href: "#/products" },
  { key: "contactSeller", title: "Contact Seller", desc: "See seller info on product pages to connect.", img: "asset order-icon.png", audience: "all", href: "#/products" },
  { key: "daily", title: "Daily Essentials", desc: "Rice, wheat, sugar, milk, eggs and more.", img: "assets/cabbage.png", audience: "customer", href: "#/products" },
  { key: "fert", title: "Fertilizer Store", desc: "Affordable inputs to boost your yields.", img: "asset fertilizer-1.png", audience: "farmer", href: "#/fertilizer-store" },
  { key: "waste", title: "Waste to Company", desc: "Sell unsold crops at fair prices for sustainable recycling.", img: "assets/spinach.png", audience: "farmer", href: "#/waste-to-company" },
];

const howItWorks = [
  { title: "Sign Up & Login", icon: "asset join-icon.png", desc: "Create an account as Farmer or Customer." },
  { title: "Browse or List", icon: "asset browse-icon.png", desc: "Explore products or post your produce/services." },
  { title: "Connect, Trade & Grow", icon: "asset order-icon.png", desc: "Build networks, trade directly, and scale up." }
];

/* Enhanced testimonials with detailed reviews */
const testimonials = [
  { img: "https://images.unsplash.com/photo-1594007654729-407eedc4be7f?auto=format&fit=crop&w=200&q=60", name: "Balwinder Singh", role: "Farmer", location: "Amritsar, Punjab", rating: 5, text: "Through this platform, I connected with more buyers in my area and sold my crops at better prices. It saved me time and reduced middlemen costs. The direct communication with customers has transformed my farming business. Highly recommend this to every farmer!" },
  { img: "https://images.unsplash.com/photo-1520975922203-b2737d47a40e?auto=format&fit=crop&w=200&q=60", name: "Priya Krishnan", role: "Customer", location: "Chennai, Tamil Nadu", rating: 5, text: "I love buying fresh vegetables directly from farmers through this platform. The quality is exceptional and prices are fair. I can see exactly where my food comes from and support local farmers. The ordering process is simple and delivery is always on time." },
  { img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60", name: "Ramesh Kumar", role: "Farmer", location: "Krishna, Andhra Pradesh", rating: 5, text: "Using Kissan Connect, I was able to sell my fresh vegetables directly to customers in my city. The platform is easy to use, payments are secure, and I get better margins. The AgriServices section helped me rent a tractor quickly during harvest season." },
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60", name: "Lakshmi Devi", role: "Customer", location: "Hyderabad, Telangana", rating: 5, text: "The product variety is amazing and everything is fresh from the farm. I appreciate the transparent pricing and being able to contact sellers directly. This platform has made it so convenient to get quality produce while supporting local agriculture." },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=60", name: "Prakash Rao", role: "Farmer", location: "Nagpur, Maharashtra", rating: 5, text: "Renting agricultural equipment used to be a major hassle. Through AgriServices on this platform, I can quickly find tractors and drones when needed. The booking system is efficient and has helped me complete my fieldwork on schedule every season." },
  { img: "https://images.unsplash.com/photo-1531123414780-f742cb4fba5a?auto=format&fit=crop&w=200&q=60", name: "Neha Sharma", role: "Customer", location: "Jaipur, Rajasthan", rating: 4, text: "I enjoy the clean interface and the consistency in product listings. The unit-based pricing is very clear and seller details give me confidence. It feels safe and personal compared to other shopping platforms. Great support for our farming community." },
  { img: "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=200&q=60", name: "Suresh Menon", role: "Farmer", location: "Kozhikode, Kerala", rating: 5, text: "Posting ads with photos and location details was straightforward. I could list both my produce and services like drone spraying. Direct payments and quick customer responses have made a real difference to my income. This platform truly empowers farmers." },
  { img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=60", name: "Naveen Reddy", role: "Farmer", location: "Nalgonda, Telangana", rating: 4, text: "The ease of connecting with customers and the transparent marketplace has been game-changing for my farming operation. I can showcase my organic methods and build trust with buyers. The customer feedback system helps me improve continuously." }
];

const aboutText = "Kissan Connect is a digital bridge empowering farmers and customers to connect directly. We enable transparent trade, affordable AgriServices, and a thriving marketplace for daily essentials.";

export const render = async () => {
  const auth = await import('auth');
  const user = auth.getCurrentUser();

  return `
    <main>
      <!-- HERO -->
      <section class="hero landing-hero" aria-label="Kissan Connect">
        <div class="hero-background-slider">
          <div class="hero-slide active" style="background-image: url('hero-banner.png')"></div>
          <div class="hero-slide" style="background-image: url('unnamed.jpg')"></div>
          <div class="hero-slide" style="background-image: url('download.webp')"></div>
          <div class="hero-slide" style="background-image: url('asset tractor-1.png')"></div>
          <div class="hero-slide" style="background-image: url('asset drone-1.png')"></div>
          <div class="hero-slide" style="background-image: url('asset fertilizer-1.png')"></div>
        </div>
        <div class="hero-content">
          <h2 style="font-weight:700;margin-bottom:0.25rem;">Welcome to Kissan Connect – Empowering Farmers, Serving Customers</h2>
          <h1 class="landing-headline" data-i18n="home.headline">${heroHeadline}</h1>
          <p class="landing-tagline" data-i18n="home.subtext">${heroTagline}</p>
          <a href="#/contact-support" class="btn btn-primary btn-lg" data-i18n="nav.contact">Contact Support</a>
          <div class="hero-cta landing-cta">
            <a href="#/login/farmer" class="btn btn-secondary btn-lg" data-i18n="cta.joinFarmer">Login as Farmer</a>
            <a href="#/login/customer" class="btn btn-primary btn-lg" data-i18n="cta.shopCustomer">Login as Customer</a>
          </div>
        </div>
        <div class="hero-scrim"></div>
      </section>

      <!-- SERVICES -->
      <section class="services-overview" id="services">
        <div class="page-header">
          <h2 data-i18n="services.title">Our Services</h2>
          <p data-i18n="services.subtitle">Explore everything you can do with Kissan Connect.</p>
        </div>
        <div class="services-grid">
          ${services.map(s => `
            <article class="service-card animate-on-scroll" data-audience="${s.audience}" data-href="${s.href}">
              <div class="service-image-wrap">
                <img src="${s.img}" alt="${s.title}" class="service-image icon-anim" />
              </div>
              <div class="service-info">
                <h3 data-i18n="services.${s.key}.title">${s.title}</h3>
                <p data-i18n="services.${s.key}.desc">${s.desc}</p>
                ${s.audience === 'farmer' ? '<span class="badge badge-farmer" data-i18n="badge.farmersOnly">Farmers Only</span>' : ''}
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="how-it-works landing-hiw">
        <div class="page-header">
          <h2 data-i18n="how.title">How It Works</h2>
        </div>
        <div class="steps-container hiw-steps">
          ${howItWorks.map((step, idx) => `
            <div class="step hiw-step animate-on-scroll">
              <img src="${step.icon}" alt="${step.title}">
              <h3><span>${idx + 1}. </span><span data-i18n="how.step${idx+1}.title">${step.title}</span></h3>
              <p data-i18n="how.step${idx+1}.desc">${step.desc}</p>
            </div>
            ${idx < howItWorks.length - 1 ? `<div class="hiw-arrow">→</div>` : ''}
          `).join('')}
        </div>
      </section>

      <!-- WHY CHOOSE US -->
      <section class="why-choose">
        <div class="page-header">
          <h2 data-i18n="why.title">Why Choose Kissan Connect?</h2>
        </div>
        <ul class="why-list">
          <li data-i18n="why.point1">Fresh farm produce, delivered quickly</li>
          <li data-i18n="why.point2">Direct trade: farmer to customer</li>
          <li data-i18n="why.point3">Affordable AgriServices for every farm</li>
          <li data-i18n="why.point4">Transparent pricing and fair deals</li>
          <li data-i18n="why.point5">Built to support farmers and communities</li>
        </ul>
      </section>

      <!-- ENHANCED TESTIMONIALS -->
      <section class="customer-reviews landing-testimonials">
        <div class="page-header">
          <h2 data-i18n="reviews.title">What Our Users Say</h2>
        </div>
        <div class="reviews-viewport">
          <button class="carousel-arrow left" aria-label="Previous">&#8249;</button>
          <div class="reviews-track">
            ${testimonials.map(t => `
              <div class="review-card animate-on-scroll">
                <img src="${t.img}" alt="${t.name}" class="review-photo" loading="lazy" onerror="this.onerror=null;this.src='assets/default-avatar.png'">
                <div class="review-meta">
                  <h4>${t.name}</h4>
                  <p class="review-role">${t.role} • ${t.location}</p>
                </div>
                <div class="review-stars" aria-label="${t.rating} out of 5 stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                <p class="review-text">"${t.text}"</p>
              </div>
            `).join('')}
          </div>
          <button class="carousel-arrow right" aria-label="Next">&#8250;</button>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="about-kissan">
        <div class="about-inner">
          <h2 data-i18n="about.title">About Kissan Connect</h2>
          <p data-i18n="about.text">${aboutText}</p>
        </div>
      </section>
      <section class="contact-teaser">
        <div class="contact-inner">
          <h3>Waste to Company – Sustainable Support</h3>
          <p>Through our Waste to Company program, farmers never face complete loss. Unsold crops are repurposed into organic fertilizers or supplied to seed manufacturing companies, promoting a sustainable farming cycle.</p>
          <a href="#/waste-to-company-info" class="btn btn-primary">Learn More About Waste to Company</a>
        </div>
      </section>
      <!-- CONTACT TEASER -->
      <section class="contact-teaser">
        <div class="contact-inner">
          <h3 data-i18n="contact.teaserTitle">Need help? We're here for you.</h3>
          <p data-i18n="contact.teaserText">Our support team is available to assist you with any queries.</p>
          <a href="#/contact-support" class="btn btn-primary" data-i18n="nav.contact">Contact Support</a>
        </div>
      </section>
    </main>
  `;
};

export const addEventListeners = async () => {
  // Faster scroll-triggered animation for elements
  const cards = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => observer.observe(c));

  // Services card navigation with audience awareness
  const auth = await import('auth');
  const user = auth.getCurrentUser();
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const audience = card.getAttribute('data-audience');
      const href = card.getAttribute('data-href') || '#/';
      // Only gate farmer-only cards; allow everyone to view customer routes like Products
      if (audience === 'farmer') {
        if (!user || user.role !== 'farmer') {
          window.location.hash = '/login/farmer';
          return;
        }
      }
      window.location.hash = href.replace('#', '');
    });
  });

  // icon scroll-in animations - faster
  const icons = document.querySelectorAll('.icon-anim');
  const io = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } }), { threshold: 0.2 });
  icons.forEach(i => io.observe(i));

  // Reviews slider (auto-advance) - faster
  const track = document.querySelector('.reviews-track');
  if (track) {
    let idx = 0;
    const slides = track.children.length;
    const prev = document.querySelector('.carousel-arrow.left');
    const next = document.querySelector('.carousel-arrow.right');
    const go = (delta) => { idx = (idx + delta + slides) % slides; track.style.transform = `translateX(-${idx * 100}%)`; };
    const timer = setInterval(() => go(1), 4000);
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
  }

  // Hero background slider
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    };
    setInterval(nextSlide, 3000);
  }
};