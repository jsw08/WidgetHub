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
	// 	console.log(rows, cols)
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
		class="grid"
		class:grid-edit={gridUnderlay}
		class:grid-dragging={edit.dragging}
		style:grid-template-rows={`repeat(${rows}, minmax(0, ${boxSize}px))`}
		style:grid-template-columns={`repeat(${cols}, minmax(0, ${boxSize}px))`}
	>
		{#if gridUnderlay}
			{#each Array(rows) as _, y}
				{#each Array(cols) as _, x}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<span
						data-loc="{x}.{y}"
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

<div class="wrapper">
	{@render GridComp(false)}
	{@render GridComp(edit.edit)}
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		display: grid;
		place-content: center;
	}
	.grid {
		display: grid;
		border: solid gray 1px;
		border-radius: 5px;
		grid-area: center;
		width: fit-content;
		height: fit-content;
	}
	.grid-edit {
		z-index: -1;
	}
	.grid-dragging {
		z-index: 10;
	}
	span {
		width: 100%;
		height: 100%;
		border: 0.5px lightgray dashed;
	}
</style>
