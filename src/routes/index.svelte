<script lang="ts">
	import AppMain from './appMain.svelte'
	import store from '$lib/store'
	import { onMount } from 'svelte'

	onMount(async () => {
		// 同步 app 状态
		await store.remoteStore.userStore.ref
			.get('state')
			.get('runtimeState')
			.get('currentAppID')
			.put(null)
	})
</script>

<AppMain {store} />
