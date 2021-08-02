<script lang="ts">
	import type { Store } from '$lib/store'

	import { AppBar, Checkbox, Button, Icon, MaterialApp } from 'svelte-materialify'
	import { blur } from 'svelte/transition'
	import { _ } from 'svelte-i18n'
	import { mdiMenu } from '@mdi/js'

	export let store: Store
	const { localStore } = store
</script>

<MaterialApp>
	<div class="page" in:blur={{ duration: 200 }}>
		<!-- AppBar 任务栏组件 -->
		<AppBar collapsed={$localStore.collapsed} class="primary-color theme--dark">
			<div slot="icon">
				<Button depressed fab text>
					<Icon path={mdiMenu} />
				</Button>
			</div>
			<!-- todo: 获取appname -->
			<span slot="title">{$_('LingThink')} </span>
			<div style="flex-grow:1" />
			<Checkbox checked={$localStore.collapsed} />
		</AppBar>

		<!-- 主应用 -->
		<slot />
	</div>
</MaterialApp>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}
</style>
