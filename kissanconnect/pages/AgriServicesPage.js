import { getAgriServices, getFarmerById } from 'store';

const renderServiceCard = (service, type) => {
    const farmer = getFarmerById(service.ownerId || service.sellerId);
    const img = (service.images && service.images[0]) || service.imageUrl;
    return `
    <div class="service-card">
        <img src="${img}" alt="${service.name}" class="service-card-img">
        <div class="service-card-info">
            <h3>${service.name}</h3>
            ${service.type ? `<p>Type: ${service.type}</p>` : ''}
            ${service.description ? `<p>${service.description}</p>` : ''}
            <p>Price: ${service.price}</p>
            ${service.location ? `<p>Location: ${service.location}</p>` : ''}
            ${service.quantity ? `<p>Available: ${service.quantity}</p>` : ''}
            <p>Seller: ${farmer ? farmer.name : 'Unknown'}</p>
            <button class="btn btn-primary contact-owner-btn">Contact Owner</button>
        </div>
    </div>
`};

export const render = () => {
    const services = getAgriServices();

    return `
        <main>
            <div class="page-header"><h1>Agricultural Services</h1></div>

            <nav class="services-nav">
                <button class="btn service-tab-btn active" data-tab="tractors">Rent Tractors</button>
                <button class="btn service-tab-btn" data-tab="drones">Rent Drones</button>
                <button class="btn service-tab-btn" data-tab="fertilizers">Fertilizer Marketplace</button>
            </nav>

            <div id="tractors" class="service-content active">
                <h2>Tractors for Rent</h2>
                <div class="service-grid">
                    ${services.tractors.map(s => renderServiceCard(s, 'tractor')).join('')}
                </div>
            </div>

            <div id="drones" class="service-content">
                <h2>Drones for Rent</h2>
                 <div class="service-grid">
                    ${services.drones.map(s => renderServiceCard(s, 'drone')).join('')}
                </div>
            </div>

            <div id="fertilizers" class="service-content">
                <h2>Fertilizer Marketplace</h2>
                <nav class="services-nav" style="border: 0; margin-top: 0;">
                    <button class="btn service-tab-btn sub active" data-tab="fert-buy">Buy Fertilizers</button>
                    <button class="btn service-tab-btn sub" data-tab="fert-sell">Sell Fertilizers</button>
                </nav>
                <div id="fert-buy" class="service-content active">
                    <div class="service-grid">
                        ${services.fertilizers.map(s => renderServiceCard(s, 'fertilizer')).join('')}
                    </div>
                </div>
                <div id="fert-sell" class="service-content">
                    <p style="text-align: center; margin-top: 2rem;">"Sell Fertilizers" section coming soon!</p>
                </div>
            </div>
        </main>
    `;
};

export const addEventListeners = () => {
    const tabs = document.querySelectorAll('.service-tab-btn:not(.sub)');
    const contents = document.querySelectorAll('.service-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.dataset.tab;
            contents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else if (!content.closest('#fertilizers')) {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Sub-tabs inside fertilizers
    const subTabs = document.querySelectorAll('.service-tab-btn.sub');
    const subContents = document.querySelectorAll('#fertilizers .service-content');

    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            subTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;
            subContents.forEach(c => {
                if (c.id === target) c.classList.add('active');
                else c.classList.remove('active');
            });
        });
    });

    document.querySelectorAll('.contact-owner-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('Contact feature coming soon!');
        });
    });
    const path = (location.hash.replace('#','')||'/');
    if (path.includes('tractor-rentals')) document.querySelector('[data-tab="tractors"]')?.click();
    if (path.includes('drone-services')) document.querySelector('[data-tab="drones"]')?.click();
};