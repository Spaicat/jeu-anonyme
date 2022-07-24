<script>
	import { user } from "../stores/user.js";
	import { room } from "../stores/room.js";
	import { io } from "$lib/realtime";

	let username = $user.name || "";
	$: usernameTrimed = username.trim();
	$: isUsernameValid = !(usernameTrimed.length <= 0 || usernameTrimed.length >= 20)
			&& /[0-9a-zA-Z_.\-]{4}/gmi.test(usernameTrimed);
	
	io.connect();
	
	io.on("room-created", (roomInfo) => {
		console.log("socket on create-room: ", room.roomId);
		console.log(roomInfo);
		$room = roomInfo
	})

	io.on("user-joined", (roomInfo) => {
		console.log(roomInfo);
		$room = roomInfo
	});
	
	function handleCreate(event) {
		if (!isUsernameValid) {
		 	event.preventDefault()
			return;
		}
		
		let name = username.trim();
		
		io.auth = { name };
		$user.name = name
		io.emit("create-room", { name });
	}
	
	function handleJoin(event) {
		if (!isUsernameValid) {
		 	event.preventDefault()
			return;
		}
		
		let name = username.trim();
		
		io.auth = { name };
		$user.name = name
	}

	function userDisconnect() {
		io.emit("disconnect")
	}
</script>

<svelte:window on:unload={userDisconnect} />

<main>
	<h1>{username}</h1>
	<label for="input-pseudo">Tapez votre pseudo :</label>
	<input type="text" name="pseudo" id="input-pseudo" bind:value={username} />
	<div class="btn-container">
		<a class="btn" on:click={handleCreate} href="/lobby" class:disabled={!isUsernameValid}>
			<span>Créer une partie</span>
		</a>
		<a class="btn" on:click={handleJoin} href="/join" class:disabled={!isUsernameValid}>
			<span>Rejoindre une partie</span>
		</a>
	</div>
</main>