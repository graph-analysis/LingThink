<script lang="ts">
	import { AppBar, Checkbox, Button, Icon } from 'svelte-materialify'
	import { mdiMenu } from '@mdi/js'
	// import { userStore } from 'lib/store'
	import { _ } from 'svelte-i18n'
	import type { UserStore } from '$lib/store'

	export let userStore: UserStore
</script>

<AppBar collapsed={userStore.state.runtimeState.collapsed} class="primary-color theme--dark">
	<div slot="icon">
		<Button depressed fab text>
			<Icon path={mdiMenu} />
		</Button>
	</div>
	<!-- todo: 获取appname -->
	<span slot="title"
		>{userStore.state.runtimeState.currentAppID === null
			? $_('LingThink')
			: userStore.state.runtimeState.currentAppID}</span
	>
	<div style="flex-grow:1" />
	<Checkbox bind:checked={userStore.state.runtimeState.collapsed} />
</AppBar>
