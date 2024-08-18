<script lang="ts">
	let getInput: string | undefined = $state();
	let setInput: string | undefined = $state();

	$effect(() => {
		getInput = JSON.stringify({ ...localStorage });
		void 0;
	});
	const set = () => {
		if (!setInput) return;

		const parsedInput = JSON.parse(setInput); // isn't recursive, so we don't have to stringify twice
		console.log(parsedInput);
		debugger;
		for (let i of Object.keys(parsedInput)) {
			localStorage[i] = parsedInput[i];
		}

		location.reload();
	};
</script>

<div class="divider">Import & export</div>

<div role="alert" class="alert alert-warning">
	<span class="icon-[pajamas--warning] text-black w-5 h-5"></span>
	<span>These features <b>DO NOT</b> verify the json. For advanced users only.</span>
</div>
<div class="join w-full flex my-2">
	<input
		type="text"
		class="input input-bordered flex-grow join-item"
		bind:value={getInput}
	/><button
		class="btn btn-primary btn-square flex-none join-item"
		disabled={location.protocol !== 'https:'}
		title={location.protocol === 'https:' ? '' : 'Copy-to-clipboard is only supported on https.'}
		><span class="icon-[material-symbols--content-copy] w-[55%] h-[55%]"></span></button
	>
</div>
<div class="join w-full flex">
	<input
		type="text"
		class="input input-bordered flex-grow join-item"
		bind:value={setInput}
	/><button class="btn btn-primary btn-square flex-none join-item" onclick={set}>set</button>
</div>
