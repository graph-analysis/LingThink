import Gun from 'gun/gun.js'
import 'gun/lib/not.js'
import { noop, safe_not_equal } from 'svelte/internal'
import type { StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store'
import type { AppState } from './appState'
import { defaultRuntimeState, RuntimeState } from './runtimeState'
import { defaultWindowConfig, WindowConfig } from './windowConfig'
type Invalidator<T> = (value?: T) => void
type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]

/**用户个人同步信息<todo: 加密>
 * --- config 配置
 * 	windowConfig 窗口配置
 *
 * --- state 状态
 * 	appState 应用状态
 * 	runtimeState 运行时信息
 *
 * @interface UserStore
 */
interface UserStore {
	config: Config
	state: State
}

interface Config {
	windowConfig: WindowConfig
}

interface State {
	runtimeState: RuntimeState
	appState: AppState
}

/**GunDB 同步数据库
 * globalConfig 全局应用配置信息
 * @interface GunData
 */
interface GunData {
	userStore: UserStore
	sourceStore: {}
}

// const initDatabase = (obj: any, gun: any) => {
// 	// 如果不存在则存下
// 	const putIfNot = (defaultValue: any, gun: any) =>
// 		gun.not((e: any) => {
// 			if (process.env.NODE_ENV === 'development') console.log('本地无数据,根据默认值创建:', e)
// 			gun.put(defaultValue)
// 		})

// 	// 递归到基本类型
// 	const searchObject = (obj: object, gun: any) => {
// 		for (const key in obj) {
// 			const v = obj[key]
// 			if (v !== null) {
// 				if (typeof v === 'object') {
// 					searchObject(v, putIfNot(obj[key], gun.get(key)))
// 				}
// 			}
// 		}
// 	}

// 	searchObject(obj, gun)
// }

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
	defaultValue: T = <T>{},
	start: StartStopNotifier<T> = noop,
	methods: any = {}
): Writable<T> {
	let stop: Unsubscriber
	let store = defaultValue
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

	ref.on(async (data: T, key: string | number) => {
		// todo: 判断是否是 obj 是则递归监听 once 且只能从树枝更新
		console.log('数据库修改为', key, data)
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
		// console.log('更新为', new_value)
		if (safe_not_equal(store, new_value)) {
			// 更新视图层数据
			store = new_value
			// 更新视图
			updateVisual()
			// 更新持久层数据
			ref.put(new_value)
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

const gun = new Gun<GunData>()

/** 用户个人信息同步Store
 * @template T
 * @param {T} defaultUserStore
 * @param {StartStopNotifier<T>} [start=noop]
 * @param {*} [methods={}]
 * @return {*} {Writable<T>}
 */
const userStoreInit = <T>(
	defaultUserStore: T,
	start: StartStopNotifier<T> = noop,
	methods: any = {}
): Writable<T> => {
	// 获取 globalConfig 集合
	const userStore = gun.get('userStore')

	// 无值就初始化本地数据库
	userStore.not((e: any) => {
		if (process.env.NODE_ENV === 'development') console.log('本地无数据,根据默认值创建:', e)
		// .put(defaultUserStore)
		userStore.put(defaultUserStore)
	})

	return writableGun<T>(userStore.map(), defaultUserStore, start, methods)
}

// 默认配置，用于初始化应用
const defaultUserStore: UserStore = {
	config: {
		windowConfig: defaultWindowConfig
	},
	state: {
		runtimeState: defaultRuntimeState,
		appState: <AppState>{}
	}
}

export type { UserStore }
export const userStore = userStoreInit<UserStore>(defaultUserStore)
