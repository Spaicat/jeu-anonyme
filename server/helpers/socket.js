/**
 * Check if the socket is host of the room
 * @param {*} room Room to check
 * @param {string} socketId Socket to check to see if it's the host
 * @returns {Boolean} True if socket is the host of the room
 */
export const isHost = (room, socketId) => {
	return room.users.some(elt => elt.socketId === socketId);
}