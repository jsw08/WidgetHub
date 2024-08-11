<script lang="ts">
	import type { Component } from 'svelte';
	import Welcome from './Welcome.svelte';

	const pages: Component[] = [Welcome, Welcome];
	let index = $state(0);
	let activeComp: Component = $derived(pages[index]);
	let pagesLeft: number = $derived(pages.length - (1 + index));
</script>

<div class="wrapper">
	<div>
		<svelte:component this={activeComp} />
        {#if index !== 0}
            <button onclick={_ => index--}>Prev</button>
        {/if}
        {#if pagesLeft > 0}
            <button onclick={_ => index++}>Next</button>
        {:else}
            <button onclick={_ => index++}>Finish</button>
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
