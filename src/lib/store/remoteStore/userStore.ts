import type { AppState } from './appState'
import { storeInit } from './gunStore'
import { defaultRuntimeState, RuntimeState } from './runtimeState'
import { defaultWindowConfig, WindowConfig } from './windowConfig'

/**用户个人同步信息<todo: 加密>
 * --- config 配置
 * 	windowConfig 窗口配置
 *
 * --- state 状态
 * 	runtimeState 运行时信息
 * 	appState 应用状态
 *
 * @interface UserStore
 */
interface UserStore {
	config: Config
	state: State
}

/**配置集合
 * @interface Config
 */
interface Config {
	windowConfig: WindowConfig
}

/**状态集合
 * @interface State
 */
interface State {
	runtimeState: RuntimeState
	_appState: AppState<any>
}

// 默认配置，用于初始化应用
const defaultUserStore: UserStore = {
	config: {
		windowConfig: defaultWindowConfig
	},
	state: {
		runtimeState: defaultRuntimeState,
		_appState: {}
	}
}

export type { UserStore }
export const userStore = storeInit<UserStore>('userStore', defaultUserStore)
