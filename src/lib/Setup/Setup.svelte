<script lang="ts">
	import type { Component } from 'svelte';

	import {setup} from "../Stores/Setup.svelte"

	let {pages, index } = $derived(setup);
	let activeComp: Component = $derived(pages[index]);

</script>

<!--backdrop -->
<div class="w-full h-full bg-base-200">
	<dialog class="modal" open>
		<div class="modal-box">
			<svelte:component this={activeComp} />
		</div>
	</dialog>
</div>
