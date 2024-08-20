<script lang="ts">
	import { fit, parent_style } from "../Core/textFit";
    import type { WidgetProps } from '../Stores/WidgetProps';
    let {id, widget}: WidgetProps = $props()

</script>

<div class="w-full h-full card p-4">
    <div style={parent_style}>
        <span use:fit class="font-mono">00:00:00</span>
    </div>
</div>