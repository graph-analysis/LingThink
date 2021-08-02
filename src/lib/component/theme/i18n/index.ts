import { register } from 'svelte-i18n'

// 按需加载语言包
register('zh', () => import('./zh_CN.json'))
register('en', () => import('./en_US.json'))
