<script lang="ts">
	import { stopPropagation } from '../eventModifiers';
	import { profiles } from '../Stores/Profiles.svelte';

	let newProfileName = $state('');
    let profileNameConflicts = $derived(!newProfileName || Object.keys(profiles.profiles).includes(newProfileName))
	const createProfile = (e: SubmitEvent) => {
		e.preventDefault();
		if (profileNameConflicts) return;
        profiles.createProfile(newProfileName)
        newProfileName = ""
	};
</script>

<div class="divider">Profiles</div>
<ul class="menu bg-base-200 rounded-box w-full mt-4 gap-2">
	{#each Object.keys(profiles.profiles) as p}
		<li>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<a
				class:active={p === profiles.activeProfile}
				onclick={(_) => (profiles.activeProfile = p)}
				class="flex flex-row"
			>
				<span class="flex-grow">{p}</span>
				<div class="divider divider-horizontal m-0"></div>
				<div class="flex-none join">
					<button class="btn btn-xs btn-square btn-info join-item">
						<span class="icon-[mdi--rename-box] w-[80%] h-[80%]"></span>
					</button>
					<button
						class="btn btn-xs btn-square disabled:bg-base-100 disabled:text-base-content btn-error join-item"
						disabled={p === profiles.activeProfile}
                        onclick={stopPropagation(_ => {profiles.deleteProfile(p)})}
					>
						<span class="icon-[material-symbols--delete] w-[80%] h-[80%]"></span>
					</button>
				</div>
			</a>
		</li>
	{/each}
</ul>
<div class="divider">Add profile</div>
<form class="mt-4 flex flex-row gap-2" onsubmit={createProfile}>
	<input
		type="text"
		name="name"
		placeholder="Enter a name here"
		bind:value={newProfileName}
		class="input input-bordered flex-grow"
	/>
	<button type="submit" class="btn btn-primary btn-square" disabled={profileNameConflicts}>
        <span class="">submit</span></button
	>
	<!-- TODO: replace 'submit' with icon but i'm offline rn -->
</form>
