/**应用状态
 * id 应用id
 * @interface AppState
 */
interface AppState<T> {
	[id: string]: T
}

// todo:类型传导
export type { AppState }
