<script>
	import '../global.scss'
	let username = ""
	function isUsernameValid(username) {
		let usernameToTest = username.trim();
		if (usernameToTest.length <= 0 || usernameToTest.length >= 20)
			return false
		return /[0-9a-zA-Z_.\-]{4}/gmi.test(usernameToTest);
	}

	function handleCreate(event) {
		// if (true)
		// 	event.preventDefault()
	}
</script>

<main>
	<label for="input-pseudo">Tapez votre pseudo :</label>
	<input type="text" name="pseudo" id="input-pseudo" bind:value={username} />
	<div class="btn-container">
		<a class="btn" on:click={handleCreate} href="/options" class:disabled={!isUsernameValid(username)}>
			<span>Créer une partie</span>
		</a>
		<a class="btn" href="/join" class:disabled={!isUsernameValid(username)}>
			<span>Rejoindre une partie</span>
		</a>
	</div>
</main>