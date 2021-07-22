<script context="module" lang="ts">
	import QiankunFrame from './qiankun/index.svelte';
	import { MicroAppType } from '$lib/store/appState';
	import { onMount } from 'svelte';
	import type { AppMetadata } from './index';
</script>

<script lang="ts">
	export let appMetadata: AppMetadata;
	export let loadOK: boolean = false;

	let AppFrame: any;
	// appMetadata = await appMetadataGetter(appConfig);

	onMount(async () => {
		switch (appMetadata.appConfig.type) {
			case MicroAppType.QIANKUN:
				AppFrame = QiankunFrame;
				break;
			// todo: 增加webcomponent模式
			case MicroAppType.WEB_COMPONENT:
				AppFrame = QiankunFrame;
				break;
		}
	});
</script>

<svelte:component this={AppFrame} {appMetadata} bind:loadOK />
