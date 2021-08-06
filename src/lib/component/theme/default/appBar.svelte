<script lang="ts">
	import type { Store } from '$lib/store'
	import { blur } from 'svelte/transition'
	import { _ } from 'svelte-i18n'

	export let store: Store
	const { localStore } = store
</script>

<div class="page" in:blur={{ duration: 200 }}>
	<!-- AppBar 任务栏组件 -->
	<!-- <AppBar collapsed={$localStore.collapsed} class="primary-color theme--dark"> -->
	<!-- <nav>
		<div class="nav-wrapper">
			<form>
				<div class="input-field">
					<input id="search" type="search" required />
					<label class="label-icon" for="search"><i class="material-icons">search</i></label>
					<i class="material-icons">close</i>
				</div>
			</form>
		</div>
	</nav> -->
	<!-- 主应用 -->
	<slot />
</div>

<style>
	@import '@materializecss/materialize/dist/css/materialize.min.css';

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
