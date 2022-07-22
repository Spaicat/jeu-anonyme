import ioClient from "socket.io-client";

const socket = ioClient("http://localhost:5000", {
	withCredentials: true,
	autoConnect: false
});

export const io = socket;