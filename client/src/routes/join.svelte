<script>
	function handleJoin() {
		alert("Join");
	}
</script>

<main>
	<label for="input-code">Tapez un code :</label>
	<input type="text" name="code" id="input-code" />
	<div class="btn-container">
		<a class="btn" on:click={handleJoin} href="/lobby">
			<span>Rejoindre une partie</span>
		</a>
		<a class="btn" href="/">
			<span>Retour</span>
		</a>
	</div>
</main>