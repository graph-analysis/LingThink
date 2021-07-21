<script lang="ts">
	import { AppBar, Checkbox, Button, Icon, MaterialApp } from 'svelte-materialify';
	import { mdiMenu } from '@mdi/js';
	import AppFrame from '$lib/component/appFrame/index.svelte';
	import { appConfig } from '$lib/store/appState';
	import { windowConfig, Mode } from '$lib/store/windowState';
</script>

<MaterialApp>
	<div class="page">
		<AppBar collapsed={$windowConfig.collapsed} class="primary-color theme--dark">
			<div slot="icon">
				<Button depressed fab text>
					<Icon path={mdiMenu} />
				</Button>
			</div>
			<span slot="title">{$appConfig.name}</span>
			<div style="flex-grow:1" />
			<Checkbox bind:checked={$windowConfig.collapsed} />
		</AppBar>

		<div class="container">
			{#if $windowConfig.mode === Mode.MAIN}
				<slot />
			{:else if $windowConfig.mode === Mode.MICRO_APP}
				<AppFrame appConfig={$appConfig} />
			{/if}
		</div>
	</div>
</MaterialApp>

<style>
	.page {
		display: flex;
	}
</style>
