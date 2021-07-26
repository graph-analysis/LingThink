<script lang="ts">
	import AppBar from '$lib/component/appBar/index.svelte'
	import { MaterialApp } from 'svelte-materialify'
	import AppFrame from '$lib/component/appFrame/index.svelte'
	import { appConfig, windowConfig, Mode } from '$lib/store'
	import { isLoading } from 'svelte-i18n'
	import { blur } from 'svelte/transition'
	import '$lib/i18n/index'
</script>

<MaterialApp>
	{#if !$isLoading}
		<div class="page" in:blur={{ duration: 200 }}>
			<AppBar windowConfig={$windowConfig} />

			<div class="container">
				{#if $windowConfig.mode === Mode.HOME}
					<slot />
				{:else if $windowConfig.mode === Mode.MICRO_APP}
					<AppFrame appConfig={$appConfig} />
				{/if}
			</div>
		</div>
	{/if}
</MaterialApp>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}
</style>
