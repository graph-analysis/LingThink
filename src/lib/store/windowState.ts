import { getLocaleFromNavigator } from 'svelte-i18n'

/**窗口模式
 * MICRO_APP 插件应用模式
 * HOME 主应用模式
 * @enum {number}
 */
enum Mode {
	MICRO_APP,
	HOME
}

/**语言
 * @enum {number}
 */
enum Language {
	zh_CN = '中文简体',
	en_US = 'English'
}

/**窗口配置
 * collapsed 是否最小化任务栏
 * mode 窗口应用模式
 * language 语言
 * currentApp 现在的应用名称(随模式自动切换)
 */
type WindowConfig = {
	collapsed: boolean
	mode: Mode
	language: Language
	currentApp: string
}

// 默认窗口配置
const defaultwindowConfig: WindowConfig = {
	collapsed: false,
	mode: Mode.HOME,
	language: Language[getLocaleFromNavigator()?.replace('-', '_')],
	currentApp: null
}

export { Mode, defaultwindowConfig, Language }
export type { WindowConfig }
