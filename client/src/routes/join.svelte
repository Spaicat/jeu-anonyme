<script>
	import { user } from "../stores/user.js";
	import { io } from "$lib/realtime";
	let code = "";

	function handleJoin() {
		io.emit("join-room", code, { name: $user.name });
	}
</script>

<main>
	<label for="input-code">Tapez un code :</label>
	<input type="text" name="code" id="input-code" bind:value={code} />
	<div class="btn-container">
		<a class="btn" on:click={handleJoin} href="/lobby">
			<span>Rejoindre une partie</span>
		</a>
		<a class="btn" href="/">
			<span>Retour</span>
		</a>
	</div>
</main>