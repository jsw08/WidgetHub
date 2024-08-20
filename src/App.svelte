<script lang="ts">
	import BurgerMenu from './lib/Core/BurgerMenu.svelte';
	import Grid from './lib/Core/Grid.svelte';
	import Options from './lib/Options/Options.svelte';
	import ScreensizeWarning from './lib/Core/ScreensizeWarning.svelte';
	import Setup from './lib/Setup/Setup.svelte';
	import WidgetWrapper from './lib/Core/WidgetWrapper.svelte';
	import { edit } from './lib/Stores/Edit.svelte';
	import { options } from './lib/Stores/Options.svelte';
	import { profiles, type Widget, Widgets } from './lib/Stores/Profiles.svelte';

	let widgets: Widget[] = $derived(Object.values(profiles.profile.widgets));
	let widgetsIDS: string[] = $derived(Object.keys(profiles.profile.widgets));
	
</script>
<svelte:window onmouseup={(_) => (edit.dragMode !== 'place' ? edit.stopDrag() : void 0)} />

{#if profiles.isSetup}
	<Grid>
		{#each widgets as widget, i}
			{@const id = widgetsIDS[i]}
			<WidgetWrapper {widget} {id}>
				<svelte:component this={Widgets[widget.component].component} {widget} {id} />
			</WidgetWrapper>
		{/each}
	</Grid>
	{#if !edit.dragging && !options.open}
		<BurgerMenu />
	{/if}
	{#if options.open}
		<Options/>
	{/if}
	<ScreensizeWarning/>
{:else}
	<Setup />
{/if}
