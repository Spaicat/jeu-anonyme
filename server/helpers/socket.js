/**
 * Check if the user socket is host of the room
 * @param {*} room Room to check
 * @param {string} socketId Socket to check to see if it's the host
 * @returns {Boolean} True if socket is the host of the room
 */
export const isHost = (room, socketId) => {
	return room.host.socketId === socketId;
}

/**
 * Check if the user socket is in the room
 * @param {*} room Room to check
 * @param {string} socketId Socket to check to see if it's in the room
 * @returns {Boolean} True if socket is in the room
 */
export const isRoomHasUser = (room, socketId) => {
	return !!room.users.some(elt => elt.socketId === socketId);
}