/**
 * @var
 *
 * @type {Array}
 * The list of restaurants that match viewer's query
 */
let restaurants = [];

/**
 * Sets data upon the restaurants array
 *
 * @param {Array} data - the array of data from the zomato api
 */
const set = function(data) {
	restaurants = data;
}

export { restaurants, set}
