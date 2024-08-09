<script lang="ts">
	import type { Snippet } from 'svelte';
	import { calcGridSize, type GridSize } from './gridSize';
	import {edit} from "../Stores/Edit.svelte"

	let rows: number = $state(0);
	let cols: number = $state(0);
	let boxSize: number = 50;

	const setSize = () => {
		let grid: GridSize = calcGridSize(innerWidth, innerHeight, boxSize);
		rows = grid.rows;
		cols = grid.cols;
	};
	$effect(setSize);

	type Props = {
		children: Snippet,
	};
	let { children }: Props = $props();
</script>
<svelte:window onresize={setSize} />

{#snippet GridComp(gridUnderlay: boolean)}
	<div
		class="grid"
		class:grid-edit={gridUnderlay}
		style:grid-template-rows={`repeat(${rows}, minmax(0, ${boxSize}px))`}
		style:grid-template-columns={`repeat(${cols}, minmax(0, ${boxSize}px))`}
	>
		{#if gridUnderlay}
			{#each Array(rows) as _, y}
				{#each Array(cols) as _, x}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<span onmousemove={_ => edit.mouseCoords = {x, y}}></span>
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
	}
	.grid-edit {
		z-index: -1;
	}
	span {
		width: 100%;
		height: 100%;
		border: 0.5px lightgray dashed;
	}
</style>
