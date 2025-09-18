export const KEYS = {
  USERS: 'kissan_market_users',
  PRODUCTS: 'kissan_market_products',
  AGRI_SERVICES: 'kissan_market_agri_services',
  CONTACTS: 'kissan_market_contact',
  CART: 'kissan_market_cart',
  W2C: 'kissan_market_waste_to_company',
  EARNINGS: 'kissan_market_earnings',
};

export const read = (key, storage = localStorage) => JSON.parse(storage.getItem(key) || '[]');
export const write = (key, data, storage = localStorage) => storage.setItem(key, JSON.stringify(data));
export const readObj = (key) => JSON.parse(localStorage.getItem(key) || '{}');

let _room = null;
export function getRoom() {
  if (_room !== null) return _room;
  try { _room = new WebsimSocket(); } catch (e) { _room = null; }
  return _room;
}

