import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('zh-CN', () => import('./zh-CN.json'));
register('en', () => import('./en.json'));

init({
	fallbackLocale: 'zh',
	initialLocale: getLocaleFromNavigator()
});
