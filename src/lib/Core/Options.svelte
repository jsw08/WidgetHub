<script lang=ts>
	import { options } from "../Stores/Options.svelte";
</script>

<dialog class="modal modal-bottom sm:modal-middle" open>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Options</h3>
    <p class="py-4">Coming soon&trade;</p>
    <div class="modal-action">
      <div class="join">
        <button class="btn join-item" onclick={_ => options.open = false}>Close</button>
        <button class="btn btn-primary join-item" disabled>Save</button>
      </div>
    </div>
  </div>
</dialog>