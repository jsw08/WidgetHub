<script lang="ts">

	import { profiles } from "../Stores/Profiles.svelte";

</script>
<h3 class="text-lg font-bold">Welcome!</h3>

{JSON.stringify(profiles.profiles)}