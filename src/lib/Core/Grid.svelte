<script lang="ts">
	import type { Snippet } from 'svelte';
	import { edit } from '../Stores/Edit.svelte';
	import { profiles } from '../Stores/Profiles.svelte';

	let { rows, cols, boxSize } = $derived(profiles.profile.gridSize);

	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();
	$effect(() => console.info(edit.dragging, edit.dragMode));

	const mouseOverHandler = (x: number, y: number) => {
		if (!edit.dragging || edit.dragMode === undefined) return;
		if (edit.dragMode === 'move') edit.moveWidget({ x, y });
		if (edit.dragMode === 'resize') edit.resizeWidget({ x, y });
	};
	const clickHandler = (x: number, y: number) =>
		edit.dragging && edit.dragMode === 'place' && edit.isPlaceable(x, y)
			? edit.placeWidget(x, y)
			: void 0;
</script>

{#snippet GridComp(gridUnderlay: boolean)}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		style="grid-area: center;"
		class="grid rounded-md w-fit h-fit"
		style:grid-template-rows={`repeat(${rows}, minmax(0, ${boxSize}px))`}
		style:grid-template-columns={`repeat(${cols}, minmax(0, ${boxSize}px))`}
		class:z-[-1]={gridUnderlay && !edit.dragging}
		class:z-20={edit.dragging && gridUnderlay}
		class:border-2={edit.edit}
	>
		{#if gridUnderlay}
			{#each Array(rows) as _, y}
				{#each Array(cols) as _, x}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<span
						class="w-full h-full border-dashed border-[1px] opacity-20"
						class:bg-success={edit.dragging && edit.dragMode === 'place' && edit.isPlaceable(x, y)}
						class:bg-error={edit.dragging && edit.dragMode === 'place' && !edit.isPlaceable(x, y)}
						onmouseover={(_) => mouseOverHandler(x, y)}
						ontouchmove={(_) => mouseOverHandler(x, y)}
						onclick={_ => clickHandler(x, y)}
						ontouchstart={(_) => clickHandler(x, y)}
					>
					</span>
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
