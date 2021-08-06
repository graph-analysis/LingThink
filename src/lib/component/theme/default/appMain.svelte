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

	const { localStore, remoteStore } = store
	const { userStore } = remoteStore
</script>

<div>
	<!-- {JSON.stringify($userStore)}
	{JSON.stringify($localStore)} -->

	{#await appSource()}
		loading...
	{:then sources}
		{#each Object.values(sources) as source}
			<div
				class="col s12 m8 offset-m2 l6 offset-l3"
				on:click={() => {
					goto('app', { state: source })
				}}
			>
				<div class="card-panel grey lighten-5 z-depth-1">
					<div class="row valign-wrapper">
						<div class="col s2">
							<img src={source.icon} alt="" class="circle responsive-img" />
						</div>
						<div class="col s10">
							<span class="black-text">
								{source.name}-{source.type}-{source.author}
								{source.description}
							</span>
						</div>
					</div>
				</div>
			</div>

			{source.configURL}
		{:else}
			<p>No tasks today!</p>
		{/each}
	{/await}
</div>
