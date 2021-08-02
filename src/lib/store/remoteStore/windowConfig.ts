import { getLocaleFromNavigator } from 'svelte-i18n'

/**语言
 * @enum {number}
 */
enum Language {
	zh_CN = '中文简体',
	en_US = 'English'
}

/**窗口配置
 * language 语言
 */
interface WindowConfig {
	language: Language
	themeColor: string
}

// 默认窗口配置
const defaultWindowConfig: WindowConfig = {
	language: Language[getLocaleFromNavigator()?.replace('-', '_')],
	themeColor: '#FF3E00'
}

export { defaultWindowConfig, Language }
export type { WindowConfig }
