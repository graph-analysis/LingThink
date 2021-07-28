enum MicroAppType {
	QIANKUN = 'QIANKUN',
	WEB_COMPONENT = 'WEB_COMPONENT'
}

interface AppConfig {
	name: string
	type: MicroAppType
	configURL: string
	splashScreenVedio?: string
	lockedDomain?: string[]
	data?: any
}

const defaultAppConfig = {
	name: '大数据图可视分析',
	type: MicroAppType.QIANKUN,
	configURL: 'https://cdn.jsdelivr.net/npm/@graph-analysis/grapher-2d/package.json'
}

export { MicroAppType, defaultAppConfig }

export type { AppConfig }
