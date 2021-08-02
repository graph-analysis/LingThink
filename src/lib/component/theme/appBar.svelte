<script lang="ts">
	import AppBar from './default/appBar.svelte'
	import { getLocaleFromNavigator, init } from 'svelte-i18n'
	import type { Store } from '$lib/store'
	export let store: Store

	const { remoteStore } = store
	const { userStore } = remoteStore
	// 加载国际化资源
	import './i18n'
	import { isLoading } from 'svelte-i18n'

	// 初始化语言模块
	init({
		fallbackLocale: 'zh',
		// 加载语言配置
		initialLocale: $userStore.config.windowConfig.language
	})
</script>

<!-- 国际化资源加载完毕 -->
{#if !$isLoading}
	<!-- AppBar 组件 -->
	<AppBar {store}>
		<!-- 微应用或者是 AppMain 组件 -->
		<slot />
	</AppBar>
{/if}
