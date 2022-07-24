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

let rooms = new Map();

const createRoom = (host) => {
	const roomId = Math.random().toString().slice(2, 8); // TODO : utils function
	const room = {
		roomId,
		host,
		users: [host]
	};
	rooms.set(roomId, room);

	return room;
}

const joinRoom = (roomId, user) => {
	let room = rooms.get(roomId);
    room.users.push(user);
    rooms.set(roomId, room);
	
    return room;
};

const closeRoom = (roomId) => {
	rooms.delete(roomId);
};

const leaveRooms = (userId) => {
	for (const roomId in rooms) {
		const room = rooms[roomId];
		if (room.sockets.includes(userId)) {
			room.users = room.users.filter((elt) => elt.socket !== userId); // TODO: Change host if he leaves
		}
		if (room.sockets.length == 0) {
			closeRoom(roomId);
		}
	}
};

io.on("connection", (socket) => {
	socket.on("create-room", (user) => {
		const room = createRoom({ ...user, socket });
		console.log("Room: " + room.roomId + " has been created");
		
		// TODO : Leaves all others rooms : https://github.com/Quinzical/Quinzical-api/blob/65b4520dc8154744335dffffc61705a92a966aa5/src/socket/main.js#L51
		
		socket.join(room.roomId);
		io.to(socket.id).emit("room-created", room);
	});

	socket.on("join-room", (roomId, user) => {
		if (!rooms.has(roomId)) {
			io.to(socket.id).emit("error", "Room does not exist");
			return;
		}
		const room = joinRoom(roomId, { ...user, socket });

		// TODO : Same todo as above

		socket.join(room.roomId);
		io.to(room.roomId).emit("user-joined", room);
	});

	socket.on("disconnect", () => {
		leaveRooms(socket.id);
		for (const id in rooms) {
			const room = rooms[id];
			if (room.sockets.includes(socket.id)) {
				socket.leave(id);
			}
		}
	});
});

httpServer.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});