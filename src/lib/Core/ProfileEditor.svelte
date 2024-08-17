<script lang="ts">
	import { minBoxSize } from '../Stores/Edit.svelte';
	import { emptyProfile, profiles } from '../Stores/Profiles.svelte';
	import type { GridSize } from './gridSize';

	type Props = {
		profileName: string;
	};
	let { profileName }: Props = $props();
	let profile = $derived(profiles.profiles[profileName]);

	let gridSize:
		| GridSize
		| {
				rows: undefined;
				cols: undefined;
				boxSize: undefined;
		  } = {
		rows: undefined,
		cols: undefined,
		boxSize: undefined
	};
	let name: undefined | string = $state();

	const updateProfile = () => (profile.gridSize = { ...gridSize, ...profile.gridSize });
</script>

{#if profile}
	<dialog class="modal modal-bottom sm:modal-middle bg-base-200" open>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Editing '{profileName}'</h3>
			<div class="divider ">Profile settings</div>
				<input
					type="text"
					placeholder="Profile name: {profileName}"
					bind:value={name}
					class="input input-bordered min-w-0 w-full"
				/>
			<div class="divider">Grid settings</div>
			<div class="flex flex-row w-full gap-2 justify-center items-center mb-2">
				<input
					type="number"
					placeholder="Rows: {profile.gridSize.rows}"
					bind:value={gridSize.rows}
					min="1"
					class="input input-bordered min-w-0"
				/>
				<span class="text-2xl">×</span>
				<input
					type="number"
					placeholder="Columns: {profile.gridSize.cols}"
					bind:value={gridSize.cols}
					min="1"
					class="input input-bordered min-w-0"
				/>
			</div>
			<input
				type="number"
				placeholder="BoxSize: {profile.gridSize.boxSize}"
				bind:value={gridSize.boxSize}
				min={minBoxSize}
				class="input input-bordered w-full"
			/>

			<div class="divider mb-0"></div>

			<div class="modal-action mt-2">
				<div class="join">
					<button class="join-item btn">Cancel</button><button class="join-item btn btn-primary"
						>Save</button
					>
				</div>
			</div>
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
