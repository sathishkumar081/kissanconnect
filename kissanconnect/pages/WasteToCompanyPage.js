import { getCurrentUser } from 'auth';

export const render = async () => {
    const store = await import('store');
    const user = getCurrentUser();
    const products = store.getProductsByFarmer(user.id);
    const w2cRecords = store.getWasteToCompanyRecords(user.id);
    const totalW2CEarnings = w2cRecords.reduce((sum, record) => sum + record.buyback, 0);
    
    const navigate = (path) => { window.location.hash = path; };

    const unsoldProducts = products.filter(p => p.quantity && parseInt(p.quantity) > 0).map(p => `
        <div class="product-card" style="background: rgba(255,255,255,0.95); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${p.imageUrl || 'assets/default-product.png'}" alt="${p.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #2a9d8f;">${p.name}</h4>
                    <p style="margin: 0; color: #666;">Current Price: ₹${p.price} / ${p.unit}</p>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">Available: ${p.quantity} ${p.unit}</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #e76f51;">Buyback: ₹${Math.round(p.price * 0.75)}</p>
                    <p style="margin: 0; font-size: 0.8rem; color: #888;">(75% of selling price)</p>
                    <button class="btn btn-warning mark-unsold-btn" data-product-id="${p.id}" data-product-name="${p.name}" data-buyback="${Math.round(p.price * 0.75)}" style="margin-top: 0.5rem;">
                        <i class="fas fa-recycle"></i> Sell to Company
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const transactionHistory = w2cRecords.slice().reverse().map(record => `
        <div style="display: flex; justify-content: between; align-items: center; padding: 1rem; border-bottom: 1px solid #eee;">
            <div>
                <p style="margin: 0; font-weight: bold; color: #333;">${record.name}</p>
                <p style="margin: 0; font-size: 0.9rem; color: #666;">${new Date(record.at).toLocaleDateString()} at ${new Date(record.at).toLocaleTimeString()}</p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; font-weight: bold; color: #e76f51;">₹${record.buyback}</p>
                <p style="margin: 0; font-size: 0.8rem; color: #888;">Original: ₹${record.originalPrice}</p>
            </div>
        </div>
    `).join('');

    return `
        <main>
            <div class="page-header">
                <h1 style="color: white;"><i class="fas fa-recycle"></i> Waste to Company</h1>
            </div>
            
            <div class="w2c-info" style="background: linear-gradient(135deg, #2a9d8f, #3742fa); color: white; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <i class="fas fa-leaf" style="font-size: 3rem;"></i>
                    <div>
                        <h2 style="margin: 0; color: white;">Sustainable Agriculture Support</h2>
                        <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Convert your unsold produce into guaranteed income while supporting sustainability</p>
                    </div>
                </div>
                <p style="margin: 1rem 0 0 0; line-height: 1.6;">
                    <strong>How it works:</strong> We purchase your unsold crops at 75% of the market price and repurpose them into organic fertilizers or supply them to seed manufacturing companies. This ensures no farmer faces total loss while contributing to a circular agricultural economy.
                </p>
            </div>
            
            <div class="earnings-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <i class="fas fa-coins" style="font-size: 2.5rem; color: #e76f51; margin-bottom: 1rem;"></i>
                    <h3 style="color: #e76f51; margin: 0 0 0.5rem 0;">Total W2C Earnings</h3>
                    <p style="font-size: 2rem; font-weight: bold; color: #e76f51; margin: 0;">₹${totalW2CEarnings.toLocaleString()}</p>
                </div>
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <i class="fas fa-handshake" style="font-size: 2.5rem; color: #2a9d8f; margin-bottom: 1rem;"></i>
                    <h3 style="color: #2a9d8f; margin: 0 0 0.5rem 0;">Products Helped</h3>
                    <p style="font-size: 2rem; font-weight: bold; color: #2a9d8f; margin: 0;">${w2cRecords.length}</p>
                </div>
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <i class="fas fa-seedling" style="font-size: 2.5rem; color: #00b894; margin-bottom: 1rem;"></i>
                    <h3 style="color: #00b894; margin: 0 0 0.5rem 0;">Environmental Impact</h3>
                    <p style="font-size: 1.2rem; font-weight: bold; color: #00b894; margin: 0;">Zero Waste</p>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.95); padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="color: #333; margin: 0 0 1.5rem 0;"><i class="fas fa-box"></i> Mark Products as Unsold</h3>
                ${products.length > 0 ? `
                    ${unsoldProducts.length > 0 ? unsoldProducts : `
                        <div style="text-align: center; padding: 2rem; color: #666;">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: #00b894; margin-bottom: 1rem;"></i>
                            <p>All your products are currently listed for sale.</p>
                            <p style="font-size: 0.9rem;">Products will appear here when you have items to mark as unsold.</p>
                        </div>
                    `}
                ` : `
                    <div style="text-align: center; padding: 2rem; color: #666;">
                        <i class="fas fa-plus-circle" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                        <p>No products listed yet.</p>
                        <a href="#/post-ad" class="btn btn-primary">Add Your First Product</a>
                    </div>
                `}
            </div>
            
            <div style="background: rgba(255,255,255,0.95); padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h3 style="color: #333; margin: 0 0 1.5rem 0;"><i class="fas fa-history"></i> Transaction History</h3>
                ${w2cRecords.length > 0 ? `
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${transactionHistory}
                    </div>
                ` : `
                    <div style="text-align: center; padding: 2rem; color: #666;">
                        <i class="fas fa-receipt" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                        <p>No transactions yet.</p>
                        <p style="font-size: 0.9rem;">Your Waste to Company transactions will appear here.</p>
                    </div>
                `}
            </div>
        </main>
    `;
};

export const addEventListeners = () => {
    document.querySelectorAll('.mark-unsold-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = e.target.closest('button').dataset.productId;
            const productName = e.target.closest('button').dataset.productName;
            const buyback = e.target.closest('button').dataset.buyback;
            
            if (confirm(`Are you sure you want to sell your unsold "${productName}" to the company for ₹${buyback}?`)) {
                const store = await import('store');
                const actualBuyback = store.markProductUnsold(productId, 0.75);
                if (actualBuyback != null) {
                    alert(`Success! Your unsold ${productName} has been bought under Waste to Company for ₹${actualBuyback}. The amount has been added to your earnings.`);
                    (await import('router')).handleRouteChange();
                }
            }
        });
    });
};