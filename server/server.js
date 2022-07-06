import "dotenv/config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000"
	}
});

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("send-message", (message, room) => {
		if (room === "")
			socket.broadcast.emit("receive-message", message);
		else
			socket.to(room).emit("receive-message", message);
	});
	socket.on("join-room", (room, callback) => {
		socket.join(room);
		callback(`Joined ${room}`);
	});
});

httpServer.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});