<script lang="ts">
	import { edit } from '../Stores/Edit.svelte';
	import { type WidgetProps } from '../Stores/Profiles.svelte';

	let { widget, id }: WidgetProps = $props();
</script>

<div>
	hi
	{JSON.stringify(widget)}<br />{JSON.stringify(id)}
	<br />{JSON.stringify(edit.mouseCoordsOffset)}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
