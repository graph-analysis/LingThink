<!-- 乾坤插件框架 -->
<script context="module" lang="ts">
	import type { MicroApp } from 'qiankun'
	import { onMount } from 'svelte'
	import type { AppMetadata } from '..'
	import type { API } from '$lib/api'
</script>

<script lang="ts">
	export let appMetadata: AppMetadata
	export let loadOK: boolean = false
	export let api: API

	let app: MicroApp
	let container: HTMLDivElement

	onMount(async () => {
		const { loadMicroApp } = await import('qiankun')
		const entry = appMetadata.entryURL
		const customFetch = appMetadata.getCustomFetch()

		app = loadMicroApp(
			{
				name: appMetadata.appConfig.name,
				entry,
				container,
				props: { api }
			},
			{
				fetch: customFetch
			}
		)
	})

	// 应用加载完毕，返回完成状态
	const ok = async (app: MicroApp | undefined) => {
		if (app !== undefined) {
			const interval = setInterval(() => {
				if (app.getStatus() === 'MOUNTED') {
					loadOK = true
					clearInterval(interval)
				}
			}, 100)
		}
	}

	$: ok(app)
</script>

<div bind:this={container}><slot /></div>
