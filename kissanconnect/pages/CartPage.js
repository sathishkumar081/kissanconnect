export const render = async () => {
  const { getProducts, getCart, updateCartItemQuantity, removeFromCart, clearCart } = await import('store');
  const products = getProducts();
  const cart = getCart();
  let total = 0;
  const items = cart.map(item => {
    const p = products.find(x => x.id === item.productId);
    if (!p) return '';
    const itemTotal = Number(p.price) * item.quantity; total += itemTotal;
    return `
      <div class="cart-item" data-product-id="${p.id}">
        <img src="${p.imageUrl}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-info"><h4>${p.name}</h4><p>Price: ₹${p.price} / ${p.unit||'unit'}</p></div>
        <div class="cart-item-quantity"><input type="number" class="quantity-input" value="${item.quantity}" min="1"></div>
        <div class="cart-item-price"><strong>₹${itemTotal.toFixed(2)}</strong></div>
        <div class="cart-item-remove"><button class="btn btn-danger remove-item-btn">&times;</button></div>
      </div>`;
  }).join('') || `<p data-i18n="cart.empty">Your cart is empty. <a href="#/products" data-i18n="cart.startShopping">Start shopping!</a></p>`;
  return `
    <main>
      <div class="page-header"><h1 data-i18n="cart.title">Your Shopping Cart</h1></div>
      <div class="cart-section">
        <div id="cart-items">${items}</div>
        <div class="cart-summary"><h3><span data-i18n="cart.total">Total:</span> ₹${total.toFixed(2)}</h3>
          <button class="btn btn-primary checkout-btn" data-i18n="cart.checkout">Proceed to Checkout</button>
        </div>
      </div>
    </main>`;
};
export const addEventListeners = async () => {
  const { updateCartItemQuantity, removeFromCart, clearCart } = await import('store');
  const refresh = async () => { (await import('router')).handleRouteChange(); };
  document.querySelectorAll('.quantity-input').forEach(inp=>{
    inp.addEventListener('change', e=>{ const id=e.target.closest('.cart-item').dataset.productId; updateCartItemQuantity(id, parseInt(e.target.value,10)||1); refresh(); });
  });
  document.querySelectorAll('.remove-item-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{ const id=e.target.closest('.cart-item').dataset.productId; removeFromCart(id); refresh(); });
  });
  document.querySelector('.checkout-btn')?.addEventListener('click', ()=>{ alert('Checkout feature coming soon!'); clearCart(); refresh(); });
};

