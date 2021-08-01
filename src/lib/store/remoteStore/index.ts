import { GunReadable, UserStore, userStore } from './userStore'

export type { AppState } from './appState'
export type { RuntimeState } from './runtimeState'
export type { UserStore, GunReadable } from './userStore'
export type { WindowConfig } from './windowConfig'

// 避免直接使用 set 方法重设储存, 尽量使用 ref
export { userStore } from './userStore'
export { defaultRuntimeState } from './runtimeState'
export { defaultWindowConfig, Language } from './windowConfig'

export interface RemoteStore {
	userStore: GunReadable<UserStore>
}

export default <RemoteStore>{
	userStore: userStore
}
