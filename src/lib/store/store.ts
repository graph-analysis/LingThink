// stores.js
import Gun from 'gun/gun.js'
import 'gun/lib/not.js'
import { noop, safe_not_equal } from 'svelte/internal'
import type { StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store'
import { defaultAppConfig } from './appState'
type Invalidator<T> = (value?: T) => void
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]
import type { AppConfig } from './appState'
import { defaultwindowConfig, WindowConfig } from './windowState'

interface GlobalConfig {
	appConfig: AppConfig
	windowConfig: WindowConfig
	loadOK: boolean
}

interface GunData {
	globalConfig: GlobalConfig
}

const gun = new Gun<GunData>()
const subscriber_queue = []

export function writableGun<T>(
	ref: any,
	start: StartStopNotifier<T> = noop,
	methods = {}
): Writable<T> {
	let stop: Unsubscriber
	let store = <T>{}
	const subscribers: Set<SubscribeInvalidateTuple<T>> = new Set()

	const updateVisual = () => {
		// Tell each subscriber that data has been updated
		if (stop) {
			// 向订阅者推送数据
			const run_queue = !subscriber_queue.length
			for (const subscriber of subscribers) {
				subscriber[1]()
				subscriber_queue.push(subscriber, store)
			}
			if (run_queue) {
				for (let i = 0; i < subscriber_queue.length; i += 2) {
					subscriber_queue[i][0](subscriber_queue[i + 1])
				}
				subscriber_queue.length = 0
			}
		}
	}

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
		updateVisual()
	})

	function set(new_value: T) {
		if (safe_not_equal(store, new_value)) {
			store = new_value
			updateVisual()
			gun.put(new_value)
		}
	}

	function update(fn: Updater<T>): void {
		set(fn(store))
	}

	function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
		const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate]
		subscribers.add(subscriber)

		// 订阅者数量 0 -> 1
		if (subscribers.size === 1) {
			stop = start(set) || noop
		}

		run(store)

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

const configStoreInit = <T>(defaultConfig: T, start: StartStopNotifier<T> = noop, methods = {}) => {
	const globalConfigStore = gun.get('globalConfig')

	globalConfigStore.not((e) => {
		if (process.env.NODE_ENV === 'development') console.log('本地无数据,根据默认值创建:', e)
		globalConfigStore.put(defaultConfig)
	})

	return writableGun<T>(globalConfigStore.map(), start, methods)
}

const defaultGlobalConfig: GlobalConfig = {
	windowConfig: defaultwindowConfig,
	appConfig: defaultAppConfig,
	loadOK: true
}

export const globalConfig = configStoreInit<GlobalConfig>(defaultGlobalConfig)
