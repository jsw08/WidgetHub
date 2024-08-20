<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type Widget } from '../Stores/WidgetProps';
	import { edit } from '../Stores/Edit.svelte';
	import { stopPropagation } from '../eventModifiers';

	type Props = {
		widget: Widget;
		id: string;
		children: Snippet;
	};
	let { id, children, widget }: Props = $props();

	let { x, y, width, height } = $derived(widget.size);
	const startDrag = (mode: 'move' | 'resize') =>
		edit.startDrag(mode, widget, id, Math.round(width / 2) - 1);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="select-none border-neutral relative cursor-grab"
	class:border-2={edit.edit}
	style:grid-row={`${y + 1} / span ${height}`}
	style:grid-column={`${x + 1} / span ${width}`}
	onmousedown={(_) => startDrag('move')}
>
	{@render children()}
	{#if edit.edit}
		<span
			class="w-5 h-5 absolute z-10 right-0 bottom-0 border-0 border-b-4 border-r-4 border-neutral-content hover:border-info cursor-pointer"
			class:border-info={edit.dragMode === 'resize' && edit.dragging}
			onmousedown={stopPropagation((_) => startDrag('resize'))}
		></span>
		<span
			class="w-5 h-5 absolute z-10 right-0 top-0 icon-[material-symbols--close] hover:text-error"
			onmousedown={stopPropagation((_) => edit.deleteWidget(id))}
		></span>
	{/if}
</div>
