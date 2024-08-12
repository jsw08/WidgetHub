<script lang="ts">
	import type { Component } from 'svelte';
	import Welcome from './Welcome.svelte';
	import { profiles, type Profile } from '../Stores/Profiles.svelte';

	const pages: Component[] = [Welcome, Welcome, Welcome];
	let index = $state(0);
	let activeComp: Component = $derived(pages[index]);
	let finalPage: boolean = $derived(pages.length - (1 + index) === 0);

	let profile: Profile = {
		gridSize: {
			rows: 10,
			cols: 10,
			boxSize: 50
		},
		widgets: {
			[crypto.randomUUID()]: {
				component: 'Test',
				size: {
					width: 5,
					height: 5,
					x: 1,
					y: 1
				}
			}
		}
	};
	let activeProfile = 'default';

	const finish = () => {
		profiles.activeProfile = activeProfile;
		profiles.profiles = { [activeProfile]: profile };
		profiles.isSetup = true;
	};
</script>

<!--backdrop -->
<div class="w-full h-full bg-base-200">
	<dialog class="modal" open>
		<div class="modal-box">
			<svelte:component this={activeComp} />
			<div class="modal-action">
				<div class="join">
					{#if index !== 0}
						<button class="btn join-item" onclick={(_) => index--}>Previous</button>
					{/if}
					{#if finalPage}
						<button class="btn btn-primary join-item" onclick={finish}>Finish</button>
					{:else}
						<button class="btn btn-primary" class:join-item={index !== 0} onclick={(_) => index++}>Next</button>
					{/if}
				</div>
			</div>
		</div>
	</dialog>
</div>
