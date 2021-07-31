import { writable } from 'svelte/store'

interface LocalStore {
	currentDomain: string
	collapsed: boolean
}

const defaultLocalStore = {
	currentDomain: null,
	collapsed: false
}

const localStore = writable<LocalStore>(defaultLocalStore)
export type { LocalStore }
export { defaultLocalStore, localStore }
