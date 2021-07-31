<script lang="ts">
	import { localStore, userStore } from '$lib/store'
	import { onMount } from 'svelte'

	const { ref } = userStore
	let data
	onMount(async () => {
		data = await ref.get('config').then()
	})
</script>

{JSON.stringify($userStore)}

{JSON.stringify($localStore)}
