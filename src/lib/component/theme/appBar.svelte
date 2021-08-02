<script lang="ts">
	import AppBar from './default/appBar.svelte'
	import type { Store } from '$lib/store'
	export let store: Store

	// 加载国际化资源
	import './i18n'
	import { isLoading } from 'svelte-i18n'
</script>

<!-- 国际化资源加载完毕 -->
{#if !$isLoading}
	<!-- AppBar 组件 -->
	<AppBar {store}>
		<!-- 微应用或者是 AppMain 组件 -->
		<slot />
	</AppBar>
{/if}
