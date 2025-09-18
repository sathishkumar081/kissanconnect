import { getProducts, getCart, updateCartItemQuantity, removeFromCart, clearCart } from 'store';

const renderCart = () => {
    const cart = getCart();
    const allProducts = getProducts();

    if (cart.length === 0) {
        return `<p data-i18n="cart.empty">Your cart is empty. <a href="#/products" data-i18n="cart.startShopping">Start shopping!</a></p>`;
    }
    
    let total = 0;
    const cartItemsHTML = cart.map(item => {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product) {
            // Product might have been removed by farmer, so we remove from cart
            removeFromCart(item.productId);
            return '';
        };
        const unitPrice = Number(product.price);
        const itemTotal = item.quantity * unitPrice;
        total += itemTotal;

        return `
            <div class="cart-item" data-product-id="${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${product.name}</h4>
                    <p>Price: ₹${unitPrice} / ${product.unit || 'unit'}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="100">
                </div>
                <div class="cart-item-price">
                    <strong>₹${itemTotal.toFixed(2)}</strong>
                </div>
                <div class="cart-item-remove">
                    <button class="btn btn-danger remove-item-btn">&times;</button>
                </div>
            </div>
        `;
    }).filter(Boolean).join('');

    return `
        <div class="cart-items-container">
            ${cartItemsHTML}
        </div>
        <div class="cart-summary">
            <h3><span data-i18n="cart.total">Total:</span> ₹${total.toFixed(2)}</h3>
            <button class="btn btn-primary checkout-btn" data-i18n="cart.checkout">Proceed to Checkout</button>
        </div>
    `;
};


export const render = () => `
    <main>
        <div class="page-header"><h1 data-i18n="dashboard.customer">Customer Dashboard</h1></div>
        
        <div class="dashboard-nav" style="color:#fff; display:flex; gap:0.75rem; flex-wrap:wrap;">
             <a href="#/products" class="btn btn-primary" data-i18n="dashboard.browse">Browse Products</a>
             <a href="#/cart" class="btn btn-secondary" data-i18n="dashboard.cart">View Cart</a>
             <a href="#/orders" class="btn btn-secondary" data-i18n="dashboard.orders">Track Orders</a>
             <a href="#/fertilizer-store" class="btn btn-secondary" data-i18n="dashboard.fertilizer">Fertilizer Store</a>
             <a href="#/tractor-booking" class="btn btn-secondary" data-i18n="dashboard.tractor">Tractor Rentals</a>
             <a href="#/drones" class="btn btn-secondary" data-i18n="dashboard.drones">Drones for Surveying</a>
             <a href="#/purchase-history" class="btn btn-secondary" data-i18n="dashboard.history">Purchase History</a>
        </div>
        
        <h2 data-i18n="dashboard.myOrders">My Orders</h2>
        <p>Your order history will appear here. This feature is coming soon!</p>
        
        <div class="cart-section">
            <h2>🛒 <span data-i18n="cart.title">Your Shopping Cart</span></h2>
            <div id="cart-content">
                ${renderCart()}
            </div>
        </div>
    </main>
`;

export const addEventListeners = () => {
    const cartContent = document.getElementById('cart-content');

    const updateCartView = () => {
        cartContent.innerHTML = renderCart();
        addCartEventListeners(); // Re-attach listeners to new elements
    };

    const addCartEventListeners = () => {
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', e => {
                const productId = e.target.closest('.cart-item').dataset.productId;
                const quantity = parseInt(e.target.value, 10);
                if (quantity > 0) {
                    updateCartItemQuantity(productId, quantity);
                } else {
                    removeFromCart(productId);
                }
                updateCartView();
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', e => {
                const productId = e.target.closest('.cart-item').dataset.productId;
                removeFromCart(productId);
                updateCartView();
            });
        });
        
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.setAttribute('data-i18n', 'cart.checkout');
            checkoutBtn.addEventListener('click', () => {
                alert('Checkout feature coming soon!');
                clearCart();
                updateCartView();
            });
        }
    };

    addCartEventListeners();
    
    // Listen for cart updates from other pages
    window.addEventListener('cart-updated', updateCartView);
};