import { KEYS, read, write, getRoom } from './storage.js';

// Improved product image mapping
const getProductImage = (name) => {
  const nameKey = name.toLowerCase().replace(/\s+/g, '');
  const imageMap = {
    'potato': 'assets/potato.png',
    'tomato': 'assets/tomato.png', 
    'onion': 'assets/onion.png',
    'carrot': 'assets/carrot.png',
    'greenbeans': 'assets/green-beans.png',
    'spinach': 'assets/spinach.png',
    'cauliflower': 'assets/cauliflower.png',
    'cabbage': 'assets/cabbage.png',
    'brinjal': 'assets/brinjal.png',
    'ladyfinger': 'assets/ladyfinger.png',
    'apple': 'assets/tomato.png', // fallback
    'banana': 'assets/green-beans.png', // fallback
    'rice': 'assets/cabbage.png', // fallback
    'wheat': 'assets/potato.png', // fallback
    'milk': 'assets/cauliflower.png', // fallback
    'eggs': 'assets/carrot.png', // fallback
    'tractor': 'asset tractor-1.png',
    'fertilizer': 'asset fertilizer-1.png',
    'drone': 'asset drone-1.png'
  };
  return imageMap[nameKey] || 'assets/tomato.png';
};

export const getProducts = () => read(KEYS.PRODUCTS);
export const getProductsByFarmer = (farmerId) => getProducts().filter(p => p.farmerId === farmerId);

export const addProduct = (productData) => {
  const products = getProducts();
  const imageUrl = productData.imageUrl || getProductImage(productData.name);
  const newProduct = { ...productData, id: `prod${Date.now()}`, imageUrl };
  products.push(newProduct);
  write(KEYS.PRODUCTS, products);
  const room = getRoom(); if (room) room.collection('product').create({ ...productData });
};

export const updateProduct = (productId, updatedData) => {
  let products = getProducts();
  products = products.map(p => p.id === productId ? { ...p, ...updatedData } : p);
  write(KEYS.PRODUCTS, products);
  const room = getRoom(); if (room) try { room.collection('product').update(productId, updatedData); } catch(e) {}
};

export const deleteProduct = (productId) => {
  let products = getProducts().filter(p => p.id !== productId);
  write(KEYS.PRODUCTS, products);
  const room = getRoom(); if (room) try { room.collection('product').delete(productId); } catch(e) {}
};