import Gun from 'gun/gun.js'
import 'gun/lib/not.js'
import { noop, safe_not_equal } from 'svelte/internal'
import type { StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store'
import { defaultAppConfig } from './appState'
import type { AppConfig } from './appState'
import { defaultwindowConfig, WindowConfig } from './windowState'
type Invalidator<T> = (value?: T) => void
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]

/**全局应用配置信息
 * appConfig 当前应用配置信息
 * windowConfig 窗口配置信息
 * @interface GlobalConfig
 */
interface GlobalConfig {
	appConfig: AppConfig
	windowConfig: WindowConfig
}

/**GunDB 同步数据库
 * globalConfig 全局应用配置信息
 * @interface GunData
 */
interface GunData {
	globalConfig: GlobalConfig
}

const gun = new Gun<GunData>()
const subscriber_queue = []

/**GunDB 的 svelte Store 可写封装
 * @export
 * @template T
 * @param {*} ref gunDB 对象实例
 * @param {T} [defaultValue] 初始化默认值
 * @param {StartStopNotifier<T>} [start=noop] 开始和取消订阅监测函数
 * @param {*} [methods={}] 可自定义的拓展方法
 * @return {*}  {Writable<T>}
 */
export function writableGun<T>(
	ref: any,
	defaultValue?: T,
	start: StartStopNotifier<T> = noop,
	methods: any = {}
): Writable<T> {
	let stop: Unsubscriber
	let store = defaultValue || <T>{}
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
			// 更新视图层数据
			store = new_value
			// 更新视图
			updateVisual()
			// 更新持久层数据
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

/** 初始化全局配置Store
 * @template T
 * @param {T} defaultConfig
 * @param {StartStopNotifier<T>} [start=noop]
 * @param {*} [methods={}]
 * @return {*} {Writable<T>}
 */
const configStoreInit = <T>(
	defaultConfig: T,
	start: StartStopNotifier<T> = noop,
	methods: any = {}
): Writable<T> => {
	// 获取 globalConfig 集合
	const globalConfigStore = gun.get('globalConfig')

	// 无值就初始化本地数据库
	globalConfigStore.not((e) => {
		if (process.env.NODE_ENV === 'development') console.log('本地无数据,根据默认值创建:', e)
		globalConfigStore.put(defaultConfig)
	})

	return writableGun<T>(globalConfigStore.map(), defaultConfig, start, methods)
}

// 默认配置，用于初始化应用
const defaultGlobalConfig: GlobalConfig = {
	windowConfig: defaultwindowConfig,
	appConfig: defaultAppConfig
}

export const globalConfig = configStoreInit<GlobalConfig>(defaultGlobalConfig)
