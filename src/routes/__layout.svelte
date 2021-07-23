<script lang="ts">
	import { AppBar, Checkbox, Button, Icon, MaterialApp } from 'svelte-materialify';
	import { mdiMenu } from '@mdi/js';
	import AppFrame from '$lib/component/appFrame/index.svelte';
	import { appConfig, windowConfig, Mode } from '$lib/store';
	import { _, isLoading } from 'svelte-i18n';
	import { blur } from 'svelte/transition';
	import '$lib/i18n/index';
</script>

<MaterialApp>
	{#if !$isLoading}
		<div class="page" in:blur={{ duration: 200 }}>
			<!-- todo: 自定义Appbar，拿到全局数据 -->
			<AppBar collapsed={$windowConfig.collapsed} class="primary-color theme--dark">
				<div slot="icon">
					<Button depressed fab text>
						<Icon path={mdiMenu} />
					</Button>
				</div>
				<span slot="title"
					>{$windowConfig.mode === Mode.MICRO_APP ? $appConfig.name : $_('LingThink')}</span
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
	{/if}
</MaterialApp>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}
</style>
