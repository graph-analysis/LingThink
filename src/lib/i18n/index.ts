import { getLocaleFromNavigator, init, register } from 'svelte-i18n'

// 按需加载语言包
register('zh', () => import('./zh.json'))
register('en', () => import('./en.json'))

// 初始化语言模块
init({
	fallbackLocale: 'zh',
	initialLocale: getLocaleFromNavigator()
})
