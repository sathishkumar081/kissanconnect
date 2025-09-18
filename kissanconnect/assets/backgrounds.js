const vw = () => (window.innerWidth >= 1200 ? 1920 : window.innerWidth >= 768 ? 1280 : 720);
const vh = () => Math.round(vw() * 9 / 16);
const u = (q) => `https://source.unsplash.com/${vw()}x${vh()}?${encodeURIComponent(q)}`;

// HOME PAGE - Farm landscapes, produce, village scenes
export const HOME_BG = [
  'hero-banner.png',
  u('sunrise over farmland golden hour'),
  u('green crop fields aerial view'),
  u('fresh vegetables farmers market stall'),
  u('tractor plowing fertile field'),
  u('happy farmer harvesting crops'),
  u('rural village morning landscape'),
  u('agricultural machinery in field'),
  u('produce market colorful display'),
  u('irrigation system farm sunset'),
  u('wheat field golden harvest'),
  u('farm landscape mountains background'),
  u('farmers working together community')
];

// LOGIN/REGISTER - Welcoming farm visuals, simple natural backgrounds
export const LOGIN_BG = [
  u('smiling farmer holding fresh vegetables'),
  u('farmers market entrance welcoming'),
  u('fresh green crops morning light'),
  u('happy customer buying produce market'),
  u('seedlings growing in farmer hands'),
  u('village life peaceful scene'),
  u('fresh produce baskets display'),
  u('rural road leading to farm'),
  u('green field path morning mist'),
  u('market vendor friendly smile')
];

// FARMER DASHBOARD - Tractors, drones, seeds, fertilizers
export const FARMER_DASH_BG = [
  u('modern tractor working in field'),
  u('agricultural drone spraying crops'),
  u('fertilizer bags warehouse storage'),
  u('seed packets variety display'),
  u('combine harvester wheat field'),
  u('irrigation equipment farm setup'),
  u('tractor wheel closeup muddy field'),
  u('farm equipment barn storage'),
  u('seed sowing machine operation'),
  u('agricultural tools collection')
];

// MANAGE LISTINGS - Product management, warehouse, inventory
export const MANAGE_LISTINGS_BG = [
  u('warehouse agricultural products stacked'),
  u('farmer checking inventory clipboard'),
  u('product sorting facility agriculture'),
  u('grain storage warehouse interior'),
  u('vegetable crates organized market'),
  u('inventory management farmer tablet'),
  u('produce inspection quality control'),
  u('agricultural products catalog display')
];

// VIEW ORDERS - Shipping, delivery, customer service
export const VIEW_ORDERS_BG = [
  u('farmer packing vegetables boxes delivery'),
  u('agricultural products shipping preparation'),
  u('delivery truck farm fresh produce'),
  u('customer receiving fresh vegetables'),
  u('farmer market stall customer service'),
  u('order fulfillment agriculture warehouse'),
  u('packaging fresh produce shipping boxes')
];

// EARNINGS - Money, success, financial growth
export const EARNINGS_BG = [
  u('successful farmer counting money harvest'),
  u('agricultural profit growth chart concept'),
  u('farmer success story financial independence'),
  u('rural bank agriculture loan success'),
  u('happy farmer financial security family'),
  u('agriculture business growth prosperity'),
  u('farmer investment modern equipment success')
];

// WASTE TO COMPANY - Sustainability, recycling, green technology
export const WASTE_TO_COMPANY_BG = [
  u('composting facility organic waste recycling'),
  u('sustainable agriculture waste management'),
  u('organic fertilizer production facility'),
  u('agricultural waste to energy conversion'),
  u('green technology sustainable farming'),
  u('circular economy agriculture sustainability'),
  u('eco-friendly waste processing plant agriculture')
];

// CUSTOMER DASHBOARD - Vegetables, fruits, market baskets
export const CUSTOMER_DASH_BG = [
  u('colorful vegetable baskets market'),
  u('fresh fruits apples oranges display'),
  u('happy customer shopping produce'),
  u('organic vegetables market stall'),
  u('grain sacks variety market'),
  u('spices colorful market display'),
  u('leafy greens fresh closeup'),
  u('fruit basket checkout counter'),
  u('tomatoes fresh red closeup'),
  u('mixed fruits vegetables basket')
];

// AGRISERVICES - Tractors, drones, irrigation, fertilizer sacks
export const AGRI_BG = [
  u('red tractor working soil'),
  u('drone flying over green crops'),
  u('sprinkler irrigation system active'),
  u('fertilizer bags stacked warehouse'),
  u('blue tractor ploughing brown soil'),
  u('agricultural drone crop monitoring'),
  u('pivot irrigation system field'),
  u('seed drill machine planting'),
  u('farm equipment lineup sunset'),
  u('modern tractor sunset silhouette')
];

// PRODUCTS - Fresh produce, grains, vegetables close-up
export const PRODUCTS_BG = [
  u('fresh vegetables variety closeup'),
  u('grains wheat rice detailed'),
  u('colorful vegetable assortment'),
  u('farm produce harvest display'),
  u('fruit closeup apples oranges'),
  u('spices grains market variety'),
  u('leafy vegetables macro detail'),
  u('root vegetables fresh display'),
  u('rice grains texture closeup'),
  u('wheat kernels golden macro')
];

// CART - Baskets, shopping visuals
export const CART_BG = [
  u('shopping basket full vegetables'),
  u('market checkout counter scale'),
  u('vegetable basket top view'),
  u('weighing scale fresh produce'),
  u('farmer market payment stall'),
  u('hands picking apples basket'),
  u('produce counter payment scene'),
  u('market checkout friendly vendor'),
  u('paper bag fresh vegetables'),
  u('fruit checkout market scene')
];

// ABOUT - Farm landscapes, sunrise, roads
export const ABOUT_BG = [
  u('farmer community meeting field'),
  u('village life sunrise peaceful'),
  u('country road sunrise golden'),
  u('farmland morning mist light'),
  u('sunrise over fields dramatic'),
  u('rural road fields both sides'),
  u('group farmers smiling together'),
  u('community market day celebration'),
  u('village festival agriculture theme'),
  u('cooperative farming community work')
];

// CONTACT - Communication, support visuals
export const CONTACT_BG = [
  u('friendly office support desk'),
  u('farmer getting assistance help'),
  u('agriculture consultation meeting'),
  u('support team office environment'),
  u('community help center rural'),
  u('call center agent headset friendly'),
  u('mobile outreach van village'),
  u('customer support representative smiling'),
  u('help desk agriculture signage'),
  u('farmer helpline office setup')
];