/**运行状态
 * collapsed 是否最小化任务栏
 * mode 窗口应用模式
 * backGroundApp 所以打开的的应用ID(若为null则无应用)
 * @interface RuntimeState
 */
interface RuntimeState {}

const defaultRuntimeState: RuntimeState = {}

export type { RuntimeState }
export { defaultRuntimeState }
