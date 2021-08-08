import { writable } from 'svelte/store'

/**本地状态(易失状态)
 * currentDomain 现在的域名地址
 * inMicroApp 微应用模式
 * @interface LocalStore
 */
interface LocalStore {
	currentDomain: string
	inMicroApp: boolean
}

const defaultLocalStore = {
	currentDomain: 'localhost',
	inMicroApp: false
}

const localStore = writable<LocalStore>(defaultLocalStore)
export type { LocalStore }
export { defaultLocalStore, localStore }
