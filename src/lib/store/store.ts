// stores.js
import Gun from 'gun/gun'
import { noop, safe_not_equal } from 'svelte/internal'
import type { StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store'
import { defaultAppConfig } from './appState'
type Invalidator<T> = (value?: T) => void
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]
import type { AppConfig } from './appState'
import { defaultwindowConfig, WindowConfig } from './windowState'

interface GlobalConfig {
	globalConfig: {
		appConfig: AppConfig
		windowConfig: WindowConfig
		test?: { name: string }
	}
}

const subscriber_queue = []

// Gun.chain['subscribe'] = function (publish) {
// 	var gun = this
// 	var at = gun._
// 	var isMap = !!at && !!at.back && !!at.back.each

// 	if (isMap) {
// 		var store = new Map()
// 		publish(Array.from(store))
// 		gun = gun.on((data, _key, as) => {
// 			var key = _key || ((data || {})._ || {})['#'] || as.via.soul
// 			if (data === null) {
// 				store.delete(key)
// 			} else {
// 				store.set(key, data)
// 			}
// 			publish(Array.from(store))
// 		})
// 	} else {
// 		gun = gun.on((data) => publish(data))
// 	}

// 	return gun.off
// }

// function configStore(ref: any, methods = {}) {
// 	let store = {}
// 	const subscribers = []

// 	// Add a listener to GUN data
// 	ref.on(function (data: {}, key: string | number) {
// 		/* If the ref._get matches the data key it means we are getting
// 		 * data from a call to gun.get(), and so we don't need the store
// 		 * to be an object with nested data. Otherwise we are getting data
// 		 * from a call to map() and should nest the data in an object
// 		 */
// 		if (ref._.get === key) {
// 			store = data
// 		} else if (!data) {
// 			/* This clause will not work as intended on null values / false / 0
// 			 * if you use such data consider subscribing to a parent node instead
// 			 * eg. gun.get("temperature") instead of gun.get("temperature").get("value").
// 			 * Or you can pass a validate() function (TODO: add example)
// 			 */
// 			delete store[key]
// 		} else {
// 			store[key] = data
// 		}
// 		// Tell each subscriber that data has been updated
// 		for (let i = 0; i < subscribers.length; i += 1) {
// 			subscribers[i](store)
// 		}
// 	})

// 	function subscribe(subscriber: (arg0: any) => void) {
// 		subscribers.push(subscriber)

// 		// 推送初始状态
// 		subscriber(store)

// 		// 在组件卸载时移除订阅
// 		return () => {
// 			const index = subscribers.indexOf(subscriber)
// 			if (index !== -1) {
// 				subscribers.splice(index, 1)
// 			}
// 			if (!subscribers.length) {
// 				ref.off()
// 			}
// 		}
// 	}

// 	return { ...methods, subscribe }
// }

export function writable<T>(
	gun: any,
	value?: T,
	start: StartStopNotifier<T> = noop,
	methods = {}
): Writable<T> {
	let stop: Unsubscriber
	const subscribers: Set<SubscribeInvalidateTuple<T>> = new Set()
	const ref = gun.map()

	const updateVisual = () => {
		// Tell each subscriber that data has been updated
		if (stop) {
			// 向订阅者推送数据
			const run_queue = !subscriber_queue.length
			for (const subscriber of subscribers) {
				subscriber[1]()
				subscriber_queue.push(subscriber, value)
			}
			if (run_queue) {
				for (let i = 0; i < subscriber_queue.length; i += 2) {
					subscriber_queue[i][0](subscriber_queue[i + 1])
				}
				subscriber_queue.length = 0
			}
		}
	}
	// TODO: 从储存中取初始值
	// ref.once((data) => (value = data))

	// todo: 如果 GUNDB 更新同步到 value 并更新视图
	// Add a listener to GUN data
	ref.on((data: T, key: string | number) => {
		if (ref._.get === key) {
			// 从 gun.get() 中获取数据, 否则调用 map() 获取数据
			value = data
		} else if (!data) {
			// 输入 undefined 则删除值
			delete value[key]
		} else {
			value[key] = data
		}
		// Tell each subscriber that data has been updated
		updateVisual()
	})

	function set(new_value: T): void {
		if (safe_not_equal(value, new_value)) {
			value = new_value
			updateVisual()
			gun.put(new_value)
		}
	}

	function update(fn: Updater<T>): void {
		set(fn(value))
	}

	function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
		const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate]
		subscribers.add(subscriber)

		// 订阅者数量 0 -> 1
		if (subscribers.size === 1) {
			stop = start(set) || noop
		}

		run(value)

		return () => {
			subscribers.delete(subscriber)

			// 订阅者数量 1 -> 0
			if (subscribers.size === 0) {
				stop()
				ref.off()
				stop = null
			}
		}
	}

	return { ...methods, set, update, subscribe }
}

const globalConfig = new Gun<GlobalConfig>()

// gun
// 	.get('globalConfig')
// 	.map()
// 	.on(function (node) {
// 		console.log(node)
// 	})
// gun.get('globalConfig').get('test').get('name').put('127.0.0.1')

const defaultconfig = {
	globalConfig: {
		windowConfig: defaultwindowConfig,
		appConfig: defaultAppConfig
	}
}

export const messages = writable<GlobalConfig>(globalConfig.get('globalConfig'), defaultconfig)
