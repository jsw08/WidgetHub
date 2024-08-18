<script lang="ts">
	import { fly } from 'svelte/transition';
	import { minBoxSize } from '../Stores/Edit.svelte';
	import { options } from '../Stores/Options.svelte';
	import { emptyProfile, profiles } from '../Stores/Profiles.svelte';
	import type { GridSize } from './gridSize';

	let { profileName } = $derived(options.editProfileModal);
	let profile = $derived(profiles.profiles[profileName]);

	let rows: number | undefined = $state();
	let cols: number | undefined = $state();
	let boxSize: number | undefined = $state();
	let name: undefined | string = $state();
	let profileNameConflicts = $derived(
		name !== profileName && Object.keys(profiles.profiles).includes(name ?? '')
	);

	const updateProfile = () => {
		if (boxSize || cols || rows) {
			const newGridSize: GridSize = {
				rows: rows ?? profile.gridSize.rows,
				cols: cols ?? profile.gridSize.cols,
				boxSize: boxSize ?? profile.gridSize.boxSize
			};
			profile.gridSize = newGridSize;
		}
		if (name) {
			let { [profileName]: cProfile, ...rest } = profiles.profiles;
			profiles.profiles = {
				...rest,
				[name]: cProfile
			};
			profiles.activeProfile = name;
		}
	};
	const closeModal = () => {
		options.editProfileModal = {
			open: false,
			profileName: ''
		};
	};
</script>

{#if profile}
	<dialog class="modal modal-bottom sm:modal-middle bg-base-200" open>
		<div class="modal-box">
			<h3 class="text-lg font-bold">Editing '{profileName}'</h3>

			<div class="divider">Profile settings</div>
			<input
				type="text"
				placeholder="Profile name: {profileName}"
				bind:value={name}
				class="input input-bordered min-w-0 w-full"
				class:input-error={profileNameConflicts}
			/>

			<div class="divider">Grid settings</div>
			{#if rows || cols}
				<div role="alert" class="alert alert-warning">
					<span class="icon-[pajamas--warning] text-black w-5 h-5"></span>
					<span
						>Changing the grid size to a different value <b>WILL</b> break your layout. It's better to create a profile from scratch, resize the boxSize or to auto-resize (<span class="icon-[mdi--automatic] align-middle"></span>).</span
					>
				</div>
			{/if}
			<div class="join flex flex-row w-full my-2">
				<input
					type="number"
					placeholder="Rows: {profile.gridSize.rows}"
					bind:value={rows}
					min="1"
					class="input input-bordered min-w-0"
					class:join-item={true}
				/>
				<!-- <span class="text-2xl">×</span> -->
				<input
					type="number"
					placeholder="Columns: {profile.gridSize.cols}"
					bind:value={cols}
					min="1"
					class="input input-bordered min-w-0"
					class:join-item={true}
				/>
				<button class="btn btn-square btn-primary join-item flex-none"><span class="icon-[mdi--automatic] w-[55%] h-[55%]"></span></button>
			</div>
			<div class="join flex flex-row w-full mb-2">
				<input
					type="number"
					placeholder="BoxSize: {profile.gridSize.boxSize}"
					bind:value={boxSize}
					min={minBoxSize}
					class="input input-bordered w-full join-item"
				/>
				<button class="btn btn-square btn-primary join-item flex-none"><span class="icon-[mdi--automatic] w-[55%] h-[55%]"></span></button>
			</div>

			<div class="divider mb-0"></div>
			<div class="modal-action mt-2">
				<div class="join">
					<button class="join-item btn" onclick={closeModal}>Cancel</button><button
						class="join-item btn btn-primary"
						onclick={() => {
							updateProfile();
							closeModal();
						}}>Save</button
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
