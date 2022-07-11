import "dotenv/config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true
	}
});

let rooms = {};

const joinRoom = (socket, room) => {
	room.sockets.push(socket);
	socket.join(room.id);
};

const leaveRooms = (socket) => {
	const roomsToDelete = [];
	for (const id in rooms) {
		const room = rooms[id];
		if (room.sockets.includes(socket)) {
			socket.leave(id);
			room.sockets = room.sockets.filter((item) => item !== socket);
		}
		if (room.sockets.length == 0) {
			roomsToDelete.push(room);
		}
	}

	for (const room of roomsToDelete) {
		delete rooms[room.id];
	}
};

io.on("connection", (socket) => {
	socket.on("create-room", (callback) => {
		const room = {
			id: Math.random().toString().slice(2, 8),
			sockets: []
		};
		rooms[room.id] = room;
		joinRoom(socket, room);
		callback({ id: room.id });
	});

	socket.on("join-room", (roomId, callback) => {
		joinRoom(socket, rooms[roomId]);
		callback({ id: roomId });
	});

	socket.on("disconnect", () => {
		leaveRooms(socket);
	});
});

httpServer.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});