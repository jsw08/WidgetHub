<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setup } from '../Stores/Setup.svelte';
	let finalPage: boolean = $derived(setup.pages.length - (1 + setup.index) === 0);

	type Props = {
		children?: Snippet;
		disabled?: boolean;
		next?: () => any;
	};
	let { children, disabled, next }: Props = $props();
</script>

<div class="modal-action flex flex-row items-center">
	{#if children}{@render children()}{/if}
	<div class="join flex-none">
		{#if setup.index !== 0}
			<button class="btn join-item" onclick={(_) => setup.index--}>Previous</button>
		{/if}
		{#if finalPage}
			<button
				class="btn btn-primary join-item"
				onclick={() => {
					if (next) next();
					setup.finish();
				}}>Finish</button
			>
		{:else}
			<button
				class="btn btn-primary"
				class:join-item={setup.index !== 0}
				onclick={(_) => {
					if (next) next();
					setup.index++;
				}}
				class:btn-disabled={disabled}
				{disabled}>Next</button
			>
		{/if}
	</div>
</div>
