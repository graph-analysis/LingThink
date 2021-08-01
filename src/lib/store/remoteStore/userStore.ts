import Gun from 'gun/gun.js'
import 'gun/lib/not.js'
import 'gun/lib/then.js'
import type { IGunChainReference } from 'gun/types/chain'
import { noop } from 'svelte/internal'
import type { Readable, StartStopNotifier, Subscriber, Unsubscriber } from 'svelte/store'
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
 * 	runtimeState 运行时信息
 * 	appState 应用状态
 *
 * @interface UserStore
 */
interface UserStore {
	config: Config
	state: State
}

/**配置集合
 * @interface Config
 */
interface Config {
	windowConfig: WindowConfig
}

/**状态集合
 * @interface State
 */
interface State {
	runtimeState: RuntimeState
	appState: AppState
}

/**GunDB 同步数据库
 * userStore 用户个人同步信息
 * @interface GunData
 */
interface GunData {
	userStore: UserStore
	sourceStore: {}
}

/**Gun的可写储存
 * methods 一些自定义方法
 * ref gun数据库引用
 * @interface GunWritable
 * @extends {Writable<T>}
 * @template T
 */
interface GunReadable<T> extends Readable<T> {
	methods: Array<Function>
	ref: IGunChainReference<T, any, 'pre_root'>
}

const subscriber_queue = []

/**GunDB 的 svelte Store 可写封装
 * @template T
 * @param {*} ref gunDB 对象实例
 * @param {T} [defaultValue=<T>{}] 初始化默认值
 * @param {StartStopNotifier<T>} [start=noop] 开始和取消订阅监测函数
 * @param {*} [methods={}] 可自定义的拓展方法
 * @param {*} [interval=5] 渲染批处理时间窗口长度
 * @return {*}  {GunReadable<T>}
 */
function writableGun<T>(
	ref: any,
	defaultValue: T = <T>{},
	start: StartStopNotifier<T> = noop,
	methods: any = {},
	interval: number = 5
): GunReadable<T> {
	let stop: Unsubscriber
	let store = defaultValue
	let cront: NodeJS.Timer
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

	const applyVisual = () => {
		cront =
			cront ||
			setInterval(() => {
				updateVisual()
				clearInterval(cront)
				cront = undefined
			}, interval)
	}

	// 数据初始化并监听每个数据末尾分支
	ref.once(async (data: any) => {
		// 递归数据到基本类型
		const searchObject = async (obj: any, ref: any, store: T) => {
			for (const key in obj) {
				const nextLayer = ref.get(key)
				const nextLayerValue = await nextLayer
				const v = obj[key]
				if (key !== '#') {
					if (key !== '_') {
						if (v instanceof Object) {
							store[key] = store[key] || {}
							await searchObject(nextLayerValue, nextLayer, store[key])
						} else {
							// 监听数据改动
							nextLayer.on(async (data: any, key: string | number) => {
								// 更新数据
								store[key] = data
								if (process.env.NODE_ENV === 'development') console.log('更新数据', key)
								// 更新视图
								applyVisual()
							})
						}
					}
				}
			}
		}

		await searchObject(data, ref, store)
	})

	async function set(new_value: T) {
		// 更新持久层数据 todo:对比js树，只更新变化数据
		ref.put(new_value)
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

	return { ...methods, subscribe, ref }
}

const gun = new Gun<GunData>()

/** 用户个人信息同步Store
 * @template T
 * @param {T} defaultValue
 * @param {StartStopNotifier<T>} [start=noop]
 * @param {*} [methods={}]
 * @return {*} {GunReadable<T>}
 */
const storeInit = <T>(
	defaultValue: T,
	start: StartStopNotifier<T> = noop,
	methods: any = {}
): GunReadable<T> => {
	// 获取 globalConfig 集合
	const userStore = gun.get('userStore')

	// 无值就初始化本地数据库
	userStore.not((e: any) => {
		if (process.env.NODE_ENV === 'development') console.log('本地无数据,根据默认值创建:', e)
		// .put(defaultUserStore)
		userStore.put(defaultValue)
	})

	return writableGun<T>(userStore, defaultValue, start, methods)
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

export type { UserStore, GunReadable }
// 避免直接使用 set 方法重设储存, 尽量使用 ref
export const userStore = storeInit<UserStore>(defaultUserStore)
