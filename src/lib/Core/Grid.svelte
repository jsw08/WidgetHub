<script lang="ts">
	import type { Snippet } from 'svelte';
	import { calcGridSize, type GridSize } from './gridSize';
	import { edit, type MouseCoords } from '../Stores/Edit.svelte';
	import { profiles } from '../Stores/Profiles.svelte';

	let { rows, cols, boxSize } = $derived(profiles.profile.gridSize);

	// const setSize = () => {
	// 	let grid: GridSize = calcGridSize(innerWidth, innerHeight, boxSize);
	// 	rows = grid.rows;
	// 	cols = grid.cols;
	// };
	// $effect(setSize);

	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();
</script>

<!-- <svelte:window onresize={setSize} /> -->

{#snippet GridComp(gridUnderlay: boolean)}
	<div
		style="grid-area: center;"
		class="grid border-2 rounded-md w-fit h-fit"
		class:z-[-1]={gridUnderlay && !edit.dragging}
		class:z-10={edit.dragging && gridUnderlay}
		style:grid-template-rows={`repeat(${rows}, minmax(0, ${boxSize}px))`}
		style:grid-template-columns={`repeat(${cols}, minmax(0, ${boxSize}px))`}
	>
		{#if gridUnderlay}
			{#each Array(rows) as _, y}
				{#each Array(cols) as _, x}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<span
						class="w-full h-full border-dashed border-[1px] border-primary-content"
						onmouseover={(_) => {
							if (edit.dragMode === undefined) return;
							if (edit.dragMode === 'move') edit.moveWidget({ x, y });
							if (edit.dragMode === 'resize') edit.resizeWidget({ x, y });
						}}
					></span>
				{/each}
			{/each}
		{:else}
			{@render children()}
		{/if}
	</div>
{/snippet}

<div class="w-full h-full grid place-content-center">
	{@render GridComp(false)}
	{@render GridComp(edit.edit)}
</div>

<style>
</style>
