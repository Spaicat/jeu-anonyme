/**
 * Get a fixed size random id compose of integers
 * @example makeIntId(6) // return "011698"
 * @param {int} size Fixed length of the id
 * @returns {string} The id generated value
 */
export const makeIntId = (size) => {
	return Math.random().toString().slice(2, 2 + size);
}