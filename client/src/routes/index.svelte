<script>
	import "../global.scss";
	import { username } from "../stores.js";
	
	$: usernameTrimed = $username.trim();
	$: isUsernameValid = !(usernameTrimed.length <= 0 || usernameTrimed.length >= 20)
			&& /[0-9a-zA-Z_.\-]{4}/gmi.test(usernameTrimed);

	function handleCreate(event) {
		if (!isUsernameValid) {
		 	event.preventDefault()
			return;
		}
		
		localStorage.setItem("username", $username.trim());
	}
</script>

<main>
	<label for="input-pseudo">Tapez votre pseudo :</label>
	<input type="text" name="pseudo" id="input-pseudo" bind:value={$username} />
	<div class="btn-container">
		<a class="btn" on:click={handleCreate} href="/options" class:disabled={!isUsernameValid}>
			<span>Créer une partie</span>
		</a>
		<a class="btn" href="/join" class:disabled={!isUsernameValid}>
			<span>Rejoindre une partie</span>
		</a>
	</div>
</main>