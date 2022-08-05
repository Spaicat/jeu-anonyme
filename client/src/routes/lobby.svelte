<script>
	import { user } from "../stores/user.js";
	import { room } from "../stores/room.js";
	import { io } from "$lib/realtime";
	import { goto } from "$app/navigation";
	import Options from "../components/Options.svelte"
	import CrownIcon from "../assets/icons/CrownIcon.svelte";
	import UserIcon from "../assets/icons/UserIcon.svelte";

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
						<div class="user__avatar">
							<img src="https://avatars.dicebear.com/api/initials/{userItem.name}.svg" alt="avatar">
						</div>
						<div class="user__details">
							{#if userItem.socketId === $room.host.socketId}
								<div class="details-icon host-icon">
									<CrownIcon />
								</div>
							{/if}
							{#if userItem.socketId === $user.socketId}
								<div class="details-icon self-icon">
									<UserIcon />
								</div>
							{/if}
						</div>
					</div>
					<div class="user__name">{ userItem.name }</div>
				</li>
			{/each}
		</ul>
	</div>
	<Options />
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

	h2 {
		margin: 0;
		text-align: center;
	}
	.btn-container {
		flex-direction: row;
	}
	.user {
		&__container {
			display: flex;
			justify-content: center;
			padding: 5px;
			width: 100%;
		}
		&__list {
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			overflow-y: hidden;
			scrollbar-width: thin;
			-webkit-overflow-scrolling: touch;
			padding: 0;
		}
		&__item {
			flex: 1 1 auto;
			margin: 0 10px;
			list-style: none;
		}
		&__icon {
			position: relative;
			margin: 0 10px 8px 10px;
		}
		&__name {
			text-align: center;
		}
		&__avatar {
			overflow: hidden;
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
		&__details {
			position: absolute;
			bottom: -5px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-between;
			width: 65px;
			.details-icon {
				display: flex;
				padding: 3px;
				background-color: #3646be;
				border: 1px solid white;
				border-radius: 50%;
				:global(svg) {
					width: 15px;
					height: 15px;
				}
			}
		}
	}
</style>