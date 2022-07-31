<script context="module">
	import "../global.scss";
	import { browser } from "$app/env";
	import { io } from "$lib/realtime";

	// TODO : User & Room validation

	export async function load({ url }) {
		if (browser && url.pathname !== "/" && !io.connected) {
			return {
				status: 302,
				redirect: "/"
			};
		}

		return {};
	}
</script>
<slot />