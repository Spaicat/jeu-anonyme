<script>
	import { user } from "../stores/user.js";
	import { room } from "../stores/room.js";
	import { io } from "$lib/realtime";
	import { goto } from '$app/navigation';

	$: isHost = $room.host?.socketId === $user.socketId;

	io.on("disconnect", () => {
		console.error("Disconnected");
		goto("/");
	});

	io.on("user-disconnected", (roomInfo) => {
		console.log(roomInfo);
		$room = roomInfo;
	});

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
	<h2>
		Code #{$room.roomId}
	</h2>
	<div class="user__container">
		<ul class="user__list">
			{#each $room.users || [] as userItem}
				<li class="user__item">
					<div class="user__icon">
						<img class="user__avatar" src="https://avatars.dicebear.com/api/initials/{userItem.name}.svg" alt="avatar">
						<div class="user__details">
							{#if userItem.socketId === $room.host.socketId}
								<div>H</div>
							{/if}
							{#if userItem.socketId === $user.socketId}
								<div>Me</div>
							{/if}
						</div>
					</div>
					<div class="user__name">{ userItem.name }</div>
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

<style lang="scss">
	@use "../styles/variables.scss" as v;

	.user {
		&__container {
			padding: 5px;
		}
		&__list {
			display: flex;
			flex-direction: row;
			padding: 0;
		}
		&__item {
			list-style: none;
		}
		&__icon {
			position: relative;
		}
		&__avatar {
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
		&__details {
			position: absolute;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
	}
</style>