<script lang="ts">
	import { calcGridSize, type GridSize } from '../Core/gridSize';
	import { setup } from '../Stores/Setup.svelte';
	import Paginator from './Paginator.svelte';

	let boxSize = $state(100);
	let gridSize: GridSize & { boxSize: number } = $state({
		rows: 0,
		cols: 0,
		boxSize: 0
	});
	let boxVisibility = $state(false);
	const setSize = () => {
		gridSize = calcGridSize(innerWidth, innerHeight, boxSize);
		window.onresize = setSize;
	};
	$effect(setSize);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<h3 class="text-lg font-bold">Screen size</h3>
<p class="py-4">
	To ensure your widgets remain in the same position each time, WidgetHub utilizes a fixed 'grid
	resolution' that includes:
</p>
<ul class="list-disc px-4">
	<li>The dimensions of a single 'box' (or tile), measured in pixels</li>
	<li>Number of Rows</li>
	<li>Number of Columns</li>
</ul>
<p class="py-4">
	This means that once you configure your resolution, you won't be able to use a different screen or
	window size with this profile until you adjust the size in settings. Please be aware that this may
	disrupt your widget layout.
</p>
<div role="alert" class="alert alert-warning">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 shrink-0 stroke-current"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		/>
	</svg>
	<span
		>Ensure your browser window is the correct size (and in fullscreen) before clicking 'Next'!</span
	>
</div>

<Paginator
	next={() => {
		setup.profile.gridSize = gridSize;
	}}
>
	<input
		type="range"
		min="10"
		max="200"
		class="range"
		bind:value={boxSize}
		onmousedown={(_) => (boxVisibility = true)}
		onmouseup={(_) => (boxVisibility = false)}
	/>
	<div class="flex flex-col justify-center items-left text-xs font-mono w-32">
		<span>box : {gridSize.boxSize}</span>
		<span>rows: {gridSize.rows}</span>
		<span>cols: {gridSize.cols}</span>
	</div>
	<!-- <span class="w-12 flex justify-center">{setup.profile.gridSize.boxSize}</span> -->
</Paginator>

<svelte:window />
{#if boxVisibility}
	<div
		class="absolute border-2 rounded-sm grid place-content-center select-none z-10 -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 bg-base-200 opacity-80"
		style:width="{boxSize}px"
		style:height="{boxSize}px"
	></div>
{/if}
