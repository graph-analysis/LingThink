<script lang="ts">
	import { AppBar, Checkbox, Button, Icon, MaterialApp } from 'svelte-materialify';
	import { mdiMenu } from '@mdi/js';
	import AppFrame from '$lib/component/appFrame/index.svelte';
	import { appConfig, windowConfig, Mode } from '$lib/store';
</script>

<MaterialApp>
	<div class="page">
		<!-- todo: 自定义Appbar，拿到全局数据 -->
		<AppBar collapsed={$windowConfig.collapsed} class="primary-color theme--dark">
			<div slot="icon">
				<Button depressed fab text>
					<Icon path={mdiMenu} />
				</Button>
			</div>
			<span slot="title"
				>{$windowConfig.mode === Mode.MICRO_APP ? $appConfig.name : 'LingThink'}</span
			>
			<div style="flex-grow:1" />
			<Checkbox bind:checked={$windowConfig.collapsed} />
		</AppBar>

		<div class="container">
			{#if $windowConfig.mode === Mode.HOME}
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
		flex-direction: column;
	}
</style>
