<script lang="ts">
  import Grid from "./lib/Core/Grid.svelte";
  import {edit} from "./lib/Stores/Edit.svelte"
</script>
<svelte:window onmouseup={_ => edit.dragging = false}/>

<Grid>
  <div>
    hi
  </div>
</Grid>