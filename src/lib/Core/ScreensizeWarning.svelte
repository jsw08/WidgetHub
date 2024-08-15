<script lang="ts">
	import { profiles } from '../Stores/Profiles.svelte';
	import { calcBoxSize } from './gridSize';

	let open = $state(false);
	let gridSize = $derived(profiles.profile.gridSize);
	let gridSizePx = $derived({
		x: gridSize.cols * gridSize.boxSize,
		y: gridSize.rows * gridSize.boxSize
	});
	const checkSize = () => {
		open = innerWidth < gridSizePx.x || innerHeight < gridSizePx.y;
	};

	$effect(() => {
		window.onresize = checkSize;
		checkSize();
	});
</script>

<dialog class="modal modal-bottom sm:modal-middle bg-base-100" {open}>
	<div class="modal-box bg-error text-error-content">
		<h3 class="text-lg font-bold">Invalid window size</h3>
		<p class="py-4">
			Resize the window to make it larger or press the reset button to reset your profiles or press
			Resize to recalculate.
		</p>
		<div class="modal-action">
			<div class="join">
				<button
					class="btn join-item"
					onclick={(_) => {
						localStorage.clear();
						location.reload();
					}}>Reset</button
				>
				<button
					class="btn btn-primary join-item"
					onclick={(_) =>
						(profiles.profile.gridSize.boxSize = calcBoxSize(
							innerWidth,
							innerHeight,
							gridSize.rows,
							gridSize.cols
						))}>Resize</button
				>
			</div>
		</div>
	</div>
</dialog>
