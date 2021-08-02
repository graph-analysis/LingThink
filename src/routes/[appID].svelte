<script lang="ts" context="module">
	import type { AppConfig } from '$lib/store/index'

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const appID = page.params.appID
		const r = await (await fetch('apps.json')).json()
		const appConfig: AppConfig = r?.app[appID]
		// 传递初始化的 appConfig 和 域名
		return { props: { appConfig: appConfig, host: page.host.split(':')[0] } }
	}
</script>

<script lang="ts">
	import AppFrame from '$lib/component/appFrame'
	import store from '$lib/store'
	import { onMount } from 'svelte'
	const { remoteStore, localStore } = store
	export let appConfig: AppConfig
	export let host: string

	onMount(async () => {
		// 同步 app 状态
		await remoteStore.userStore.ref
			.get('state')
			.get('runtimeState')
			.get('currentAppID')
			.put(appConfig.id)

		// 记录目前的域名
		$localStore.currentDomain = host
	})
</script>

{#if appConfig !== undefined}
	<AppFrame {store} {appConfig} />
{/if}
