<script context="module" lang="ts">
	import { fade } from 'svelte/transition'
	import { Jumper } from 'svelte-loading-spinners'
	import AutoFrame from './frames/index.svelte'
	import { appMetadataGetter } from './frames'
	import type { AppConfig, Store } from '$lib/store'
</script>

<script lang="ts">
	export let appConfig: AppConfig
	export let store: Store

	const { localStore, remoteStore } = store
	const { userStore } = remoteStore
	const splashScreenVedio: string = appConfig.splashScreenVedio

	// 空字符串或未定义url就不播放
	let showLoadingVedio =
		splashScreenVedio === null || splashScreenVedio === undefined ? false : true
	// 加载动画是否显示
	let loadingVisible = false
	// 加载完毕
	let loadOK = false

	// 获取应用运行元数据
	const getAppMetadata = async () => {
		// 开始loading
		loadingVisible = true
		return await appMetadataGetter(appConfig, $localStore)
	}

	$: if (loadOK) {
		// 结束loading
		loadingVisible = false
		// 最小化appbar
		$localStore.collapsed = true
	}
</script>

<div>
	{#await getAppMetadata() then appMetadata}
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
					showLoadingVedio = false
				}}
			/>
		{:else}
			<div transition:fade>
				{#if loadingVisible}
					<div class="loading" transition:fade>
						<Jumper size="100" color={$userStore.config.windowConfig.themeColor} unit="px" />
					</div>
				{/if}
				<AutoFrame {appMetadata} bind:loadOK />
			</div>
		{/if}
	{:catch error}
		{error}
	{/await}
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
