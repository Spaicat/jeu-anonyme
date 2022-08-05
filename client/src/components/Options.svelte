<script>
	import UserIcon from "../assets/icons/UserIcon.svelte";
	let mode = 1;

	function handleConfirm() {
		alert("Mode " + mode);
	}
</script>

<div class="options">
	<div class="options__wrapper">
		<ul class="options__main">
			<li
				class="{mode === 0 ? 'checked' : ''}"
				on:click="{() => mode = 0}"
			>
				<figure>
					<UserIcon />
				</figure>
				<div class="details">
					<h4 class="details__title">Mode honnête</h4>
					<p class="details__text">Partagez des anecdotes discrètement sans que personne apprenne que c'est vous.</p>
				</div>
			</li>
			<li
				class="{mode === 1 ? 'checked' : ''}"
				on:click="{() => mode = 1}"
			>
				<figure>
					<UserIcon />
				</figure>
				<div class="details">
					<h4 class="details__title">Mode imposteur</h4>
					<p class="details__text">Partagez vos meilleurs ragots, mais faites attention quelqu'un ne dit pas forcément la vérité.</p>
				</div>
			</li>
		</ul>
	</div>
</div>

<style lang="scss">
@use "../styles/variables.scss" as v;

.options {
	display: flex;
	overflow: auto;
	width: 100%;
	max-width: 700px;
	height: 100%;
	&__wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	&__main {
		display: flex;
		flex-direction: column;
		li {
			cursor: pointer;
			display: flex;
			flex-direction: row;
			margin: 5px;
			padding: 10px;
			background-color: #29354D;
			border-radius: v.$bd-radius;
			&.checked {
				fill: v.$back-color;
				color: v.$back-color;
				background-color: #87D4FF;
			}
			figure {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 0 0 auto;
				margin: 0;
				margin-right: 5px;
				width: 100px;
			}
			.details {
				margin: 15px 0;
				&__title {
					margin: 0;
					font-size: 16px;
				}
				&__text {
					margin: 0;
					font-size: 13px;
				}
			}
		}
	}
}
</style>