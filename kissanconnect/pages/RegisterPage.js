import { navigate } from 'utils';

export const render = () => `
    <main>
      <div class="login-container">
        <div class="form-container">
          <h2>Create New Account</h2>
          <form id="register-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" required>
            </div>
             <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" minlength="6" required>
            </div>
             <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" required>
            </div>
            <div class="form-group">
              <label>Register as a:</label>
              <div class="radio-group">
                  <label>
                      <input type="radio" name="role" value="customer" checked required> Customer
                  </label>
                  <label>
                      <input type="radio" name="role" value="farmer" required> Farmer
                  </label>
              </div>
            </div>
            <div class="form-group" id="delivery-address-group" style="display: none;">
              <label for="delivery-address">Delivery/Farm Address</label>
              <textarea id="delivery-address" placeholder="Enter your full address. This will be used for deliveries and pickups."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <p id="register-error" class="error-message" style="display: none;"></p>
          </form>
           <p style="text-align: center; margin-top: 1.5rem;">
                Already have an account? <a href="#/login">Login here</a>.
            </p>
        </div>
      </div>
    </main>
`;

export const addEventListeners = () => {
    const registerForm = document.getElementById('register-form');
    const deliveryAddressGroup = document.getElementById('delivery-address-group');
    const roleRadios = document.querySelectorAll('input[name="role"]');

    const toggleAddressField = () => {
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        if (selectedRole === 'farmer') {
            deliveryAddressGroup.style.display = 'block';
            document.getElementById('delivery-address').required = true;
        } else {
            deliveryAddressGroup.style.display = 'none';
            document.getElementById('delivery-address').required = false;
        }
    };

    roleRadios.forEach(radio => radio.addEventListener('change', toggleAddressField));
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const store = await import('store');
            const role = document.querySelector('input[name="role"]:checked').value;
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                phone: document.getElementById('phone').value,
                role: role,
                address: role === 'farmer' ? document.getElementById('delivery-address').value : ''
            };

            const success = store.addUser(userData);
            
            if (success) {
                alert('Registration successful! Please login.');
                navigate(`/login/${userData.role}`);
            } else {
                const errorEl = document.getElementById('register-error');
                errorEl.textContent = 'An account with this email already exists.';
                errorEl.style.display = 'block';
            }
        });
    }

    // Initial check
    toggleAddressField();
};