<script lang="ts">
	import { profiles } from '../Stores/Profiles.svelte';
	import ProfileEditor from './ProfileEditor.svelte';

	let open = $state(false);
	let gridSize = $derived(profiles.profile.gridSize);
	let gridSizePx = $derived({
		x: gridSize.cols * gridSize.boxSize,
		y: gridSize.rows * gridSize.boxSize
	});
	let editing = $state(false);

	const checkSize = () => {
		open = innerWidth < gridSizePx.x || innerHeight < gridSizePx.y;
		if (!open) editing = false;
	};
	$effect(() => {
		window.onresize = checkSize;
		checkSize();
	});

	const reset = () => {
		localStorage.clear();
		location.reload();
	};
</script>

{#if open}
	<dialog class="modal modal-bottom sm:modal-middle bg-base-100" {open}>
		<div class="modal-box bg-error text-error-content">
			<h3 class="text-lg font-bold">Invalid window size</h3>
			<p class="pt-4">
				Please resize your window to continue. Alternatively, you can click the reset button to
				completely reset WidgetHub (nuclear). You also have the option to resize the boxsize (press <span
					class="icon-[mdi--automatic] align-middle"
				></span>
				in the modal); however, please note that this action <b>WILL</b> disrupt components, as it
				<b>does not</b> adjust widgets to meet their minimum size requirements.
			</p>
			<div class="modal-action">
				<div class="join">
					<button class="btn join-item" onclick={reset}>Reset</button>
					<button class="btn btn-primary join-item" onclick={(_) => (editing = true)}>Resize</button
					>
				</div>
			</div>
		</div>
	</dialog>
{/if}

{#if editing}
	<ProfileEditor bind:optOpen={editing} optProfileName={profiles.activeProfile} />
{/if}
