<script lang="ts">
	import type { Snippet } from 'svelte';
	import { edit } from '../Stores/Edit.svelte';
	import { type Widget } from '../Stores/Profiles.svelte';

	type Props = {
		widget: Widget;
		id: string;
		children: Snippet;
	};
	let { id, children, widget }: Props = $props();

	let { x, y, width, height } = $derived(widget.size);
	const startDrag = () => edit.startDrag(widget, id, Math.round(width / 2) -1)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wrapper"
	onmousedown={startDrag}
	style:grid-row={`${y + 1} / span ${height}`}
	style:grid-column={`${x + 1} / span ${width}`}
>
	{@render children()}
</div>

<style>
	.wrapper {
		user-select: none;
	}
</style>
