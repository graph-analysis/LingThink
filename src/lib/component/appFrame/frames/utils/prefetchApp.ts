import type { AppMetadata } from './appMetadata';
import { prefetchApp as QiankunPrefetch } from '../qiankun';

// 预取APP
// todo:自动判断是哪个框架
const prefetchApp = async (appMetadata: AppMetadata) => {
	QiankunPrefetch(appMetadata);
};

export { prefetchApp };
