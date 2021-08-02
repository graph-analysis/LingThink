<script lang="ts">
	import type { Store } from '$lib/store'

	export let store: Store
	const { localStore, remoteStore } = store
	const { userStore } = remoteStore
</script>

<div>
	<button
		on:click={async () => {
			await userStore.ref
				.get('state')
				.get('runtimeState')
				.get('currentAppID')
				.put(Date.now().toString())
		}}>clickme</button
	>
	{JSON.stringify($userStore)}
	{JSON.stringify($localStore)}
</div>
