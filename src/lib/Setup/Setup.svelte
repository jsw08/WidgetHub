<script lang="ts">
	import { setup } from '../Stores/Setup.svelte';
</script>

<!--backdrop -->
<svelte:body class="bg-base-200" />
<dialog class="modal modal-bottom sm:modal-middle" open>
	<div class="modal-box">
		<svelte:component this={setup.activeComp} />
	</div>
</dialog>
