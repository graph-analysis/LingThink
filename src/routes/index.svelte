<script lang="ts">
	import { userStore } from '$lib/store'
</script>

{JSON.stringify($userStore)}

<button
	on:click={() => {
		$userStore
	}}>fds</button
>
