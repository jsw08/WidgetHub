<script lang="ts">
	import { setup } from '../Stores/Setup.svelte';
	import Paginator from './Paginator.svelte';

	let boxSize = $derived(setup.profile.gridSize.boxSize);
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
	This means that once you setup your resolution, you won't be able to use a different screen size
	with this profile. You are able to reset the size in the profile's settings, please note that this
	may break your layout.
</p>

<Paginator>
	<input
		type="range"
		min="10"
		max="200"
		class="range"
		bind:value={setup.profile.gridSize.boxSize}
	/><span class="w-12 flex justify-center">{boxSize}</span>
</Paginator>
