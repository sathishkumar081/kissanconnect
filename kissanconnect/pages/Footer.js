export const render = () => {
  const user = JSON.parse(sessionStorage.getItem('kissan_market_user') || 'null');
  const isFarmer = user?.role === 'farmer';
  const isCustomer = user?.role === 'customer';
  return `
  <footer class="main-footer">
    <div class="container footer-grid">
      <section class="footer-col">
        <h4 class="footer-h">CONTACT US</h4>
        <ul class="footer-list">
          <li><i class="fa-solid fa-envelope"></i> <a href="mailto:service@kissanconnect.com">service@kissanconnect.com</a></li>
          <li><i class="fa-solid fa-phone"></i> Customer Helpline: <a href="tel:9440617324">9440617324</a></li>
          <li><i class="fa-solid fa-phone"></i> Farmer Helpline: <a href="tel:9440617324">9440617324</a></li>
        </ul>
      </section>
      ${isFarmer ? `
      <section class="footer-col">
        <h4 class="footer-h">FOR FARMERS</h4>
        <ul class="footer-links">
          <li><a href="#/farmer-dashboard/manage-listings">Manage Listings</a></li>
          <li><a href="#/farmer-dashboard/view-orders">View Orders</a></li>
          <li><a href="#/farmer-dashboard/tractor-rentals">Tractor Rentals</a></li>
          <li><a href="#/farmer-dashboard/fertilizer-zone">Fertilizer Zone</a></li>
          <li><a href="#/farmer-dashboard/waste-to-company">Waste to Company</a></li>
          <li><a href="#/farmer-dashboard/earnings-summary">Earnings Summary</a></li>
          <li><a href="#/contact-support">Support</a></li>
        </ul>
      </section>` : ''}
      ${isCustomer ? `
      <section class="footer-col">
        <h4 class="footer-h">FOR CUSTOMERS</h4>
        <ul class="footer-links">
          <li><a href="#/products">Shop Products</a></li>
          <li><a href="#/customer-dashboard">My Orders</a></li>
          <li><a href="#/cart">Cart</a></li>
          <li><a href="#/tractor-rentals">Tractor Rentals</a></li>
          <li><a href="#/fertilizer-store">Fertilizer Zone</a></li>
          <li><a href="#/waste-to-company-info">Waste to Company</a></li>
          <li><a href="#/contact-support">Support</a></li>
        </ul>
      </section>` : ''}
      <section class="footer-col">
        <h4 class="footer-h">EXPLORE</h4>
        <ul class="footer-links">
          <li><a href="#/">About Us</a></li>
          <li><a href="#/">Our Mission</a></li>
          <li><a href="#/">Blog & Articles</a></li>
          <li><a href="#/waste-to-company-info">Waste to Company (Info Page)</a></li>
          <li><a href="#/">Sustainability Initiatives</a></li>
          <li><a href="#/">Careers</a></li>
        </ul>
      </section>
      <section class="footer-col">
        <h4 class="footer-h">QUICK LINKS</h4>
        <ul class="footer-links">
          <li><a href="#/">Terms & Conditions</a></li>
          <li><a href="#/">Privacy Policy</a></li>
          <li><a href="#/">Refund & Cancellation Policy</a></li>
          <li><a href="#/">Help & FAQs</a></li>
          <li><a href="#/contact-support">Contact Us</a></li>
        </ul>
      </section>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} Kissan Connect. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
};