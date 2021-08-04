<script lang="ts">
	import { AppBar } from '$lib/component/theme'
	import store from '$lib/store'
</script>

<AppBar {store}><slot /></AppBar>
