import { writable } from "svelte/store";

function createUser() {
	let usernameLocal = "";
	if (typeof localStorage !== "undefined")
		usernameLocal = localStorage.username || "";

	const { subscribe, set, update } = writable({
		name: usernameLocal,
		room: ""
	});

	return {
		subscribe,
		changeName: (val) => update((user) => {
			return { ...user, "name": val }
		}),
		changeRoom: (val) => update((user) => {
			return { ...user, "room": val }
		}),
		reset: () => set({ name: "", room: "" })
	};
}

export const user = createUser();