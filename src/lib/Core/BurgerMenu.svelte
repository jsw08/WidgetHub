<script lang="ts">
	import { edit } from '../Stores/Edit.svelte';
	import WidgetChooser from './WidgetChooser.svelte';

	let hide = false;
	let clicked = false;
	const doubleClick = () => {
		if (clicked) {
			clicked = false;
			hide = !hide;
			localStorage.menubutton = hide;
			console.log(localStorage.menubutton);
			return;
		}

		clicked = true;
		setTimeout(() => (clicked = false), 300);
	};
	let pickingWidget = false;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	class="dropdown dropdown-top dropdown-end absolute right-0 bottom-0 m-2 {!hide || edit.edit
		? 'opacity-100'
		: 'opacity-0 hover:opacity-100'}"
	onload={(_) => {
		if (localStorage.menubutton) hide = JSON.parse(localStorage.menubutton);
		else localStorage.menubutton = JSON.stringify(hide);
	}}
>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div tabindex="0" role="button" class="btn btn-square m-1 " onclick={doubleClick}>
		<span class="icon-[mdi--hamburger] w-[70%] h-[70%]"></span>
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul
		tabindex="0"
		class="dropdown-content menu bg-base-100 rounded-box z-[1] shadow [&>li]:my-1"
		onmouseleave={(_) => hide && !edit.edit && (document.activeElement as HTMLElement).blur()}
	>
		<li>
			<button class="btn btn-square">
				<!-- Settings -->
				<span class="icon-[material-symbols--settings-rounded] w-[70%] h-[70%]"></span>
			</button>
		</li>
		<li>
			<button class="btn btn-square" onclick={(_) => (pickingWidget = true)}>
				<!-- Widget add -->
				<span class="icon-[solar--widget-add-bold-duotone] w-[70%] h-[70%]"></span>
			</button>
		</li>
		<li>
			<!-- Edit button -->
			<button class="btn btn-square" onclick={(_) => (edit.edit = !edit.edit)}>
				{#if edit.edit}
				<span class="icon-[material-symbols--edit-off-rounded] w-[70%] h-[70%]"></span>
				{:else}
				<span class="icon-[material-symbols--edit-rounded] w-[70%] h-[70%]"></span>
				{/if}
			</button>
		</li>
	</ul>
</div>

{#if pickingWidget}
	<WidgetChooser
		bind:open={pickingWidget}
		pick={(widget: string) => {
			edit.edit = true;
			edit.startPlace(widget);
		}}
	/>
{/if}
