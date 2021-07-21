<script context="module" lang="ts">
	import { ProgressCircular } from 'svelte-materialify';
	import Qiankun, { prefetchApp } from '$lib/component/qiankun-svelte/index.svelte';
	import { fade } from 'svelte/transition';
	import type { MicroApp } from 'qiankun';
	import { onMount } from 'svelte';
	import { windowConfig } from '$lib/store/windowState';
	import type { AppConfig } from '$lib/store/appState';
</script>

<script lang="ts">
	export let appConfig: AppConfig;

	const splashScreenVedio: string = appConfig.splashScreenVedio;

	// 空字符串或未定义url就不播放
	let showLoadingVedio = splashScreenVedio === '' || splashScreenVedio === undefined ? false : true;

	let loadingVisible = false;
	let app: MicroApp;

	onMount(async () => {
		// 开始loading
		loadingVisible = true;
		// 在动画时预取应用
		prefetchApp(appConfig);
	});

	// 应用加载完毕，关掉动画
	const trunoff = async (app: MicroApp | undefined) => {
		if (app !== undefined) {
			const interval = setInterval(() => {
				switch (app.getStatus()) {
					case 'MOUNTED': {
						// 最小化AppBar、隐藏loading图标
						$windowConfig.collapsed = true;
						loadingVisible = false;
						clearInterval(interval);
						break;
					}
				}
			}, 100);
		}
	};

	$: [trunoff(app), $windowConfig.collapsed];
</script>

<div>
	{#if showLoadingVedio}
		<!-- Splash screen -->
		<video
			muted
			autoplay
			class="video"
			src={splashScreenVedio}
			transition:fade
			on:ended={() => {
				// 播放完毕自动消失
				showLoadingVedio = !showLoadingVedio;
			}}
		/>
	{:else}
		<div transition:fade>
			{#if loadingVisible}
				<div class="loading" transition:fade>
					<ProgressCircular size={70} indeterminate color="primary" />
				</div>
			{/if}
			<Qiankun {appConfig} bind:app />
		</div>
	{/if}
</div>

<svelte:head>
	<link rel="prefetch" href={splashScreenVedio} />
</svelte:head>

<style>
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	.video {
		position: absolute;
		margin: 0px;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		object-fit: fill;
		background-attachment: fixed;
	}
</style>
