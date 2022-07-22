import { writable } from "svelte/store";

let userLocal = {};
if (typeof localStorage !== "undefined")
	userLocal = JSON.parse(localStorage.getItem("user"));

export const user = writable(userLocal || {
	name: ""
});

user.subscribe(val => {
	if (typeof localStorage !== "undefined")
		localStorage.setItem("user", JSON.stringify(val))
});