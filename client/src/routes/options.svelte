<script>
	let mode = 1;

	function handleConfirm() {
		alert("Mode " + mode);
	}
</script>

<main>
	{mode}
	<div>
		<label for="mode-1">Mode honnête</label>
		<input type="radio" bind:group={mode} name="mode" id="mode-1" value={1}>
	</div>
	<div>
		<label for="mode-2">Mode imposteur</label>
		<input type="radio" bind:group={mode} name="mode" id="mode-2" value={2}>
	</div>
	<div class="btn-container">
		<a class="btn" on:click={handleConfirm} href="/lobby">
			<span>Confirmer</span>
		</a>
		<a class="btn" href="/">
			<span>Retour</span>
		</a>
	</div>
</main>