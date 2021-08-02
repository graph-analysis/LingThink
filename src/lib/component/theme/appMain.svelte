<script lang="ts">
	import AppMain from './default/appMain.svelte'
	import type { Store } from '$lib/store'
	export let store: Store
</script>

<AppMain {store} />
