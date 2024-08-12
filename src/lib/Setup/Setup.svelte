<script lang="ts">
	import {setup} from "../Stores/Setup.svelte"
</script>

<!--backdrop -->
<div class="w-full h-full bg-base-200">
	<dialog class="modal" open>
		<div class="modal-box">
			<svelte:component this={setup.activeComp} />
		</div>
	</dialog>
</div>
