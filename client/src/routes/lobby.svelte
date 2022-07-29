<script>
	import { user } from "../stores/user.js";
	import { room } from "../stores/room.js";
	import { io } from "$lib/realtime";
	import { goto } from '$app/navigation';

	$: isHost = $room.host?.socketId === $user.socketId;

	io.on("game-started", (roomInfo) => {
		$room = roomInfo;
		goto("/play");
	});

	function handleStart() {
		io.emit("start-game", $room.roomId);
	}

	function handleQuit() {
		io.disconnect();
	}
</script>

<main>
	<div>
		Code #{$room.roomId}
	</div>
	<div>
		<ul>
			{#each $room.users || [] as user}
				<li>
					{#if $room.host.socketId === user.socketId}
						&lt;Host&gt;
					{/if}
					{ user.name }
				</li>
			{/each}
		</ul>
	</div>
	<div class="btn-container">
		{#if isHost}
		<a class="btn" on:click={handleStart} href="/play">
			<span>Commencer</span>
		</a>
		{/if}
		<a class="btn" on:click={handleQuit} href="/">
			<span>Quitter</span>
		</a>
	</div>
</main>