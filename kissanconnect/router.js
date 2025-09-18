import { getCurrentUser } from 'auth';
import { navigate } from 'utils';

// Import page components
import { render as renderHeader, addHeaderListeners } from 'pages/Header';
import { render as renderFooter } from 'pages/Footer';
import * as HomePage from 'pages/HomePage';
import * as LoginPage from 'pages/LoginPage';
import * as RegisterPage from 'pages/RegisterPage';
import * as ProductsPage from 'pages/ProductsPage';
import * as ContactPage from 'pages/ContactPage';
import * as FarmerDashboardPage from 'pages/FarmerDashboardPage';
import * as CustomerDashboardPage from 'pages/CustomerDashboardPage';
import * as PostAdPage from 'pages/PostAdPage';
import * as AgriServicesPage from 'pages/AgriServicesPage';
import * as NotFoundPage from 'pages/NotFoundPage';
import * as ContactSupportPage from 'pages/ContactSupportPage';
import * as FertilizerStorePage from 'pages/FertilizerStorePage';
import * as CartPage from './pages/CartPage.js';
import { setBackgroundFor } from './backgrounds.js';
import * as ManageListingsPage from 'pages/ManageListingsPage';
import * as ViewOrdersPage from 'pages/ViewOrdersPage';
import * as EarningsSummaryPage from 'pages/EarningsSummaryPage';
import * as WasteToCompanyPage from 'pages/WasteToCompanyPage';
import * as WasteToCompanyInfoPage from 'pages/WasteToCompanyInfoPage';

const app = document.getElementById('app');
let activeNav = null; // For mobile nav

// --- ROUTER LOGIC ---

const routes = {
    '/': { render: HomePage.render, addEventListeners: HomePage.addEventListeners, auth: 'any' },
    '/login': { render: LoginPage.renderInitial, auth: false },
    '/login/farmer': { render: () => LoginPage.renderLogin('farmer'), addEventListeners: LoginPage.addEventListeners, auth: false },
    '/login/customer': { render: () => LoginPage.renderLogin('customer'), addEventListeners: LoginPage.addEventListeners, auth: false },
    '/register': { render: RegisterPage.render, addEventListeners: RegisterPage.addEventListeners, auth: false },
    '/products': { render: ProductsPage.render, addEventListeners: ProductsPage.addEventListeners, auth: 'any' },
    '/contact': { render: ContactPage.render, addEventListeners: ContactPage.addEventListeners, auth: 'any' },
    '/contact-support': { render: ContactSupportPage.render, addEventListeners: ContactSupportPage.addEventListeners, auth: 'any' },
    '/agri-services': { render: AgriServicesPage.render, addEventListeners: AgriServicesPage.addEventListeners, auth: 'farmer' },
    '/fertilizer-store': { render: FertilizerStorePage.render, addEventListeners: FertilizerStorePage.addEventListeners, auth: 'any' },
    '/cart': { render: CartPage.render, addEventListeners: CartPage.addEventListeners, auth: 'customer' },
    '/tractor-rentals': { render: AgriServicesPage.render, addEventListeners: AgriServicesPage.addEventListeners, auth: 'any' },
    '/drone-services': { render: AgriServicesPage.render, addEventListeners: AgriServicesPage.addEventListeners, auth: 'any' },
    '/farmer-dashboard': { render: FarmerDashboardPage.render, addEventListeners: FarmerDashboardPage.addEventListeners, auth: 'farmer' },
    '/customer-dashboard': { render: CustomerDashboardPage.render, addEventListeners: CustomerDashboardPage.addEventListeners, auth: 'customer' },
    '/post-ad': { render: () => PostAdPage.render(), addEventListeners: PostAdPage.addEventListeners, auth: 'farmer' },
    '/edit-ad/:id': { render: (params) => PostAdPage.render(params.id), addEventListeners: PostAdPage.addEventListeners, auth: 'farmer' },
    '/farmer-dashboard/manage-listings': { render: ManageListingsPage.render, addEventListeners: ManageListingsPage.addEventListeners, auth: 'farmer' },
    '/farmer-dashboard/view-orders': { render: ViewOrdersPage.render, addEventListeners: ViewOrdersPage.addEventListeners, auth: 'farmer' },
    '/farmer-dashboard/tractor-rentals': { render: AgriServicesPage.render, addEventListeners: AgriServicesPage.addEventListeners, auth: 'farmer' },
    '/farmer-dashboard/fertilizer-zone': { render: FertilizerStorePage.render, addEventListeners: FertilizerStorePage.addEventListeners, auth: 'farmer' },
    '/farmer-dashboard/earnings-summary': { render: EarningsSummaryPage.render, addEventListeners: EarningsSummaryPage.addEventListeners, auth: 'farmer' },
    '/farmer-dashboard/waste-to-company': { render: WasteToCompanyPage.render, addEventListeners: WasteToCompanyPage.addEventListeners, auth: 'farmer' },
    '/waste-to-company-info': { render: WasteToCompanyInfoPage.render, addEventListeners: WasteToCompanyInfoPage.addEventListeners, auth: 'any' }
};

export const handleRouteChange = async () => {
    // Scroll to top on every page change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    const user = getCurrentUser();
    let path = window.location.hash.replace('#', '') || '/';
    if(path.endsWith('/')) path = path.slice(0, -1);
    if(path === '') path = '/';

    // Force unauthenticated visitors to login first (except register or login routes)
    // Allow the new Landing/Home page to be publicly accessible
    const publicPaths = ['/', '/login', '/login/farmer', '/login/customer', '/register', '/contact-support', '/contact'];
    if (!user && !publicPaths.includes(path)) {
        const navigate = (path) => { window.location.hash = path; };
        navigate('/login');
        return;
    }
    
    // Handle dynamic routes like /edit-ad/:id
    let params = {};
    const routeKey = Object.keys(routes).find(r => {
        const regex = new RegExp(`^${r.replace(/:\\w+/g, '([^/]+)')}$`);
        if (!regex.test(path)) return false;

        if (r.includes(':')) {
            const pathParts = path.split('/');
            const routeParts = r.split('/');
            routeParts.forEach((part, i) => {
                if (part.startsWith(':')) {
                    params[part.substring(1)] = pathParts[i];
                }
            });
        }
        return true;
    });

    const route = routes[routeKey];
    
    if (!route) {
        // fallback placeholder for unknown but allowed paths
        app.innerHTML = renderHeader(user) + `<main><div class="page-header"><h1>Coming Soon</h1></div><p style="text-align:center;">This page is being prepared. Please check back later.</p></main>` + renderFooter();
        addHeaderListeners();
        setBackgroundFor(path || '/');
        return;
    }

    // Authentication checks
    if (route.auth === false && user) {
        const navigate = (path) => { window.location.hash = path; };
        navigate(user.role === 'farmer' ? '/farmer-dashboard' : '/customer-dashboard');
        return;
    }
    if ((route.auth === 'customer' || route.auth === 'farmer') && (!user || user.role !== route.auth)) {
        const navigate = (path) => { window.location.hash = path; };
        navigate('/login');
        return;
    }

    // Render page
    const content = await route.render(params, user);
    app.innerHTML = renderHeader(user) + content + renderFooter();
    
    // Add event listeners
    addHeaderListeners();
    if (route.addEventListeners) {
        route.addEventListeners();
    }
    updateActiveLink();
    
    // Set background for this path
    setBackgroundFor(path);
    
    // Ensure scroll to top after rendering
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
};

const updateActiveLink = () => {
    const path = window.location.hash || '#/';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

export const initRouter = () => {
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('language-changed', handleRouteChange);
    handleRouteChange(); // Initial load
};