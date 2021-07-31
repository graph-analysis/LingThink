/**窗口模式
 * HOME 主应用模式
 * MICRO_APP 插件应用模式
 * @enum {number}
 */
// enum Mode {
// 	MAIN = 0,
// 	MICRO_APP = 1
// }

/**运行状态
 * collapsed 是否最小化任务栏
 * mode 窗口应用模式
 * currentApp 现在的应用名称(随模式自动切换)
 * @interface RuntimeState
 */
interface RuntimeState {
	currentAppID: string
}

const defaultRuntimeState: RuntimeState = {
	currentAppID: null
}

export type { RuntimeState }
export { defaultRuntimeState }
