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
	peerAddr?: string[] | string
	appConfig: AppConfig
	windowConfig: WindowConfig
}

const subscriber_queue = []

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
	ref: any,
	value?: T,
	start: StartStopNotifier<T> = noop,
	methods = {}
): Writable<T> {
	let store: T
	let stop: Unsubscriber
	const subscribers: Set<SubscribeInvalidateTuple<T>> = new Set()

	// Add a listener to GUN data
	ref.on((data: T, key: string | number) => {
		if (ref._.get === key) {
			// 从 gun.get() 中获取数据, 否则调用 map() 获取数据
			store = data
		} else if (!data) {
			// 输入 undefined 则删除值
			delete store[key]
		} else {
			store[key] = data
		}
		// Tell each subscriber that data has been updated
		set(store)
	})

	function set(new_value: T): void {
		if (safe_not_equal(value, new_value)) {
			value = new_value
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

const gun = Gun<GlobalConfig>()

export const messages = writable<GlobalConfig>(gun, {
	windowConfig: defaultwindowConfig,
	appConfig: defaultAppConfig
})
