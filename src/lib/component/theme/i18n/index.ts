import { register } from 'svelte-i18n'

// 按需加载语言包
// 注册的 key 是储存中 Language 枚举类型的字符串值
register('中文简体', () => import('./zh_CN.json'))
register('English', () => import('./en_US.json'))
