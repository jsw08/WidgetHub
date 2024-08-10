<script lang="ts">
	import Grid from './lib/Core/Grid.svelte';
	import { edit } from './lib/Stores/Edit.svelte';
  import { profiles, type Widget, Widgets } from './lib/Stores/Profiles.svelte';
	import WidgetWrapper from './lib/Widgets/WidgetWrapper.svelte';

  let widgets: Widget[] = $derived(Object.values(profiles.profile.widgets))
  let widgetsIDS: string[] = $derived(Object.keys(profiles.profile.widgets))
</script>

<svelte:window onmouseup={(_) => (edit.stopDrag())} />

<Grid>
  {#each widgets as widget, i}
    {@const id = widgetsIDS[i]}
    <WidgetWrapper {widget} {id}>
      <svelte:component this={Widgets[widget.component]} {widget} {id}/>
    </WidgetWrapper>
  {/each}
</Grid>
