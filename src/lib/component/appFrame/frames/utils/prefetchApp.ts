import type { AppMetadata } from './appMetadata'
import { prefetchApp as QiankunPrefetch } from '../qiankun'
import { MicroAppType } from '$lib/store'

// 预取APP
const prefetchApp = async (appMetadata: AppMetadata) => {
	switch (appMetadata.appConfig.type) {
		case MicroAppType.QIANKUN:
			QiankunPrefetch(appMetadata)
			break
	}
}

export { prefetchApp }
