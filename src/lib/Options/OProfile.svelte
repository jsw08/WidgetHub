<script lang="ts">
	import { profiles } from '../Stores/Profiles.svelte';
</script>

<div class="divider">Profiles</div>
<ul class="menu bg-base-200 rounded-box w-full mt-4">
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
					>
						<span class="icon-[material-symbols--delete] w-[80%] h-[80%]"></span>
					</button>
				</div>
			</a>
		</li>
	{/each}
</ul>
<div class="divider">Add profile</div>
<form class="mt-4">
	<input type="text" placeholder="Enter a name here" class="input input-bordered w-full" />
    <button type="submit" class="btn"></button>
</form>
