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

<div class="modal-action flex flex-row items-center" onsubmit={e => {
	e.preventDefault();
	next?.();
	if (finalPage) setup.finish()
	else setup.index++
}}>
	{#if children}{@render children()}{/if}
	<form class="join flex-none">
		{#if setup.index !== 0}
			<button class="btn btn-square join-item" onclick={(_) => setup.index--}>
				<span class="icon-[mdi--navigate-before] w-[70%] h-[70%]"></span>
			</button>
		{/if}
		{#if finalPage}
			<button
				class="btn btn-square btn-primary join-item"
				type="submit"
			>
				<span class="icon-[pajamas--review-checkmark] w-[60%] h-[60%]"></span>
			</button>
		{:else}
			<button
				class="btn btn-square btn-primary join-item"
				class:join-item={setup.index !== 0}
				type="submit"
				{disabled}
			>
				<span class="icon-[mdi--navigate-next] w-[70%] h-[70%]"></span>
			</button>
		{/if}
	</form>
</div>
