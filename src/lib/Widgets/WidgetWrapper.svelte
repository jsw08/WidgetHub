<script lang="ts">
	import type { Snippet } from 'svelte';
	import { edit } from '../Stores/Edit.svelte';
	import { type Widget } from '../Stores/Profiles.svelte';
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
	$effect(() => {
		console.log(edit);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wrapper"
	onmousedown={(_) => startDrag('move')}
	style:grid-row={`${y + 1} / span ${height}`}
	style:grid-column={`${x + 1} / span ${width}`}
>
	{@render children()}
	{#if edit.edit}
		<span class="resizer" onmousedown={stopPropagation((_) => startDrag('resize'))}>
			&lrcorner;
		</span>
	{/if}
</div>

<style>
	.wrapper {
		user-select: none;
		position: relative;
	}
	.resizer {
		position: absolute;
		right: -6px;
		bottom: -9px;
		z-index: 9;
		font-size: 30px;
	}
</style>
