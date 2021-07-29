<script lang="ts">
	import { AppBar, AppFrame } from '$lib/component/index'
	import { MaterialApp } from 'svelte-materialify'
	import { globalConfig, Mode } from '$lib/store'
	import { isLoading } from 'svelte-i18n'
	import { blur } from 'svelte/transition'
	import '$lib/i18n/index'
</script>

{#if !$isLoading}
	<MaterialApp>
		<div class="page" in:blur={{ duration: 200 }}>
			<AppBar windowConfig={$globalConfig.windowConfig} />

			<div class="container">
				{#if $globalConfig.windowConfig.mode === Mode.HOME}
					<slot />
				{:else if $globalConfig.windowConfig.mode === Mode.MICRO_APP}
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
