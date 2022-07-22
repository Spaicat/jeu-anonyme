<script>
	import { user } from "../stores/user.js";
	import { room } from "../stores/room.js";
	import { io } from "$lib/realtime";
</script>

<main>
	<div>
		Code #{$room.roomId}
	</div>
	<div>
		<ul>
			{#each $room.users as username}
				<li>{ username }</li>
			{/each}
		</ul>
	</div>
	<div class="btn-container">
		<a class="btn" href="#">
			<span>Commencer</span>
		</a>
		<a class="btn" href="/options">
			<span>Options</span>
		</a>
		<a class="btn" href="/">
			<span>Quitter</span>
		</a>
	</div>
</main>