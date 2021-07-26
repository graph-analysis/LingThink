import { addPouchPlugin, createRxDatabase, getRxStoragePouch, removeRxDatabase } from 'rxdb'
import * as ldb from 'pouchdb-adapter-leveldb'

addPouchPlugin(ldb)
let ddb
// create the database with the storage creator.
const db = async () => {
	ddb = ddb
		? ddb
		: await createRxDatabase({
				name: 'mydata',
				storage: getRxStoragePouch('leveldb'),
				ignoreDuplicate: true
		  })
	return ddb
}

console.log(db())

export * from './appState'
export * from './windowState'
