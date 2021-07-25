import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

enum MicroAppType {
	QIANKUN = 'QIANKUN',
	WEB_COMPONENT = 'WEB_COMPONENT'
}

interface AppConfig {
	name: string;
	type: MicroAppType;
	configURL: string;
	splashScreenVedio?: string;
	lockedDomain?: string[];
	data?: any;
}

const appConfig = <Writable<AppConfig>>writable({
	name: '大数据图可视分析',
	type: 'QIANKUN',
	configURL: 'https://cdn.jsdelivr.net/npm/@graph-analysis/grapher-2d/package.json'
});

export { appConfig, MicroAppType };

export type { AppConfig };
