<script lang="ts">
	import Grid from './lib/Core/Grid.svelte';
	import Setup from './lib/Setup/Setup.svelte';
	import { edit } from './lib/Stores/Edit.svelte';
	import { profiles, type Widget, Widgets } from './lib/Stores/Profiles.svelte';
	import WidgetWrapper from './lib/Widgets/WidgetWrapper.svelte';

	let widgets: Widget[] = $derived(Object.values(profiles.profile.widgets));
	let widgetsIDS: string[] = $derived(Object.keys(profiles.profile.widgets));
</script>

<svelte:window onmouseup={(_) => edit.stopDrag()} />
{#if profiles.isSetup}
	<Grid>
		{#each widgets as widget, i}
			{@const id = widgetsIDS[i]}
			<WidgetWrapper {widget} {id}>
				<svelte:component this={Widgets[widget.component]} {widget} {id} />
			</WidgetWrapper>
		{/each}
	</Grid>

	<div
		class="absolute right-0 bottom-0 p-2 {edit.edit
			? '[&>*]visible'
			: '[&>*]:invisible'} [&>*]:hover:visible"
		class:visible={edit.edit}
	>
		{#if edit.edit}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				onclick={(_) => (edit.edit = false)}
				><path
					fill="currentColor"
					d="M21 6.4q0 .4-.137.763t-.438.662l-4.175 4.15q-.3.3-.7.3t-.7-.3L12.025 9.15q-.3-.3-.3-.7t.3-.7L16.2 3.575q.3-.3.663-.437T17.625 3t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4m-1.9 15.5l-6.375-6.35l-4.9 4.875q-.275.275-.638.425t-.762.15H4q-.425 0-.713-.288T3 20v-2.4q0-.4.15-.763t.425-.637l4.9-4.9L2.1 4.9q-.3-.3-.288-.7t.313-.7t.713-.3t.712.3l16.975 16.975q.3.3.288.713t-.313.712t-.7.3t-.7-.3M17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
				/></svg
			>
		{:else}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				onclick={(_) => (edit.edit = true)}
				><path
					fill="currentColor"
					d="M9 15v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zm10.6-9.2l1.425-1.4l-1.4-1.4L18.2 4.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925L7 9.925V17h7.05L21 10.05V19q0 .825-.587 1.413T19 21z"
				/></svg
			>
		{/if}
	</div>
{:else}
	<Setup />
{/if}
