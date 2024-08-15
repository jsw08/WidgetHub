<script lang="ts">
	import { Widgets } from '../Stores/Profiles.svelte';
	type Props = {
		open: boolean;
		pick: (widget: string) => any;
	};
	let { open = $bindable(), pick }: Props = $props();
	let defaultOptionValue = crypto.randomUUID();
	let widget: string = $state(defaultOptionValue);
</script>

<dialog class="modal modal-bottom sm:modal-middle" open>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Select a widget</h3>
		<div class="modal-action flex flex-row">
			<select class="select select-bordered flex-grow" bind:value={widget}>
				<option disabled selected value={defaultOptionValue}>Pick a widget.</option>
				{#each Object.keys(Widgets) as widget}
					<option value={widget}>{widget}</option>
				{/each}
			</select>
			<div class="flex-none join">
				<button class="btn join-item" onclick={(_) => (open = false)}>Close</button>
				<button
					class="btn btn-primary join-item"
					disabled={widget === defaultOptionValue}
					onclick={() => {
						pick(widget);
						open = false;
					}}>Select</button
				>
			</div>
		</div>
	</div>
</dialog>
