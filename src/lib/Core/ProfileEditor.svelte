<script lang="ts">
	import { profiles } from '../Stores/Profiles.svelte';

	type Props = {
		profileName: string;
	};
	let { profileName }: Props = $props();
	let profile = $derived(profiles.profiles[profileName]);
</script>

{#if profile}
	<dialog class="modal modal-bottom sm:modal-middle" open>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Editing {profileName}</h3>

			<div class="modal-action flex flex-row"></div>
		</div>
	</dialog>
{:else}
	<dialog class="modal modal-bottom sm:modal-middle" open>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Profile not found...</h3>
			<div class="modal-action flex flex-row"></div>
		</div>
	</dialog>
{/if}
