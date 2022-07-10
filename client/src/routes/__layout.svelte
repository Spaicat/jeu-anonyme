<script context="module">
	import "../global.scss";
	import { browser } from "$app/env"
	import { get } from "svelte/store"
	import { user } from "../stores.js";


	export async function load({ url }) {
		if (browser && get(user) === "" && url.pathname !== "/") {
			return {
				status: 302,
				redirect: "/"
			};
		}

		return {};
	}
</script>
<slot></slot>