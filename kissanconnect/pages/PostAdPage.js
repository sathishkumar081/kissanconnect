import { getCurrentUser } from 'auth';
import { navigate } from 'utils';

export const render = async (productId = null) => {
    const store = await import('store');
    let product = { name: '', price: '', description: '', imageUrl: '', unit: '', category: 'crop', quantity: '', location: '' };
    let title = 'Post a New Ad';

    if (productId) {
        const products = store.getProducts();
        product = products.find(p => p.id === productId);
        title = 'Edit Your Ad';
    }

    return `
      <main>
        <div class="form-container" style="max-width: 720px; margin: 2rem auto; padding: 2rem; background-color: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
          <h2 style="color: #fff; font-weight: bold; text-align: center; margin-bottom: 1.5rem;">${title}</h2>
          <form id="post-ad-form" data-product-id="${productId || ''}">
            <div class="form-group">
                <label for="ad-category" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Category</label>
                <select id="ad-category" required style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
                    <option value="crop" selected>Crop / Produce</option>
                    <option value="equipment">Equipment</option>
                    <option value="agriservice">AgriService (Rental)</option>
                </select>
            </div>
            <div class="form-group">
              <label for="product-name" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Product/Service Name</label>
              <input id="product-name" type="text" placeholder="e.g., Tomato / Tractor Rental / Drone Spray" required value="${product.name}" style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
            </div>
            <div class="form-group">
              <label for="product-quantity" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Quantity</label>
              <input id="product-quantity" type="text" placeholder="e.g., 200 (leave blank for rentals)" style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
            </div>
            <div class="form-group">
              <label for="product-unit" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Unit</label>
              <select id="product-unit" required style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
                <option value="">Select unit...</option>
                <option value="kg">kg</option>
                <option value="quintal">quintal</option>
                <option value="liter">liter</option>
                <option value="day">per day</option>
                <option value="dozen">dozen</option>
                <option value="bag">bag</option>
                <option value="unit">unit</option>
              </select>
            </div>
            <div class="form-group">
              <label for="product-price" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Price per unit</label>
              <input type="number" id="product-price" placeholder="e.g., 20" required style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
            </div>
            <div class="form-group">
              <label for="service-type" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Service Type (for rentals)</label>
              <select id="service-type" style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
                <option value="">Select...</option>
                <option value="tractor">Tractor</option>
                <option value="drone">Drone</option>
              </select>
            </div>
            <div class="form-group">
              <label for="state-select" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Location</label>
              <select id="state-select" required style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
                <option value="">Select State/UT...</option>
                <option>Andhra Pradesh</option><option>Arunachal Pradesh</option><option>Assam</option><option>Bihar</option>
                <option>Chhattisgarh</option><option>Goa</option><option>Gujarat</option><option>Haryana</option>
                <option>Himachal Pradesh</option><option>Jharkhand</option><option>Karnataka</option><option>Kerala</option>
                <option>Madhya Pradesh</option><option>Maharashtra</option><option>Manipur</option><option>Meghalaya</option>
                <option>Mizoram</option><option>Nagaland</option><option>Odisha</option><option>Punjab</option>
                <option>Rajasthan</option><option>Sikkim</option><option>Tamil Nadu</option><option>Telangana</option>
                <option>Tripura</option><option>Uttar Pradesh</option><option>Uttarakhand</option><option>West Bengal</option>
                <option>Andaman and Nicobar Islands</option><option>Chandigarh</option><option>Dadra and Nagar Haveli and Daman and Diu</option>
                <option>Delhi</option><option>Jammu and Kashmir</option><option>Ladakh</option><option>Lakshadweep</option><option>Puducherry</option>
              </select>
              <input id="district-input" type="text" placeholder="District / City (optional)" style="margin-top:0.5rem; background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
              <button type="button" id="detect-gps" class="btn btn-secondary" style="margin-top:0.5rem; width: 100%; font-size: 1.1rem; padding: 1rem;">Auto-detect GPS</button>
            </div>
            <div class="form-group">
              <label for="images" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Upload Images</label>
              <input type="file" id="images" accept="image/*" multiple style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;">
            </div>
            <div class="form-group">
              <label for="product-description" style="color: #fff; font-weight: bold; display: block; margin-bottom: 0.5rem;">Short Description</label>
              <textarea id="product-description" placeholder="e.g., Fresh organic tomatoes / 50HP tractor with plough" style="background-color: rgba(255,255,255,0.9); color: #000; font-weight: bold; padding: 0.75rem; border: none; border-radius: 6px; width: 100%;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem; font-size: 1.1rem; padding: 1rem;">${productId ? 'Update Ad' : 'Post Ad'}</button>
          </form>
        </div>
      </main>
    `;
};

export const addEventListeners = () => {
    const postAdForm = document.getElementById('post-ad-form');
    if (!postAdForm) return;
    const gpsBtn = document.getElementById('detect-gps');
    if (gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            navigator.geolocation?.getCurrentPosition(pos => {
                gpsBtn.textContent = `Detected: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;
                gpsBtn.dataset.coords = `${pos.coords.latitude},${pos.coords.longitude}`;
            }, () => { gpsBtn.textContent = 'GPS unavailable'; });
        });
    }
    postAdForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const store = await import('store');
        const user = (await import('auth')).getCurrentUser();
        const name = document.getElementById('product-name').value.trim();
        const category = document.getElementById('ad-category').value;
        const quantity = document.getElementById('product-quantity').value.trim();
        const unit = document.getElementById('product-unit').value || 'unit';
        const price = document.getElementById('product-price').value;
        const desc = document.getElementById('product-description').value.trim();
        const state = document.getElementById('state-select').value;
        const district = document.getElementById('district-input').value.trim();
        const coords = document.getElementById('detect-gps')?.dataset.coords || '';
        const serviceType = document.getElementById('service-type').value;
        const files = Array.from(document.getElementById('images').files || []);
        let imageUrls = [];
        for (const file of files) {
            try { const url = await websim.upload(file); imageUrls.push(url); } catch(e) {}
        }
        const primaryImage = imageUrls[0] || (category === 'agriservice' || category === 'equipment'
            ? (serviceType === 'drone' ? 'asset drone-1.png' : 'asset tractor-1.png')
            : `assets/${name.toLowerCase().replace(/\s+/g,'-')}.png`);
        const location = [district, state].filter(Boolean).join(', ') || coords || '—';
        if (category === 'crop') {
            store.addProduct({ name, price, unit, description: desc, imageUrl: primaryImage, images: imageUrls, quantity, location, farmerId: user.id });
            (await import('utils')).navigate('/farmer-dashboard');
        } else {
            const kind = serviceType === 'drone' ? 'drone' : 'tractor';
            store.addAgriService(kind, { name, type: serviceType || undefined, price: `₹${price}/${unit}`, availability: 'Available', location, imageUrl: primaryImage, images: imageUrls, ownerId: user.id, description: desc, quantity });
            (await import('utils')).navigate('/agri-services');
        }
    });
};