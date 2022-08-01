<script context="module">
	import "../styles/global.scss";
	import { browser } from "$app/env";
	import { io } from "$lib/realtime";

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