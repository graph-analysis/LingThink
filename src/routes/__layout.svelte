<script lang="ts">
	import { AppBar, AppFrame } from '$lib/component/index'
	import { MaterialApp } from 'svelte-materialify'
	import { globalConfig, Mode } from '$lib/store'
	import { isLoading } from 'svelte-i18n'
	import { blur } from 'svelte/transition'

	// 加载国际化资源
	import '$lib/i18n/index'
</script>

<!-- 国际化资源加载完毕 -->
{#if !$isLoading}
	<MaterialApp>
		<div class="page" in:blur={{ duration: 200 }}>
			<!-- AppBar 组件 -->
			<AppBar windowConfig={$globalConfig.windowConfig} />

			<!-- 应用容器 -->
			<div class="container">
				{#if $globalConfig.windowConfig.mode === Mode.HOME}
					<!-- 主应用模式 -->
					<slot />
				{:else if $globalConfig.windowConfig.mode === Mode.MICRO_APP}
					<!-- 插件应用模式 -->
					<AppFrame appConfig={$globalConfig.appConfig} />
				{/if}
			</div>
		</div>
	</MaterialApp>
{/if}

<style>
	.page {
		display: flex;
		flex-direction: column;
	}
</style>
