<script lang="ts">
	import { AppBar, Checkbox, Button, Icon } from 'svelte-materialify';
	import { mdiMenu } from '@mdi/js';
	import { appConfig, windowConfig, Mode } from '$lib/store';
	import { _ } from 'svelte-i18n';
</script>

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
