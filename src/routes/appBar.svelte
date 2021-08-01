<script lang="ts">
	import { AppBar } from '$lib/component/index'
	import { MaterialApp } from 'svelte-materialify'
	import { blur } from 'svelte/transition'
	import type { Store } from '$lib/store'

	export let store: Store
	const { localStore } = store
</script>

<MaterialApp>
	<div class="page" in:blur={{ duration: 200 }}>
		<!-- AppBar 任务栏组件 -->
		<AppBar bind:localStore={$localStore} />

		<!-- 主应用 -->
		<slot />
	</div>
</MaterialApp>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}
</style>
