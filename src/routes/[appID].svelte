<script lang="ts" context="module">
	import { AppConfig, userStore } from '$lib/store'
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const appID = page.params.appID
		const r = await (await fetch('a.json')).json()
		const appConfig: AppConfig = r?.app[appID]
		const status = appConfig === undefined ? 404 : 200

		console.log(page)
		return { props: { status: status, appConfig: appConfig } }
	}
</script>

<script lang="ts">
	import { AppFrame } from '$lib/component'
	export let appConfig: AppConfig
</script>

<AppFrame userStore={$userStore} {appConfig} />
