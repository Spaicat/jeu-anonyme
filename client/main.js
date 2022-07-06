import io from "socket.io-client";

const socket = io("http://localhost:5000");
socket.on("connect", () => {
	displayMessage(`You connected with id : ${socket.id}`);
});

socket.on("receive-message", (message) => {
	displayMessage(message);
});

const messageInput = document.getElementById("message-input");
const chatContainer = document.getElementById("chat-container");
const roomInput = document.getElementById("room-input");

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("clear-button").addEventListener("click", clearMessages);
document.getElementById("join-button").addEventListener("click", joinRoom);

function sendMessage() {
	const message = messageInput.value;
	const room = roomInput.value;

	if (message === "")
		return;
	
	displayMessage(message);
	socket.emit("send-message", message, room);

	messageInput.value = "";
}

function displayMessage(message) {
	let li = document.createElement("li");
	li.textContent = message;
	chatContainer.append(li);
}

function clearMessages() {
	chatContainer.innerHTML = "";
	console.log("Cleared messages !");
}

function joinRoom() {
	const room = roomInput.value;
	socket.emit("join-room", room, (message) => {
		displayMessage(message);
	});
}