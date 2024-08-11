<script lang="ts">
	import type { Component } from 'svelte';
	import Welcome from './Welcome.svelte';
	import { profiles, type Profile } from '../Stores/Profiles.svelte';

	const pages: Component[] = [Welcome, Welcome];
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
				component: "Test",
				size: {
					width: 5, height: 5, x: 1, y: 1
				},

			}
		}
	}
	let activeProfile = "default";

	const finish = () => {
		profiles.activeProfile = activeProfile;
		profiles.profiles = {[activeProfile]: profile};
		profiles.isSetup = true;
	}
</script>

<div class="wrapper">
	<div>
		<svelte:component this={activeComp} />
		{#if index !== 0}
			<button class="btn" onclick={(_) => index--}>Prev</button>
		{/if}
		{#if finalPage}
			<button class="btn" onclick={finish}>Finish</button>
		{:else}
			<button class="btn" onclick={(_) => index++}>Next</button>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		display: grid;
		place-content: center;
	}
</style>
