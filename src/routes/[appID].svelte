<script lang="ts">
	import type { AppConfig } from '$lib/store/index'
	import AppFrame from '$lib/component/appFrame'
	import store from '$lib/store'
	import { onMount } from 'svelte'
	import { getAPI } from '$lib/api'

	let appConfig: AppConfig

	const { localStore } = store

	onMount(async () => {
		// 记录目前的域名
		$localStore.currentDomain = globalThis.location.hostname
		appConfig = globalThis.history.state
	})
</script>

{#if appConfig}
	<AppFrame {store} {appConfig} api={getAPI(appConfig)} />
{/if}
