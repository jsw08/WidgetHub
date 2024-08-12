<script lang="ts">
	import { calcGridSize, type GridSize } from '../Core/gridSize';
	import { setup } from '../Stores/Setup.svelte';
	import Paginator from './Paginator.svelte';

    let boxSize = $state(100);
    let gridSize: GridSize & {boxSize: number} = $state({
        rows: 0,
        cols: 0,
        boxSize: 0
    })
    const setSize = () => {
        gridSize = calcGridSize(innerWidth, innerHeight, boxSize)
        window.onresize = setSize;
    }
    $effect(setSize)
</script>

<h3 class="text-lg font-bold">Screen size</h3>
<p class="py-4">
	In order to keep your widgets in the same place every time, WidgetHub uses a fixed 'grid
	resolution' which consists of:
</p>
<ul class="list-disc px-4">
	<li>The size of one 'box', measured in pixels</li>
	<li>Amount of Rows</li>
	<li>Amount of Columns</li>
</ul>
<p class="py-4">
	This means that once you setup your resolution, you won't be able to use a different screen or
	window size with this profile until you reset the size in settings. Please note that this may
	break your widget layout.
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
		>Make sure your browser window is the correct size before clicking 'Next'! (e.g enter
		fullscreen)</span
	>
</div>

<Paginator next={() => {
    setup.profile.gridSize = gridSize;
}}>
	<input
		type="range"
		min="10"
		max="200"
		class="range"
		bind:value={boxSize}
	/>
	<div class="flex flex-col justify-center items-left text-xs font-mono w-32">
		<span>box : {gridSize.boxSize}</span>
        <span>rows: {gridSize.rows}</span>
        <span>cols: {gridSize.cols}</span>
	</div>
	<!-- <span class="w-12 flex justify-center">{setup.profile.gridSize.boxSize}</span> -->
</Paginator>
