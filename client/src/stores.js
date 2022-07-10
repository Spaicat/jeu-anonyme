import { writable } from "svelte/store";

let usernameLocal = "";
if (typeof localStorage !== "undefined")
	usernameLocal = localStorage.username || "";

const user = writable(usernameLocal);

export {user};