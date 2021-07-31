<script lang="ts" context="module">
	import type { AppConfig } from '$lib/store/index'

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const appID = page.params.appID
		const r = await (await fetch('apps.json')).json()
		const appConfig: AppConfig = r?.app[appID]
		return { props: { appConfig: appConfig, host: page.host.split(':')[0] } }
	}
</script>

<script lang="ts">
	import { AppFrame } from '$lib/component'
	import { localStore, userStore } from '$lib/store'
	import { onMount } from 'svelte'
	export let appConfig: AppConfig
	export let host: string

	onMount(async () => {
		await userStore.ref.get('state').get('runtimeState').get('currentAppID').put(appConfig.id)
		$localStore.currentDomain = host
	})
</script>

{#if appConfig !== undefined}
	<AppFrame bind:localStore={$localStore} {appConfig} />
{/if}
