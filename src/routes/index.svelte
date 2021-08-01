<script lang="ts">
	import { localStore, userStore } from '$lib/store'
	// import { onMount } from 'svelte'

	// const { ref } = userStore
	// let data
	// onMount(async () => {
	// 	data = await ref.get('config').then()
	// })
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
