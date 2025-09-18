const animationThreshold = 0.5;

const farmerAgeRange = { min: 22, max: 62 };

const farmerExperienceYears = { min: 1, max: 35 };

const sampleFarmerPoolSize = 12;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr, count = 1) {
    const copy = [...arr];
    const picked = [];
    while (picked.length < count && copy.length) {
        const i = Math.floor(Math.random() * copy.length);
        picked.push(copy.splice(i, 1)[0]);
    }
    return picked;
}

function buildSellerModal() {
    let overlay = document.getElementById('contact-seller-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'contact-seller-overlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="sellerModalTitle">
                <h3 id="sellerModalTitle" data-i18n="seller.title">Seller Details</h3>
                <div id="sellerModalBody"></div>
                <div class="modal-actions">
                    <button id="closeSellerModal" class="btn btn-primary" data-i18n="btn.close">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
        overlay.querySelector('#closeSellerModal').addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }
    return overlay;
}

export const render = async () => {
    const store = await import('store');
    const { getFarmerById } = store;

    // Ensure at least 20 products exist in store (handled via initializeStore updates in store.js)
    const products = store.getProducts();

    const productCards = products.map(product => {
        const farmer = getFarmerById(product.farmerId);
        const rating = farmer?.id === 'farmer1' ? 4.6 : farmer?.id === 'farmer2' ? 4.4 : 4.5;
        return `\n        <div class=\"product-card animate-on-scroll\">\n            <div class=\"product-image-container\">\n                <img src=\"${product.imageUrl}\" alt=\"${product.name}\" class=\"product-image\">\n            </div>\n            <div class=\"product-info\">\n                <h3>${product.name}</h3>\n                <p class=\"product-description\">${product.description}</p>\n                <p class=\"product-price\">₹${product.price} / ${product.unit || 'unit'}</p>\n                <div class=\"product-seller\">\n                  <p style=\"margin:0; color: #ffeb3b; font-weight: bold;\"><strong>Seller:</strong> ${farmer ? farmer.name : '—'}</p>\n                  <p style=\"margin:0; color: #4fc3f7; font-weight: bold;\"><small>Location: ${farmer?.address || '—'} • Rating: ${'★'.repeat(Math.round(rating))}${'☆'.repeat(5-Math.round(rating))} (${rating.toFixed(1)})</small></p>\n                </div>\n                <button class=\"btn btn-primary add-to-cart-btn\" data-product-id=\"${product.id}\">Add to Cart</button>\n                <button class=\"btn btn-secondary contact-seller-btn\" data-product-name=\"${product.name}\">Contact Seller</button>\n            </div>\n        </div>\n        `;
    }).join('');

    return `
        <main>
            <div class="page-header"><h1 data-i18n="products.title">Products</h1></div>
            <div class="product-grid">
                ${productCards}
            </div>
        </main>
    `;
};

export const addEventListeners = async () => {
    const store = await import('store');
    const auth = await import('auth');
    const { navigate } = await import('utils');
    const i18n = await import('i18n');
    const cards = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: animationThreshold
    });

    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 40}ms`;
        observer.observe(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.setAttribute('data-i18n', 'btn.addToCart');
        button.addEventListener('click', (e) => {
            const user = auth.getCurrentUser();
            if (!user || user.role !== 'customer') {
                alert('Please log in as a customer to add items to your cart.');
                navigate('/login/customer');
                return;
            }
            const productId = e.target.dataset.productId;
            store.addToCart(productId);
            const productName = e.target.closest('.product-card').querySelector('h3').textContent;
            alert(`${productName} added to cart!`);
        });
    });

    // Contact Seller modal
    const overlay = buildSellerModal();
    const names = [
        'Ram Singh','Sita Devi','Arjun Kumar','Kiran Patel','Mohit Verma','Priya Nair','Anil Yadav','Meera Joshi','Vikas Sharma','Pooja Rao',
        'Gurpreet Kaur','Rohit Das'
    ].slice(0, sampleFarmerPoolSize);

    const locations = [
        'Punjab','Haryana','Uttar Pradesh','Maharashtra','Gujarat','Rajasthan','Bihar','Madhya Pradesh','Karnataka','Tamil Nadu'
    ];
    const productPool = [
        'Potato','Tomato','Onion','Carrot','Green Beans','Spinach','Cauliflower','Cabbage','Brinjal','Ladyfinger',
        'Rice','Wheat','Sugar','Milk','Eggs','Apples','Bananas','Garlic','Ginger','Chillies'
    ];

    function openSellerModal(productName) {
        const name = pickRandom(names)[0];
        const age = randomInt(farmerAgeRange.min, farmerAgeRange.max);
        const exp = randomInt(farmerExperienceYears.min, farmerExperienceYears.max);
        const location = pickRandom(locations)[0];
        const sells = pickRandom(productPool, randomInt(2, 5)).join(', ');
        const body = overlay.querySelector('#sellerModalBody');
        body.innerHTML = `
            <p><strong data-i18n="seller.name">Name:</strong> ${name}</p>
            <p><strong data-i18n="seller.age">Age:</strong> ${age}</p>
            <p><strong data-i18n="seller.location">Location:</strong> ${location}</p>
            <p><strong data-i18n="seller.experience">Farming Experience:</strong> ${exp} <span data-i18n="seller.years">years</span></p>
            <p><strong data-i18n="seller.products">Products Sold:</strong> ${sells}</p>
            <hr style="margin: 0.75rem 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 0.9rem; color: #666;" data-i18n="seller.notice">
                You are viewing seller details for <strong>${productName}</strong>. Contact information will be provided after order placement.
            </p>
        `;
        overlay.classList.add('active');
        i18n.applyTranslations();
    }

    document.querySelectorAll('.contact-seller-btn').forEach(btn => {
        btn.setAttribute('data-i18n', 'btn.contactSeller');
        btn.addEventListener('click', (e) => {
            const productName = e.currentTarget.dataset.productName;
            openSellerModal(productName);
        });
    });

    // also animate any service/product icons in view
    const icons = document.querySelectorAll('.icon-anim');
    const io = new IntersectionObserver((ents)=>ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in-view'); io.unobserve(en.target);} }),{threshold:0.25});
    icons.forEach(i=>io.observe(i));
};