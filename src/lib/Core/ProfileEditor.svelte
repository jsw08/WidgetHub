<script lang="ts">
	import { minBoxSize } from '../Stores/Edit.svelte';
	import { options } from '../Stores/Options.svelte';
	import { profiles } from '../Stores/Profiles.svelte';
	import { calcBoxSize, calcGridSize, type GridSize } from './gridSize';

	type Props = {
		optOpen?: boolean;
		optProfileName?: string;
	};
	let { optOpen = $bindable(), optProfileName = $bindable() }: Props = $props();

	let profileName = $derived(optProfileName ?? options.editProfileModal.profileName);
	let profile = $derived(profiles.profiles[profileName]);

	let rows: number | undefined = $state();
	let cols: number | undefined = $state();
	let boxSize: number | undefined = $state();
	let name: undefined | string = $state();
	let profileNameConflicts = $derived(
		name !== profileName && Object.keys(profiles.profiles).includes(name ?? '')
	);

	const autoGrid = () => {
		const gSize = calcGridSize(innerWidth, innerHeight, boxSize ?? profile.gridSize.boxSize);
		rows = gSize.rows;
		cols = gSize.cols;
	};
	const autoBox = () => {
		boxSize = calcBoxSize(
			innerWidth,
			innerHeight,
			rows ?? profile.gridSize.rows,
			cols ?? profile.gridSize.cols
		);
		if (boxSize < 40) {
			boxSize = 40;
			autoGrid();
		}
	};

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
			if (profiles.activeProfile === profileName) profiles.activeProfile = name;
		}
	};
	const closeModal = () => {
		if (optOpen) optOpen = false;
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

			<div class="divider">Grid settings - ADVANCED</div>
			{#if rows || cols}
				<div role="alert" class="alert alert-warning">
					<span class="icon-[pajamas--warning] text-black w-5 h-5"></span>
					<span
						>Changing the grid size to a different value <b>WILL</b> break your layout. It's better to
						create a profile from scratch or resize the boxSize.
					</span>
				</div>
			{/if}
			<div class="join flex flex-row w-full my-2">
				<input
					bind:value={rows}
					class:join-item={true}
					class="input input-bordered min-w-0"
					min="1"
					oninput={autoBox}
					placeholder="Rows: {profile.gridSize.rows}"
					type="number"
				/>
				<!-- <span class="text-2xl">×</span> -->
				<input
					bind:value={cols}
					class:join-item={true}
					class="input input-bordered min-w-0"
					min="1"
					oninput={autoBox}
					placeholder="Columns: {profile.gridSize.cols}"
					type="number"
				/>
				<button class="btn btn-square btn-primary join-item flex-none" onclick={autoGrid}
					><span class="icon-[mdi--automatic] w-[55%] h-[55%]"></span></button
				>
			</div>
			<div class="join flex flex-row w-full mb-2">
				<input
					bind:value={boxSize}
					class="input input-bordered w-full join-item"
					min={minBoxSize}
					oninput={autoGrid}
					placeholder="BoxSize: {profile.gridSize.boxSize}"
					type="number"
				/>
				<button class="btn btn-square btn-primary join-item flex-none" onclick={autoBox}
					><span class="icon-[mdi--automatic] w-[55%] h-[55%]"></span></button
				>
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
			<div class="modal-action flex flex-row">
				<button class="btn btn-primary" onclick={closeModal}>Close</button>
			</div>
		</div>
	</dialog>
{/if}
