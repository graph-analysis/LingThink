<script lang="ts">
	import { AppBar } from '$lib/component/theme'
	import store from '$lib/store/index'

	// 加载国际化资源
	import '$lib/i18n/index'
	import { isLoading } from 'svelte-i18n'
</script>

<!-- 国际化资源加载完毕 -->
{#if !$isLoading}
	<!-- AppBar 组件 -->
	<AppBar {store}><slot /></AppBar>
{/if}
