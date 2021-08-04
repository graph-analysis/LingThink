import { UserStore, userStore } from './userStore'
import type { GunReadable } from './gunStore'

export type { AppState } from './appState'
export type { RuntimeState } from './runtimeState'
export type { UserStore } from './userStore'
export type { WindowConfig } from './windowConfig'
export type { GunReadable } from './gunStore'

export { storeInit, getAppDB } from './gunStore'
export { userStore } from './userStore'
export { defaultRuntimeState } from './runtimeState'
export { defaultWindowConfig, Language } from './windowConfig'

export interface RemoteStore {
	userStore: GunReadable<UserStore>
}

export default <RemoteStore>{
	userStore: userStore
}
