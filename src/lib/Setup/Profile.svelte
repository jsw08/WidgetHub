<script lang="ts">
	import { setup } from '../Stores/Setup.svelte';
	import Paginator from './Paginator.svelte';

	let name = ""
	const setName = () => setup.profileName = name;
</script>

<h3 class="text-lg font-bold">Profiles</h3>
<p class="pt-4">
	WidgetHub supports multiple profiles, each storing its own widgets, screen size, and more. Please
	enter a name for your first profile below.
</p>

<Paginator disabled={!name.length} onnext={setName}>
	<input
		bind:value={name}
		type="text"
		placeholder="E.g: 'default'"
		class="input input-bordered flex-grow min-w-0"
		onkeypress={(e) => (e.key === 'Enter' ? (() => {setup.index++; setName()})() : void 0)}
	/>
</Paginator>
