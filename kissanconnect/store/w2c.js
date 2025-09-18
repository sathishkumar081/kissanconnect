import { KEYS, read, write, readObj } from './storage.js';
import { getProducts } from './products.js';

export const markProductUnsold = (productId, rate = 0.75) => {
  const products = getProducts();
  const p = products.find(x => x.id === productId);
  if (!p) return null;
  const buyback = Math.round(Number(p.price) * rate);
  const w2c = JSON.parse(localStorage.getItem(KEYS.W2C) || '[]');
  w2c.push({ id: `w2c${Date.now()}`, productId, name: p.name, unit: p.unit, farmerId: p.farmerId, originalPrice: Number(p.price), buyback, at: new Date().toISOString() });
  write(KEYS.W2C, w2c);
  const earnings = readObj(KEYS.EARNINGS);
  earnings[p.farmerId] = (earnings[p.farmerId] || 0) + buyback;
  localStorage.setItem(KEYS.EARNINGS, JSON.stringify(earnings));
  const remaining = products.filter(x => x.id !== productId);
  write(KEYS.PRODUCTS, remaining);
  return buyback;
};

export const getWasteToCompanyRecords = (farmerId) => (JSON.parse(localStorage.getItem(KEYS.W2C) || '[]').filter(r => r.farmerId === farmerId));
export const getEarnings = (farmerId) => (readObj(KEYS.EARNINGS)[farmerId] || 0);