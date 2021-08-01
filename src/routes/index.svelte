<script lang="ts">
	import { localStore, userStore } from '$lib/store'
	import { onMount } from 'svelte'

	onMount(async () => {
		// 同步 app 状态
		await userStore.ref.get('state').get('runtimeState').get('currentAppID').put(null)
	})
</script>

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
