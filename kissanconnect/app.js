import { initRouter } from 'router';
import { initializeStore } from 'store';
import { initStyles } from 'styles/manifest';

// Initialize the mock backend, styles, and the router
document.addEventListener('DOMContentLoaded', async () => {
        const deferCss = false;

    await initializeStore();

    if (!deferCss) {
        await initStyles();
    } else {
        requestAnimationFrame(() => initStyles());
    }

    const i18n = await import('i18n');
    await i18n.setLocale(localStorage.getItem('kissan_lang') || 'en');

    initRouter();
});