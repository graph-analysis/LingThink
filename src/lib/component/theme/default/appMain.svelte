<script context="module" lang="ts">
	export interface AppSource {
		[id: string]: AppConfig
	}
</script>

<script lang="ts">
	import type { AppConfig, Store } from '$lib/store'
	import { goto } from '$app/navigation'
	export let store: Store
	export let appSourceURL: RequestInfo

	// 获取应用源的json
	const appSource = async () => (await (await fetch(appSourceURL)).json()) as AppSource

	process.env.NODE_ENV === 'development' && store
</script>

<br />

<div class="container row">
	{#await appSource()}
		loading...
	{:then sources}
		{#each Object.values(sources) as source}
			<div class="col s12 m6 l4 xl3" id="item">
				<div class="card" id="itemcard">
					<div class="card-image">
						<img height="180px" class="activator" alt={source.name} src={source.img} id="itemimg" />
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

	#itemcard:hover {
		box-shadow: 0 8px 17px 2px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%),
			0 5px 5px -3px rgb(0 0 0 / 20%);
	}

	#itemimg {
		border-radius: $border $border 0px 0px;
	}
</style>
