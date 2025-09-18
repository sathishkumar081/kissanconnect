import { KEYS, read, write, readObj, getRoom } from './storage.js';

const initialUsers = [
  { id: 'farmer1', name: 'Ram Singh', email: 'ram@farm.com', password: 'password', role: 'farmer', address: '123 Farm Lane, Punjab' },
  { id: 'farmer2', name: 'Sita Devi', email: 'sita@farm.com', password: 'password', role: 'farmer', address: '456 Village Road, Haryana' },
  { id: 'customer1', name: 'Arjun Kumar', email: 'arjun@email.com', password: 'password', role: 'customer' },
];

const initialProducts = [
  { id: 'prod1', name: 'Tomato', price: '40', unit: 'kg', description: 'Farm-fresh red tomatoes.', imageUrl: 'assets/tomato.png', farmerId: 'farmer1' },
  { id: 'prod2', name: 'Potato', price: '30', unit: 'kg', description: 'Organic potatoes, great for curries.', imageUrl: 'assets/potato.png', farmerId: 'farmer1' },
  { id: 'prod3', name: 'Onion', price: '40', unit: 'kg', description: 'High-quality onions.', imageUrl: 'assets/onion.png', farmerId: 'farmer2' },
  { id: 'prod4', name: 'Carrot', price: '60', unit: 'kg', description: 'Sweet and crunchy carrots.', imageUrl: 'assets/carrot.png', farmerId: 'farmer2' },
  { id: 'prod5', name: 'Green Beans', price: '80', unit: 'kg', description: 'Tender, crisp beans perfect for stir-fries.', imageUrl: 'assets/green-beans.png', farmerId: 'farmer1' },
  { id: 'prod6', name: 'Spinach', price: '25', unit: 'bunch', description: 'Organic spinach rich in iron and nutrients.', imageUrl: 'assets/spinach.png', farmerId: 'farmer2' },
  { id: 'prod7', name: 'Cauliflower', price: '50', unit: 'kg', description: 'Fresh white cauliflower florets.', imageUrl: 'assets/cauliflower.png', farmerId: 'farmer1' },
  { id: 'prod8', name: 'Cabbage', price: '40', unit: 'kg', description: 'Leafy cabbage for salads and stir-fries.', imageUrl: 'assets/cabbage.png', farmerId: 'farmer2' },
  { id: 'prod9', name: 'Brinjal', price: '50', unit: 'kg', description: 'Shiny purple brinjals, great for curries.', imageUrl: 'assets/brinjal.png', farmerId: 'farmer1' },
  { id: 'prod10', name: 'Ladyfinger', price: '60', unit: 'kg', description: 'Crisp and fresh okra.', imageUrl: 'assets/ladyfinger.png', farmerId: 'farmer2' },
  { id: 'prod11', name: 'Rice', price: '70', unit: 'kg', description: 'Premium long-grain rice.', imageUrl: 'https://images.unsplash.com/photo-1604908177271-9b4b2c1fc1d9?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer1' },
  { id: 'prod12', name: 'Wheat', price: '35', unit: 'kg', description: 'High-quality wheat grains.', imageUrl: 'https://images.unsplash.com/photo-1500937386664-56f3d48d8a5e?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer2' },
  { id: 'prod13', name: 'Sugar', price: '45', unit: 'kg', description: 'Refined sugar crystals.', imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer1' },
  { id: 'prod14', name: 'Milk', price: '60', unit: 'L', description: 'Fresh dairy milk from local farms.', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer2' },
  { id: 'prod15', name: 'Eggs', price: '6', unit: 'piece', description: 'Free-range eggs (per piece).', imageUrl: 'https://images.unsplash.com/photo-1517959105821-eaf2591984f5?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer1' },
  { id: 'prod16', name: 'Apples', price: '180', unit: 'kg', description: 'Crisp and juicy apples.', imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer2' },
  { id: 'prod17', name: 'Bananas', price: '60', unit: 'dozen', description: 'Sweet ripe bananas.', imageUrl: 'https://images.unsplash.com/photo-1571772805064-207c8435df79?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer1' },
  { id: 'prod18', name: 'Garlic', price: '200', unit: 'kg', description: 'Aromatic garlic bulbs.', imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer2' },
  { id: 'prod19', name: 'Ginger', price: '140', unit: 'kg', description: 'Fresh ginger roots.', imageUrl: 'https://images.unsplash.com/photo-1625944522767-9f3f4042afe7?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer1' },
  { id: 'prod20', name: 'Chillies', price: '100', unit: 'kg', description: 'Spicy green chillies.', imageUrl: 'https://images.unsplash.com/photo-1626266063971-6a53ce38afcb?auto=format&fit=crop&w=600&q=60', farmerId: 'farmer2' },
];

const initialAgriServices = {
  tractors: [
    { id: 'tractor1', name: 'Sonalika DI 745 III', price: '₹600/hr', availability: 'Available', location: 'Punjab', imageUrl: 'https://source.unsplash.com/800x600?tractor,field', ownerId: 'farmer1', sellerName: 'Ram Singh', sellerLocation: 'Amritsar, Punjab', sellerRating: 4.6 },
    { id: 'tractor2', name: 'Mahindra Arjun 555 DI', price: '₹700/hr', availability: 'Available', location: 'Haryana', imageUrl: 'https://source.unsplash.com/800x600?farm%20tractor', ownerId: 'farmer2', sellerName: 'Sita Devi', sellerLocation: 'Rohtak, Haryana', sellerRating: 4.4 },
    { id: 'tractor3', name: 'Tractor Rental – 50HP', price: '₹650/hr', availability: 'Available', location: 'UP', imageUrl: 'https://images.unsplash.com/photo-1570051008600-7b42d1f5c196?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer1', sellerName: 'Gurpreet K.', sellerLocation: 'Lucknow, UP', sellerRating: 4.5 },
    { id: 'tractor4', name: 'Ploughing Tractor', price: '₹750/hr', availability: 'Available', location: 'Gujarat', imageUrl: 'https://images.unsplash.com/photo-1591258739299-2a7ab1a2d6fa?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer2', sellerName: 'Vikas Sharma', sellerLocation: 'Ahmedabad, Gujarat', sellerRating: 4.3 },
    { id: 'tractor5', name: '4WD Tractor', price: '₹800/hr', availability: 'Available', location: 'Rajasthan', imageUrl: 'https://images.unsplash.com/photo-1589923188900-5f1dfad9dca1?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer1', sellerName: 'Anil Yadav', sellerLocation: 'Jodhpur, Rajasthan', sellerRating: 4.2 },
    { id: 'tractor6', name: 'Cultivator + Tractor', price: '₹900/hr', availability: 'Available', location: 'MP', imageUrl: 'https://images.unsplash.com/photo-1604335399105-470a52acae4b?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer2', sellerName: 'Meera Joshi', sellerLocation: 'Bhopal, MP', sellerRating: 4.7 }
  ],
  drones: [
    { id: 'drone1', name: 'Agri-Sprayer 10L', type: 'Spraying', price: '₹1500/use', availability: 'Available', imageUrl: 'https://source.unsplash.com/800x600?agriculture%20drone', ownerId: 'farmer1', sellerName: 'Rohit Das', sellerLocation: 'Pune, Maharashtra', sellerRating: 4.5 },
    { id: 'drone2', name: 'Survey Drone 4K', type: 'Survey', price: '₹1800/use', availability: 'Available', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer2', sellerName: 'Priya Nair', sellerLocation: 'Thiruvananthapuram, Kerala', sellerRating: 4.6 },
    { id: 'drone3', name: 'Sprayer Drone 16L', type: 'Spraying', price: '₹2200/use', availability: 'Available', imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer1', sellerName: 'Kiran Patel', sellerLocation: 'Surat, Gujarat', sellerRating: 4.4 },
    { id: 'drone4', name: 'Mapping Drone RTK', type: 'Mapping', price: '₹2500/use', availability: 'Available', imageUrl: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=800&q=70', ownerId: 'farmer2', sellerName: 'Lakshmi Devi', sellerLocation: 'Chennai, Tamil Nadu', sellerRating: 4.7 }
  ],
  fertilizers: [
    { id: 'fert1', name: 'Urea', price: '₹30/kg', quantity: '500kg', type: 'sell', sellerId: 'farmer2', imageUrl: 'https://source.unsplash.com/800x600?urea%20fertilizer%20bag', description: 'Nitrogen-rich fertilizer for rapid growth.', sellerName: 'Ram Singh', sellerLocation: 'Amritsar, Punjab', sellerRating: 4.5 },
    { id: 'fert2', name: 'DAP', price: '₹45/kg', quantity: '200kg', type: 'sell', sellerId: 'farmer1', imageUrl: 'https://source.unsplash.com/800x600?fertilizer%20bag%20dap', description: 'Diammonium phosphate for strong roots.', sellerName: 'Sita Devi', sellerLocation: 'Hisar, Haryana', sellerRating: 4.3 },
    { id: 'fert3', name: 'MOP', price: '₹40/kg', quantity: '150kg', type: 'sell', sellerId: 'farmer1', imageUrl: 'https://source.unsplash.com/800x600?potash%20fertilizer%20bag', description: 'Muriate of Potash for fruiting and flowering.', sellerName: 'Anil Yadav', sellerLocation: 'Jodhpur, Rajasthan', sellerRating: 4.2 },
    { id: 'fert4', name: 'NPK 20-20-20', price: '₹55/kg', quantity: '300kg', type: 'sell', sellerId: 'farmer2', imageUrl: 'https://source.unsplash.com/800x600?npk%20fertilizer', description: 'Balanced nutrients for overall health.', sellerName: 'Meera Joshi', sellerLocation: 'Bhopal, MP', sellerRating: 4.6 },
    { id: 'fert5', name: 'Compost', price: '₹12/kg', quantity: '1000kg', type: 'sell', sellerId: 'farmer2', imageUrl: 'https://source.unsplash.com/800x600?compost%20bag', description: 'Organic compost for soil conditioning.', sellerName: 'Vikas Sharma', sellerLocation: 'Ahmedabad, Gujarat', sellerRating: 4.1 },
    { id: 'fert6', name: 'Vermicompost', price: '₹18/kg', quantity: '800kg', type: 'sell', sellerId: 'farmer1', imageUrl: 'https://source.unsplash.com/800x600?vermicompost', description: 'Nutrient-dense natural fertilizer.', sellerName: 'Pooja Rao', sellerLocation: 'Mysore, Karnataka', sellerRating: 4.4 },
    { id: 'fert7', name: 'Bone Meal', price: '₹35/kg', quantity: '250kg', type: 'sell', sellerId: 'farmer1', imageUrl: 'https://source.unsplash.com/800x600?bone%20meal%20fertilizer', description: 'Phosphorus boost for root growth.', sellerName: 'Rohit Das', sellerLocation: 'Pune, Maharashtra', sellerRating: 4.2 },
    { id: 'fert8', name: 'Gypsum', price: '₹10/kg', quantity: '900kg', type: 'sell', sellerId: 'farmer2', imageUrl: 'https://source.unsplash.com/800x600?gypsum%20bag', description: 'Improves soil structure and calcium.', sellerName: 'Priya Nair', sellerLocation: 'Thiruvananthapuram, Kerala', sellerRating: 4.3 },
    { id: 'fert9', name: 'Zinc Sulphate', price: '₹65/kg', quantity: '120kg', type: 'sell', sellerId: 'farmer1', imageUrl: 'https://source.unsplash.com/800x600?zinc%20sulphate%20fertilizer', description: 'Micronutrient for yield improvement.', sellerName: 'Kiran Patel', sellerLocation: 'Surat, Gujarat', sellerRating: 4.5 },
    { id: 'fert10', name: 'Humic Acid', price: '₹70/kg', quantity: '80kg', type: 'sell', sellerId: 'farmer2', imageUrl: 'https://source.unsplash.com/800x600?humic%20acid%20fertilizer', description: 'Enhances nutrient uptake.', sellerName: 'Lakshmi Devi', sellerLocation: 'Chennai, Tamil Nadu', sellerRating: 4.6 }
  ]
};

export const initializeStore = async () => {
  if (!localStorage.getItem(KEYS.USERS)) write(KEYS.USERS, initialUsers);
  if (!localStorage.getItem(KEYS.PRODUCTS)) write(KEYS.PRODUCTS, initialProducts);
  else {
    const existing = JSON.parse(localStorage.getItem(KEYS.PRODUCTS));
    if (existing.length < 20) write(KEYS.PRODUCTS, initialProducts);
  }
  if (!localStorage.getItem(KEYS.AGRI_SERVICES)) write(KEYS.AGRI_SERVICES, initialAgriServices);
  else {
    const existing = JSON.parse(localStorage.getItem(KEYS.AGRI_SERVICES));
    if (!existing.fertilizers || existing.fertilizers.length < 8) {
      existing.fertilizers = initialAgriServices.fertilizers;
      localStorage.setItem(KEYS.AGRI_SERVICES, JSON.stringify(existing));
    }
  }
  if (!localStorage.getItem(KEYS.CONTACTS)) write(KEYS.CONTACTS, []);
  if (!sessionStorage.getItem(KEYS.CART)) sessionStorage.setItem(KEYS.CART, JSON.stringify([]));
  if (!localStorage.getItem(KEYS.W2C)) write(KEYS.W2C, []);
  if (!localStorage.getItem(KEYS.EARNINGS)) localStorage.setItem(KEYS.EARNINGS, JSON.stringify({}));

  const room = getRoom();
  if (room) {
    try {
      const recProducts = room.collection('product').getList();
      if (recProducts && recProducts.length) {
        const mapped = recProducts.map(r => ({
          id: r.id, name: r.name, price: String(r.price), unit: r.unit,
          description: r.description, imageUrl: r.imageUrl, farmerId: r.farmerId
        }));
        write(KEYS.PRODUCTS, mapped);
      }
    } catch (e) {}
  }
};