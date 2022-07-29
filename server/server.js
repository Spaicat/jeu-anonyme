import "dotenv/config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { isHost, isRoomHasUser } from "./helpers/socket.js";
import { makeIntId } from "./helpers/utils.js";

const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true
	}
});

let rooms = new Map();

const createRoom = (host) => {
	const roomId = makeIntId(6);
	const room = {
		roomId,
		host,
		users: [host],
		inGame: false,
	};
	rooms.set(roomId, room);

	return room;
};

const joinRoom = (roomId, user) => {
	let room = rooms.get(roomId);
	room.users.push(user);
	rooms.set(roomId, room);
	
    return room;
};

const closeRoom = (roomId) => {
	rooms.delete(roomId);
};

const leaveRooms = (socket) => {
	for (const room of rooms.values()) {
		if (isRoomHasUser(room, socket.id)) {
			// Remove user from the room
			room.users = room.users.filter(elt => elt.socketId !== socket.id);
			socket.leave(socket.id);
			
			// Choose random host if he leaves
			if (!room.users.some(elt => elt.socketId === room.host.socketId))
				room.host = room.users[0];

			if (room.users.length == 0 || !room.host)
				closeRoom(room.roomId);
				
			io.to(room.roomId).emit("user-disconnected", room);
		}
	}
};

io.on("connection", (socket) => {
	socket.on("create-room", (user) => {
		leaveRooms(socket);
		
		const room = createRoom({ ...user, socketId: socket.id });
		console.log("Room: " + room.roomId + " has been created");
		
		socket.join(room.roomId);
		io.to(socket.id).emit("room-created", room);
	});

	socket.on("join-room", (roomId, user) => {
		if (!rooms.has(roomId)) {
			io.to(socket.id).emit("error", "Room does not exist");
			return;
		}
		leaveRooms(socket);
		
		const room = joinRoom(roomId, { ...user, socketId: socket.id });

		socket.join(roomId);
		io.to(roomId).emit("user-joined", room);
	});

	socket.on("start-game", (roomId) => {
		const room = rooms.get(roomId);
		if (!isRoomHasUser(room, socket.id))
			io.to(socket.id).emit("error", "User not in room");
		if (!isHost(room, socket.id))
			io.to(socket.id).emit("error", "User not host");

		room.inGame = true;
		io.to(roomId).emit("game-started", room);
	});

	socket.on("disconnect", () => {
		leaveRooms(socket);
	});
});

httpServer.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
