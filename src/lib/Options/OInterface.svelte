<script lang="ts">
	import { options } from '../Stores/Options.svelte';
	import tailConf from '../../../tailwind.config';

	const themes: string[] = tailConf.daisyui.themes;
</script>

<div class="divider mb-0">Style</div>
<label class="form-control w-full mb-2">
	<div class="label">
		<span class="label-text">Body style in inline css (leave empty to default)</span>
	</div>
	<input
		type="text"
		placeholder="CSS Here"
		class="input input-bordered w-full"
		bind:value={options.bodyCSS}
	/>
</label>

<label class="form-control w-full">
	<div class="label"><span class="label-text">Theme selector</span></div>
	<select bind:value={options.theme} class="select select-bordered w-full">
		<option value="auto">Auto</option>
		{#each themes as theme}
			<option value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
		{/each}
	</select>
</label>
