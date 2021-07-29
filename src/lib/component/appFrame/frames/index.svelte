<script context="module" lang="ts">
	import QiankunFrame from './qiankun/index.svelte'
	import WebComponentFrame from './webComponent/index.svelte'
	import { MicroAppType } from '$lib/store/appState'
	import { onMount } from 'svelte'
	import type { AppMetadata } from './index'
</script>

<script lang="ts">
	export let appMetadata: AppMetadata
	export let loadOK: boolean = false

	let AppFrame: any

	onMount(async () => {
		// 自动根据应用类型加载插件框架
		switch (appMetadata.appConfig.type) {
			case MicroAppType.QIANKUN:
				AppFrame = QiankunFrame
				break
			case MicroAppType.WEB_COMPONENT:
				AppFrame = WebComponentFrame
				break
		}
	})
</script>

<svelte:component this={AppFrame} {appMetadata} bind:loadOK />
