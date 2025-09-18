import { getUsers } from 'store';

const CURRENT_USER_KEY = 'kissan_market_user';

export const login = (email, password, role) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (user) {
        sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return true;
    }
    return false;
};

export const logout = () => {
    sessionStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
    const user = sessionStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};

