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
		<p class="pt-4">
			Please resize your window to continue. Alternatively, you can click the reset button to completely reset WidgetHub (nuclear). You also have the option to resize the boxsize; however, please note that this action <b>WILL</b> disrupt components, as it <b>does not</b> adjust widgets to meet their minimum size requirements.
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
