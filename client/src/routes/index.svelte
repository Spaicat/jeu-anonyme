<script>
	import "../global.scss";
	import { user } from "../stores.js";
	import io from "socket.io-client";

	const socket = io("http://localhost:5000", {
		withCredentials: true
	});
	
	let username = $user.name;
	$: usernameTrimed = username.trim();
	$: isUsernameValid = !(usernameTrimed.length <= 0 || usernameTrimed.length >= 20)
			&& /[0-9a-zA-Z_.\-]{4}/gmi.test(usernameTrimed);

	function handleCreate(event) {
		if (!isUsernameValid) {
		 	event.preventDefault()
			return;
		}
		
		// Save username
		localStorage.setItem("username", username.trim());
		console.log(username);
		user.changeName(username.trim());

		socket.emit("create-room", (room) => {
			user.changeRoom(room.id);
			console.log(user);
		});
	}
</script>

<main>
	<h1>{username}</h1>
	<label for="input-pseudo">Tapez votre pseudo :</label>
	<input type="text" name="pseudo" id="input-pseudo" bind:value={username} />
	<div class="btn-container">
		<a class="btn" on:click={handleCreate} href="/options" class:disabled={!isUsernameValid}>
			<span>Créer une partie</span>
		</a>
		<a class="btn" href="/join" class:disabled={!isUsernameValid}>
			<span>Rejoindre une partie</span>
		</a>
	</div>
</main>