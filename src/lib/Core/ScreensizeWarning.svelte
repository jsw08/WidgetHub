<script lang="ts">
	import { profiles } from '../Stores/Profiles.svelte';
	import { calcBoxSize } from './gridSize';
	import ProfileEditor from './ProfileEditor.svelte';

	let open = $state(false);
	let gridSize = $derived(profiles.profile.gridSize);
	let gridSizePx = $derived({
		x: gridSize.cols * gridSize.boxSize,
		y: gridSize.rows * gridSize.boxSize
	});
	let editing = $state(false);

	const checkSize = () => {
		let condition = innerWidth < gridSizePx.x || innerHeight < gridSizePx.y;
		if (!condition) editing = false;
		open = condition;
	};
	$effect(() => {
		window.onresize = checkSize;
		checkSize();
	});

	const reset = () => {
		localStorage.clear();
		location.reload();
	};
	// const resize = () => {
	// 	profiles.profile.gridSize.boxSize = calcBoxSize(
	// 		innerWidth,
	// 		innerHeight,
	// 		gridSize.rows,
	// 		gridSize.cols
	// 	);
	// 	profiles.profile = { ...profiles.profile };
	// };
	$effect(() => console.log(open));
</script>

{#if open}
	<dialog class="modal modal-bottom sm:modal-middle bg-base-100">
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
