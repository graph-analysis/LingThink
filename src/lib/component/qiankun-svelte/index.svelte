<script context="module" lang="ts">
	import type { MicroApp } from 'qiankun';
	import { onMount } from 'svelte';
	import GetPluginMetadata from '.';
	import type { AppConfig } from '$lib/store/appState';

	const prepare = async (appConfig: AppConfig) => {
		const appMetadataGetter = new GetPluginMetadata();
		const appMetadata = await appMetadataGetter.init(appConfig.configURL);

		const entry = appMetadata.getEntryURL();
		const customFetch = appMetadata.getCustomFetch();
		return { entry, customFetch };
	};

	const prefetchApp = async (appConfig: AppConfig) => {
		const { prefetchApps } = await import('qiankun');
		const { entry, customFetch } = await prepare(appConfig);
		if (process.env.NODE_ENV === 'development') console.log(`预取应用 ${appConfig.name}`);
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

	export { prefetchApp };
</script>

<script lang="ts">
	export let appConfig: AppConfig;
	export let app: MicroApp = undefined;

	let container: HTMLDivElement;

	onMount(async () => {
		const { loadMicroApp } = await import('qiankun');
		const { entry, customFetch } = await prepare(appConfig);
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
