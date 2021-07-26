import { getLocaleFromNavigator, init, register } from 'svelte-i18n'

register('zh', () => import('./zh.json'))
register('en', () => import('./en.json'))

init({
	fallbackLocale: 'zh',
	initialLocale: getLocaleFromNavigator()
})
