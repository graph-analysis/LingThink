/**插件应用的类型
 * QIANKUN 乾坤微应用 https://qiankun.umijs.org/
 * WEB_COMPONENT web_component 应用 https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
 * @enum {number}
 */
enum MicroAppType {
	QIANKUN = 'QIANKUN',
	WEB_COMPONENT = 'WEB_COMPONENT'
}

/**应用配置信息
 * 来源于插件中心
 *	name 应用名称
 *	type 插件类型
 *	configURL 配置文件URL
 *	splashScreenVedio 启动视频的URL(必须允许跨域)
 *  lockedDomain 应用的允许域名 (null 为允许所以域名 / 本地域名默认允许)
 * 	data 初始化时向应用传递的数据
 * @interface AppConfig
 */
interface AppConfig {
	id: string
	name: string
	type: MicroAppType
	configURL: string
	splashScreenVedio?: string
	lockedDomain?: string[]
}

export { MicroAppType }
export type { AppConfig }
