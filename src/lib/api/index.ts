import { AppConfig, getAppDB } from '$lib/store'
import type { IGunChainReference } from 'gun/types/chain'

interface API {
	db: <T>() => IGunChainReference<T, keyof T, 'root'>
}

const getAPI = (appConfig: AppConfig): API => {
	const appID = appConfig.id

	return {
		db: <T>() => getAppDB<T>(appID)
	}
}

export { getAPI }
export type { API }
