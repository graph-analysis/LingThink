// const window = globalThis;
// const global = globalThis;
// console.log(globalThis);
import * as indexeddb from 'pouchdb-adapter-indexeddb'
import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core'
import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

addPouchPlugin(indexeddb)

if (process.env.NODE_ENV === 'development') {
	// in dev-mode we add the dev-mode plugin
	// which does many checks and adds full error messages
	addRxPlugin(RxDBDevModePlugin)
}

let dbPromise

const _create = async () => {
	const db = await createRxDatabase({
		name: 'rxdbdemo',
		storage: getRxStoragePouch('indexeddb'),
		ignoreDuplicate: true
	})
	await db.addCollections({ notes: { schema: undefined } })
	dbPromise = db
	return dbPromise ? dbPromise : db
}

_create()
export * from './appState'
export * from './windowState'
