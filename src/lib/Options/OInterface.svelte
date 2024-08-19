<script lang="ts">
	import { options } from '../Stores/Options.svelte';
	import { themeChange } from 'theme-change';
	import tailConf from '../../../tailwind.config';

	const themes: string[] = tailConf.daisyui.themes;

	$effect(() => themeChange(false));
	let activeTheme = localStorage.theme;
	let activeSel = $state(activeTheme);
</script>

<div class="divider mb-0">Style</div>
<label class="form-control w-full mb-2">
	<div class="label">
		<span class="label-text"
			>Body style (paste your css here like this: '<code>color:black;background:green;</code
			>')</span
		>
	</div>
	<input
		type="text"
		placeholder="CSS Here"
		class="input input-bordered w-full"
		bind:value={options.bodyCSS}
	/>
</label>

<label class="form-control-w-full">
	<div class="label"><span class="label-text">Theme selector</span></div>
	<div class="join w-full flex">
		<select bind:value={activeSel} class="select select-bordered flex-grow join-item">
			{#each themes as theme}
				<option value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
			{/each}
		</select>
		<button data-set-theme={activeSel} class="btn btn-primary btn-square join-item"
			><span class="icon-[material-symbols--save] w-[55%] h-[55%]"></span></button
		>
	</div>
</label>
