import { writable } from "svelte/store";

let usernameLocal = "";
if (typeof localStorage !== "undefined")
	usernameLocal = localStorage.username || "";

const username = writable(usernameLocal);

export {username};