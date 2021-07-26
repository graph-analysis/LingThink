// const window = globalThis;
// const global = globalThis;
// console.log(globalThis);
import * as leveldb from 'pouchdb-adapter-leveldb'
import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core'

import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

addPouchPlugin(leveldb)

if (process.env.NODE_ENV === 'development') {
	// in dev-mode we add the dev-mode plugin
	// which does many checks and adds full error messages
	addRxPlugin(RxDBDevModePlugin)
}

let dbPromise

const _create = async () => {
	const db = await createRxDatabase({
		name: 'rxdbdemo',
		storage: getRxStoragePouch('leveldb'),
		ignoreDuplicate: true
	})
	await db.addCollections({ notes: { schema: undefined } })
	dbPromise = db
	return dbPromise ? dbPromise : db
}

_create()
export * from './appState'
export * from './windowState'
