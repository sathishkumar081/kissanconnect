export const render = async () => {
  const { getAgriServices } = await import('store');
  const ferts = getAgriServices().fertilizers || [];
  const cards = ferts.map(f => `
    <div class="service-card">
      <img src="${f.imageUrl}" alt="${f.name}" class="service-card-img">
      <div class="service-card-info">
        <h3>${f.name}</h3>
        <p>${f.description || ''}</p>
        <p><strong>Price:</strong> ${f.price}${f.quantity ? ` • <strong>Stock:</strong> ${f.quantity}` : ''}</p>
        <p style="color:#fff;"><strong>Seller:</strong> ${f.sellerName || '—'}</p>
        <p style="color:#fff;"><small>${f.sellerLocation || ''} • Rating: ${'★'.repeat(Math.round(f.sellerRating||4))}${'☆'.repeat(5-Math.round(f.sellerRating||4))} (${(f.sellerRating||4.5).toFixed(1)})</small></p>
        <a href="#/contact-support" class="btn btn-secondary">Contact Support</a>
      </div>
    </div>
  `).join('');
  return `
    <main>
      <div class="page-header"><h1>Fertilizer Store</h1></div>
      <div class="service-grid">${cards}</div>
    </main>
  `;
};

export const addEventListeners = () => {};

