<script lang="ts">
	import type { Store } from '$lib/store'
	import { blur } from 'svelte/transition'
	import { _ } from 'svelte-i18n'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let store: Store

	let fixedButton: HTMLDivElement
	const { localStore } = store

	onMount(async () => {
		M.FloatingActionButton.init(fixedButton, {
			direction: 'left',
			hoverEnabled: false
		})
	})

	const fixedButtonHook = (inMicroApp: boolean) => {
		switch (inMicroApp) {
			case true:
				goto('/')
				break
			case false:
				break
		}
	}
</script>

<div class="page" in:blur={{ duration: 200 }}>
	<!-- AppBar 任务栏组件 -->
	<div class="fixed-action-btn" bind:this={fixedButton}>
		<button
			class="btn-floating btn-large red"
			on:click={() => {
				fixedButtonHook($localStore.inMicroApp)
			}}
		>
			<i class="large material-icons">{$localStore.inMicroApp ? 'arrow_back' : 'menu'}</i>
		</button>
		<ul>
			<li />
		</ul>
	</div>

	<!-- 主应用 -->
	<slot />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}

	/* fallback */
	@font-face {
		font-family: 'Material Icons';
		font-style: normal;
		font-weight: 400;
		src: url('/icon.woff2') format('woff2');
	}

	:global(.material-icons) {
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 24px;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
	}
</style>
