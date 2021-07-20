<script context="module" lang="ts">
	import {
		AppBar,
		Checkbox,
		Button,
		Icon,
		MaterialApp,
		ProgressCircular
	} from 'svelte-materialify';
	import { mdiMenu } from '@mdi/js';
	import Qiankun, { prefetchApp } from '$lib/qiankun-svelte/index.svelte';

	import type { AppConfig } from '$lib/qiankun-svelte/index.svelte';
	import { fade } from 'svelte/transition';
	import type { MicroApp } from 'qiankun';
	import { onMount } from 'svelte';

	const splashScreenVedio = 'loading.mp4';
	const config: AppConfig = {
		name: 'myapp',
		configURL: 'https://cdn.jsdelivr.net/npm/@graph-analysis/grapher-2d@0.0.2-beta.11/package.json',
		data: {}
	};
</script>

<script lang="ts">
	let collapsed = false;
	let showLoadingVedio = true;
	let loadingVisible = true;
	let app: MicroApp;

	onMount(async () => {
		// 在动画时预取应用
		prefetchApp(config);
	});

	// 应用加载完毕，关掉动画
	const trunoff = async (app: MicroApp | undefined) => {
		if (app !== undefined) {
			const interval = setInterval(() => {
				switch (app.getStatus()) {
					case 'MOUNTED': {
						// 最小化AppBar、隐藏loading图标
						collapsed = !collapsed;
						loadingVisible = false;
						clearInterval(interval);
						break;
					}
				}
			}, 100);
		}
	};

	$: trunoff(app);
</script>

<MaterialApp>
	<AppBar {collapsed} class="primary-color theme--dark">
		<div slot="icon">
			<Button depressed fab text>
				<Icon path={mdiMenu} />
			</Button>
		</div>
		<span slot="title">大数据图可视分析</span>
		<div style="flex-grow:1" />
		<Checkbox bind:checked={collapsed} />
	</AppBar>

	<div class="container">
		<slot />

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
			<div class="bk" transition:fade>
				{#if loadingVisible}
					<div class="loading" transition:fade>
						<ProgressCircular size={70} indeterminate color="primary" />
					</div>
				{/if}
				<Qiankun appConfig={config} bind:app />
			</div>
		{/if}
	</div>
</MaterialApp>

<svelte:head>
	<link rel="prefetch" href={splashScreenVedio} />
</svelte:head>

<style>
	.container {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	.bk {
		background-color: white;
		display: flex;
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
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
