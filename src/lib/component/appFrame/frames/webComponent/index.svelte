<!-- 等待svelte特性支持：https://github.com/sveltejs/svelte/pull/5481 -->
<script context="module" lang="ts">
	import { onMount } from 'svelte'
	import type { AppMetadata } from '..'
</script>

<script lang="ts">
	export let appMetadata: AppMetadata
	export let loadOK: boolean = false

	onMount(async () => {
		await import('systemjs/dist/system')
		System.import(appMetadata.entryURL)
		console.log(loadOK)
	})
</script>

<!-- web component插件框架 -->

<!-- <svelte:element tag={appMetadata.appConfig.name}/> -->
