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
	<div tabindex="0" role="button" class="btn btn-square m-1" onclick={doubleClick}>
		<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24"
			><path
				fill={hide ? 'oklch(var(--er))' : 'currentColor'}
				d="M22 13c0 1.11-.89 2-2 2H4a2 2 0 1 1 0-4h9l2.5 2l2.5-2h2a2 2 0 0 1 2 2M12 3C3 3 3 9 3 9h18s0-6-9-6M3 18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3v-1H3z"
			/></svg
		>
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
				<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"
					/></svg
				>
			</button>
		</li>
		<li>
			<button class="btn btn-square" onclick={(_) => (pickingWidget = true)}>
				<!-- Widget add -->
				<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						fill-rule="evenodd"
						d="M17.5 2.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25V9.5a.75.75 0 0 1-1.5 0V7.25H14.5a.75.75 0 0 1 0-1.5h2.25V3.5a.75.75 0 0 1 .75-.75"
						clip-rule="evenodd"
					/><path
						fill="currentColor"
						d="M2 6.5c0-2.121 0-3.182.659-3.841S4.379 2 6.5 2s3.182 0 3.841.659S11 4.379 11 6.5s0 3.182-.659 3.841S8.621 11 6.5 11s-3.182 0-3.841-.659S2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22s-3.182 0-3.841-.659S13 19.621 13 17.5"
					/><path
						fill="currentColor"
						d="M2 17.5c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5"
						opacity="0.5"
					/></svg
				>
			</button>
		</li>
		<li>
			<!-- Edit button -->
			<button class="btn btn-square" onclick={(_) => (edit.edit = !edit.edit)}>
				{#if edit.edit}
					<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M21 6.4q0 .4-.137.763t-.438.662l-4.175 4.15q-.3.3-.7.3t-.7-.3L12.025 9.15q-.3-.3-.3-.7t.3-.7L16.2 3.575q.3-.3.663-.437T17.625 3t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4m-1.9 15.5l-6.375-6.35l-4.9 4.875q-.275.275-.638.425t-.762.15H4q-.425 0-.713-.288T3 20v-2.4q0-.4.15-.763t.425-.637l4.9-4.9L2.1 4.9q-.3-.3-.288-.7t.313-.7t.713-.3t.712.3l16.975 16.975q.3.3.288.713t-.313.712t-.7.3t-.7-.3M17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
						/></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M4 21q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
						/></svg
					>
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
