<script lang="ts">
	import { AppBar, Checkbox, Button, Icon } from 'svelte-materialify'
	import { mdiMenu } from '@mdi/js'
	import type { WindowConfig } from '$lib/store'
	import { _ } from 'svelte-i18n'

	export let windowConfig: WindowConfig
</script>

<AppBar collapsed={windowConfig.collapsed} class="primary-color theme--dark">
	<div slot="icon">
		<Button depressed fab text>
			<Icon path={mdiMenu} />
		</Button>
	</div>
	<span slot="title"
		>{windowConfig.currentApp === undefined ? $_('LingThink') : windowConfig.currentApp}</span
	>
	<div style="flex-grow:1" />
	<Checkbox bind:checked={windowConfig.collapsed} />
</AppBar>
