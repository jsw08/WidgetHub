<script lang="ts">
	import { setup } from "../Stores/Setup.svelte";
	import Paginator from "./Paginator.svelte";
</script>
<h3 class="text-lg font-bold">Profiles</h3>
<p class="py-4">
	WidgetHub works with different profiles in which it stores its widgets, screensize and more.
	Please enter a name below for your first profile.
</p>


<Paginator disabled={setup.profileName.length === 0}>
    <input bind:value={setup.profileName} type="text" placeholder="For example: 'default'" class="input input-bordered flex-grow" />
</Paginator>