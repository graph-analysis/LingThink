import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface AppConfig {
	name: string;
	configURL: string;
	splashScreenVedio?: string;
	data?: any;
}

const appConfig = <Writable<AppConfig>>writable({
	name: '大数据图可视分析',
	configURL: 'https://cdn.jsdelivr.net/npm/@graph-analysis/grapher-2d@0.0.2-beta.11/package.json'
});

export { appConfig };

export type { AppConfig };
