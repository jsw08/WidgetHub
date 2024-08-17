<script lang="ts">
	import OAdvanced from './OAdvanced.svelte';
	import OInterface from './OInterface.svelte';
	import OProfile from './OProfile.svelte';
	import type { Component } from 'svelte';
	import { options } from '../Stores/Options.svelte';

	type Tab = {
		component: Component<{}>;
		name: string;
		active: boolean;
	};
	const tabs: Tab[] = [
		{
			component: OProfile,
			name: 'Profile',
			active: true
		},
		{
			component: OInterface,
			name: 'Interface',
			active: true
		},
		{
			component: OAdvanced,
			name: 'Advanced',
			active: true
		}
	];
	let activeTab: Tab = $state(tabs[0]);
</script>

<dialog class="modal modal-bottom sm:modal-middle" open>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Options</h3>
		<svelte:component this={activeTab.component} />
		<div class="divider mb-2"></div>
		<div class="modal-action flex flex-row justify-between mt-0">
			<div role="tablist" class="px-2 tabs tabs-boxed flex flex-row items-center overflow-x-auto min-w-0">
				{#each tabs as tab}
					<!-- svelte-ignore a11y_interactive_supports_focus -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_missing_attribute -->
					<a
						role="tab"
						class="tab"
						class:tab-active={activeTab.name === tab.name}
						onclick={(_) => (activeTab = tab)}>{tab.name}</a
					>
				{/each}
			</div>
			<button class="btn join-item btn-primary" onclick={(_) => (options.open = false)}
				>Close</button
			>
		</div>
	</div>
</dialog>
