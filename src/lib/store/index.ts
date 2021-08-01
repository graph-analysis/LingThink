// 避免直接使用 set 方法重设储存, 尽量使用 ref
export { userStore } from './remoteStore'
export { defaultRuntimeState } from './remoteStore'
export { defaultWindowConfig, Language } from './remoteStore'
export { MicroAppType } from './localStore'
export { defaultLocalStore, localStore } from './localStore'

export type { AppConfig } from './localStore'
export type { LocalStore } from './localStore'
export type { AppState } from './remoteStore'
export type { RuntimeState } from './remoteStore'
export type { UserStore, GunReadable } from './remoteStore'
export type { WindowConfig } from './remoteStore'
