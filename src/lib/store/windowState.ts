import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getLocaleFromNavigator } from 'svelte-i18n'

enum Mode {
	MICRO_APP,
	HOME
}

enum Language {
	zh_CN = '中文简体',
	en_US = 'English'
}

type WindowConfig = {
	collapsed: boolean
	mode: Mode
	language: Language
	currentApp: string
}

const defaultwindowConfig: WindowConfig = {
	collapsed: false,
	mode: Mode.HOME,
	language: Language[getLocaleFromNavigator()?.replace('-', '_')],
	currentApp: undefined
}

const windowConfig = <Writable<WindowConfig>>writable(defaultwindowConfig)

export { windowConfig, Mode, defaultwindowConfig }

export type { WindowConfig }
