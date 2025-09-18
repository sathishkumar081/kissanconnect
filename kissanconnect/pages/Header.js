import { logout } from 'auth';
import { navigate } from 'utils';
import { getCart } from 'store';

const defaultLanguage = 'en';

const renderLanguageSelector = () => {
    const saved = localStorage.getItem('kissan_lang') || defaultLanguage;
    return `
        <select id="lang-select" aria-label="Language selector" style="margin-left: 1rem; padding: 0.4rem; border-radius: 6px; border: 1px solid #ddd;">
            <option value="en" ${saved === 'en' ? 'selected' : ''}>English</option>
            <option value="hi" ${saved === 'hi' ? 'selected' : ''}>हिंदी</option>
            <option value="te" ${saved === 'te' ? 'selected' : ''}>తెలుగు</option>
            <option value="ta" ${saved === 'ta' ? 'selected' : ''}>தமிழ்</option>
        </select>
    `;
};

const renderCartIcon = (user) => {
    if (user && user.role === 'customer') {
        const cart = getCart();
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        return `
            <a href="#/cart" class="cart-icon" title="View Cart" aria-label="View Cart">
                <span class="cart-emoji" aria-hidden="true">🛒</span>
                ${itemCount > 0 ? `<span class="cart-count">${itemCount}</span>` : ''}
            </a>
        `;
    }
    return '';
}

export const render = (user) => {
    const isFarmer = user && user.role === 'farmer';
    const isCustomer = user && user.role === 'customer';

    const navLinks = `
        <li><a href="#/" class="nav-link">Home</a></li>
        ${isCustomer ? '<li><a href="#/products" class="nav-link">Products</a></li>' : ''}
        ${isFarmer ? '<li><a href="#/agri-services" class="nav-link">Agri Services</a></li>' : ''}
        <li><a href="#/contact-support" class="nav-link" data-i18n="nav.contact">Contact Support</a></li>
    `;

    const actionButton = isFarmer
        ? `<a href="#/post-ad" class="btn btn-secondary">Post an Ad</a>`
        : isCustomer
        ? `<a href="#/products" class="btn btn-primary">Shop Now</a>`
        : '';

    const authButtons = user
        ? `
            <div class="nav-buttons">
                ${isCustomer ? renderCartIcon(user) : ''}
                ${actionButton}
                <a href="${isFarmer ? '#/farmer-dashboard' : '#/customer-dashboard'}" class="btn btn-primary">Dashboard</a>
                <button id="logout-btn" class="btn btn-danger">Logout</button>
            </div>
          `
        : `<div class="nav-buttons">
             <a href="#/login" class="btn btn-primary">Login</a>
           </div>`;

    return `
        <div class="top-contact-bar">
            <div class="container">
                <div class="contact-item"><i class="fa-solid fa-envelope"></i> <a href="mailto:service@kissanconnect.com">service@kissanconnect.com</a></div>
                <div class="contact-item"><i class="fa-solid fa-headset"></i> Farmer Helpline: <a href="tel:9440617324">9440617324</a></div>
                <div class="contact-item"><i class="fa-solid fa-headset"></i> Customer Helpline: <a href="tel:9440617324">9440617324</a></div>
            </div>
        </div>
        <header class="main-header">
            <div class="container">
                <a href="#/" class="logo">Kissan<span>Connect</span></a>
                <nav class="main-nav">
                    <ul>${navLinks}</ul>
                </nav>
                ${authButtons}
                ${renderLanguageSelector()}
                <button class="hamburger" id="hamburger-btn">☰</button>
            </div>
        </header>
    `;
};

export const addHeaderListeners = () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            navigate('/'); // redirect to homepage after logout
        });
    }

    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            const activeNav = document.querySelector('.main-nav');
            if (activeNav) {
                activeNav.classList.toggle('active');
            }
        });
    }
    
    // Update cart count when cart changes
    window.addEventListener('cart-updated', () => {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            const cart = getCart();
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            let badge = cartIcon.querySelector('.cart-count');
            if (itemCount > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-count';
                    cartIcon.appendChild(badge);
                }
                badge.textContent = itemCount;
            } else if (badge) {
                badge.remove();
            }
            cartIcon.classList.add('pulse','shake');
            setTimeout(()=>{ cartIcon.classList.remove('pulse','shake'); }, 700);
        }
    });

    // Language selector
    const select = document.getElementById('lang-select');
    if (select) {
        select.addEventListener('change', async () => {
            const i18n = await import('i18n');
            localStorage.setItem('kissan_lang', select.value);
            await i18n.setLocale(select.value);
            i18n.applyTranslations();
            window.dispatchEvent(new Event('language-changed'));
        });
        (async () => { const i18n = await import('i18n'); await i18n.setLocale(select.value); i18n.applyTranslations(); })();
    }
};