<script lang="ts">
	import { Card, CardText, CardActions, Button } from 'svelte-materialify';
	import { windowConfig, Mode } from '$lib/store';
	const toApp = () => {
		$windowConfig.mode = Mode.MICRO_APP;
	};
	// import { onMount } from 'svelte';

	// onMount(async () => {
	// 	System.import('https://gogakoreli.github.io/svelte-snake-web-component/bundle.js');
	// });
</script>

<svelte:head>
	<script
		type="application/javascript"
		src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"
		async></script>
</svelte:head>
<!-- todo: 构建应用列表视图，商店、订阅 -->
<div class="d-flex justify-center mt-4 mb-4">
	<Card outlined style="max-width:300px;">
		<div class="pl-4 pr-4 pt-3">
			<span class="text-overline"> OVERLINE </span>
			<br />
			<span class="text-h5 mb-2">Headline</span>
			<br />
		</div>
		<CardText>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, qui quaerat rerum
			incidunt nisi ducimus?
		</CardText>
		<CardActions>
			<Button rounded outlined on:click={toApp}>Button</Button>
		</CardActions>
	</Card>
	<!-- <svelte-snake data={9988} /> -->
</div>
