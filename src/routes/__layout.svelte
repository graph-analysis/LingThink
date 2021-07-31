<script lang="ts">
	import { AppBar } from '$lib/component/index'
	import { MaterialApp } from 'svelte-materialify'
	import { localStore } from '$lib/store/index'
	import { isLoading } from 'svelte-i18n'
	import { blur } from 'svelte/transition'

	// 加载国际化资源
	import '$lib/i18n/index'

	/**初始化信息
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		console.log(page.host.split(':')[0])
		$localStore.currentDomain = page.host.split(':')[0]
	}
</script>

<!-- 国际化资源加载完毕 -->
{#if !$isLoading}
	<MaterialApp>
		<div class="page" in:blur={{ duration: 200 }}>
			<!-- AppBar 组件 -->
			<AppBar bind:localStore={$localStore} />

			<!-- 主应用容器 -->
			<div class="container">
				<slot />
				<!-- {#if $userStore.state.runtimeState.mode === Mode.MAIN}
					<slot />
				{:else if $userStore.state.runtimeState.mode === Mode.MICRO_APP}
					<AppFrame userStore={$userStore} />
				{/if} -->
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
