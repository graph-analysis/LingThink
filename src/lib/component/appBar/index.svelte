<script lang="ts">
	import { AppBar, Checkbox, Button, Icon } from 'svelte-materialify'
	import { mdiMenu } from '@mdi/js'
	import { _ } from 'svelte-i18n'
	import type { LocalStore } from '$lib/store'

	export let localStore: LocalStore
</script>

<AppBar collapsed={localStore.collapsed} class="primary-color theme--dark">
	<div slot="icon">
		<Button depressed fab text>
			<Icon path={mdiMenu} />
		</Button>
	</div>
	<!-- todo: 获取appname -->
	<span slot="title">{$_('LingThink')} </span>
	<div style="flex-grow:1" />
	<Checkbox checked={localStore.collapsed} />
</AppBar>
