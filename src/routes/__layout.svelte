<script lang="ts">
	import { AppBar } from '$lib/component/index'
	import { MaterialApp } from 'svelte-materialify'
	import { localStore } from '$lib/store/index'
	import { isLoading } from 'svelte-i18n'
	import { blur } from 'svelte/transition'

	// 加载国际化资源
	import '$lib/i18n/index'
</script>

<!-- 国际化资源加载完毕 -->
{#if !$isLoading}
	<MaterialApp>
		<div class="page" in:blur={{ duration: 200 }}>
			<!-- AppBar 任务栏组件 -->
			<AppBar bind:localStore={$localStore} />

			<!-- 应用视窗 -->
			<slot />
		</div>
	</MaterialApp>
{/if}

<style>
	.page {
		display: flex;
		flex-direction: column;
	}
</style>
