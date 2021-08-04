/**运行状态
 * collapsed 是否最小化任务栏
 * mode 窗口应用模式
 * currentAppID 现在的应用ID(若为null则为主应用)
 * @interface RuntimeState
 */
interface RuntimeState {
	// todo: 转移到本地储存，用后台应用列表替代，连接上app的存储
	currentAppID: string
}

const defaultRuntimeState: RuntimeState = {
	currentAppID: null
}

export type { RuntimeState }
export { defaultRuntimeState }
