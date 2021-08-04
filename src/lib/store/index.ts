import remoteStore, { RemoteStore } from './remoteStore'
import localStore, { LocalStore } from './localStore'
import type { Writable } from 'svelte/store'

export {
	default as remoteStore,
	userStore,
	defaultRuntimeState,
	getAppDB,
	defaultWindowConfig,
	Language
} from './remoteStore'

export { defaultLocalStore, localStore, MicroAppType } from './localStore'

export type { LocalStore, AppConfig } from './localStore'
export type { AppState, RuntimeState, UserStore, GunReadable, WindowConfig } from './remoteStore'

export interface Store {
	remoteStore: RemoteStore
	localStore: Writable<LocalStore>
}

export default <Store>{
	remoteStore: remoteStore,
	localStore: localStore
}
