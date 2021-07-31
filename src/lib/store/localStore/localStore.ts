import { writable } from 'svelte/store'

/**本地状态(易失状态)
 * currentDomain 现在的域名地址
 * collapsed 任务栏是否折叠
 * @interface LocalStore
 */
interface LocalStore {
	currentDomain: string
	collapsed: boolean
}

const defaultLocalStore = {
	currentDomain: 'localhost',
	collapsed: false
}

const localStore = writable<LocalStore>(defaultLocalStore)
export type { LocalStore }
export { defaultLocalStore, localStore }
