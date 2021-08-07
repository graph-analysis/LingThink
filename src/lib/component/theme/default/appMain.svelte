<script context="module" lang="ts">
	export interface AppSource {
		[id: string]: AppConfig
	}
</script>

<script lang="ts">
	import type { AppConfig, Store } from '$lib/store'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	export let store: Store
	export let appSourceURL: RequestInfo

	// 获取应用源的json
	const appSource = async () => (await (await fetch(appSourceURL)).json()) as AppSource

	const { localStore, remoteStore } = store
	const { userStore } = remoteStore

	onMount(async () => {})
</script>

<br />

<div class="container row">
	{#await appSource()}
		loading...
	{:then sources}
		{#each Object.values(sources) as source}
			<div class="col s12 m6 l4 xl3" id="item">
				<div class="card z-depth-3" id="itemcard">
					<div class="card-image">
						<img class="activator" alt={source.name} src={source.img} id="itemimg" />
						<button
							on:click={() => {
								goto('app', { state: source })
							}}
							class="btn-floating halfway-fab red"
							id="itembutton"><i class="material-icons">chevron_right</i></button
						>
					</div>

					<div class="card-content">
						<span class="card-title grey-text activator text-darken-4">{source.name}</span>
						<p><a href="/">{source.author}</a></p>
					</div>

					<div class="card-reveal">
						<span class="card-title grey-text text-darken-4"
							>{source.name}<i class="material-icons right">close</i></span
						>
						<p>
							{source.description}
						</p>
					</div>
				</div>
			</div>
		{:else}
			<p>No tasks today!</p>
		{/each}
	{/await}
</div>

<!-- <div class="container grid-stack">
	{JSON.stringify($userStore)}
	{JSON.stringify($localStore)}
</div> -->
<style lang="scss">
	$border: 16px;

	#item {
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 40px;
		transition: all 0.3s;
	}

	#item:hover {
		transform: scale(1.05);
	}

	#itemcard {
		border-radius: $border;
	}

	#itemimg {
		border-radius: $border $border 0px 0px;
	}

	#itemimg:hover {
		border-radius: $border $border 0px 0px;
	}
</style>
