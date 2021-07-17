<script context="module" lang="ts">
	import type { MicroApp } from 'qiankun';
	import { onMount } from 'svelte';

	export interface AppConfig {
		name: string;
		source: string;
		target: string;
		index: string;
		data: any;
	}

	export interface SourceConfig {
		name: string;
		domain: string;
		prefix: string;
		customURL: any;
	}

	const makeCustomFetch =
		(source: SourceConfig, appConfig: AppConfig) =>
		(url: RequestInfo, ...args: RequestInit[]) => {
			return fetch(source.customURL(url, source, appConfig), ...args);
		};

	const defaultEntrySource: SourceConfig[] = [
		{
			name: 'jsdelivr',
			domain: 'cdn.jsdelivr.net',
			prefix: 'npm',
			customURL: (url: RequestInfo, source: SourceConfig, appConfig: AppConfig) =>
				url
					.toString()
					.replace(
						source.domain,
						`${source.domain}/${source.prefix}/${appConfig.target.replace('@latest', '')}`
					)
		},
		{
			name: 'github',
			domain: 'cdn.jsdelivr.net',
			prefix: 'gh',
			customURL: (url: RequestInfo, source: SourceConfig, appConfig: AppConfig) =>
				url
					.toString()
					.replace(
						source.domain,
						`${source.domain}/${source.prefix}/${appConfig.target.replace('@latest', '')}`
					)
		}
	];

	const prepare = (appConfig: AppConfig, customEntrySource: SourceConfig[] = []) => {
		const entrySource: SourceConfig[] = defaultEntrySource.concat(...customEntrySource);
		const source = entrySource.filter((item) => item.name === appConfig.source)[0];
		const entry = `//${source.domain}/${appConfig.index}`;
		const customFetch = makeCustomFetch(source, appConfig);
		return { entry, customFetch };
	};

	export const prefetchApp = async (
		appConfig: AppConfig,
		customEntrySource: SourceConfig[] = []
	) => {
		const { prefetchApps } = await import('qiankun');
		const { entry, customFetch } = prepare(appConfig, customEntrySource);
		console.log(`预取应用 ${appConfig.name}`);
		prefetchApps(
			[
				{
					name: appConfig.name,
					entry
				}
			],
			{
				fetch: customFetch
			}
		);
		return true;
	};
</script>

<script lang="ts">
	export let appConfig: AppConfig;
	export let customEntrySource: SourceConfig[] = [];
	export let app: MicroApp = undefined;

	let container: HTMLDivElement = undefined;
	const { entry, customFetch } = prepare(appConfig, customEntrySource);

	onMount(async () => {
		const { loadMicroApp } = await import('qiankun');
		app = loadMicroApp(
			{
				name: appConfig.name,
				entry,
				container,
				props: appConfig.data
			},
			{
				fetch: customFetch
			}
		);
	});
</script>

<div bind:this={container}><slot /></div>
