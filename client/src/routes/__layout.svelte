<script context="module">
	import "../global.scss";
	import { browser } from "$app/env";

	// TODO : User & Room validation

	export async function load({ url }) {
		let user = null;
		if (browser) {
			user = JSON.parse(localStorage.getItem("user"));
		}

		const userValid = user !== null
			&& typeof user.name === "string"
			&& user.name !== "";
	
		if (browser && url.pathname !== "/" && !userValid) {
			return {
				status: 302,
				redirect: "/"
			};
		}

		return {};
	}
</script>
<slot />