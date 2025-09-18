export let currentLocale = 'en';
let dict = {};
const cache = {};

export async function setLocale(locale) {
  currentLocale = locale || 'en';
  if (!cache[currentLocale]) {
    const res = await fetch(`./locales/${currentLocale}.json`);
    cache[currentLocale] = res.ok ? await res.json() : {};
  }
  dict = cache[currentLocale] || {};
  // Set html lang/dir for accessibility
  document.documentElement.lang = currentLocale;
  document.documentElement.dir = 'ltr';
}

export function t(key, fallback = '') {
  return (dict[key] ?? fallback ?? key);
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) el.textContent = text;
  });
}