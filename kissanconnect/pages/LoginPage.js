import { navigate } from 'utils';

export const renderInitial = () => `
    <main>
      <div class="login-container">
        <div class="login-box">
          <h1 data-i18n="login.whoAreYou">Who are you?</h1>
          <a href="#/login/farmer" class="btn btn-primary" data-i18n="login.farmer">I am a Farmer</a>
          <a href="#/login/customer" class="btn btn-secondary" data-i18n="login.customer">I am a Customer</a>
          <hr class="login-divider">
          <a href="#/register" class="btn btn-primary" data-i18n="login.create">Create Account</a>
        </div>
      </div>
    </main>
`;

export const renderLogin = (role) => `
    <main>
      <div class="login-container">
        <div class="form-container">
          <h2>${role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
          <form id="login-form" data-role="${role}">
            <div class="form-group">
              <label for="email" data-i18n="login.email">Email</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="password" data-i18n="login.password">Password</label>
              <input type="password" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary" data-i18n="login.submit">Login</button>
            <p id="login-error" class="error-message" style="display: none;"></p>
          </form>
        </div>
      </div>
    </main>
`;

export const addEventListeners = () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const auth = await import('auth');
            const role = e.target.dataset.role;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const success = auth.login(email, password, role);
            if (success) {
                navigate(role === 'farmer' ? '/farmer-dashboard' : '/customer-dashboard');
            } else {
                const errorEl = document.getElementById('login-error');
                errorEl.textContent = 'Invalid credentials. Please try again.';
                errorEl.style.display = 'block';
            }
        });
    }
};