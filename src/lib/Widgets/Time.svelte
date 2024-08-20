<script lang="ts">
	import { fit, parent_style } from "../Core/textFit";
    import { type WidgetProps } from "../Stores/Profiles.svelte";
    let {id, widget}: WidgetProps = $props()

</script>

<div class="w-full h-full bg-gray-50">
    <div style={parent_style}>
        <span use:fit class="font-mono">00:00:00</span>
    </div>
</div>