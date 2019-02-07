import $ from 'jquery'
import { googleMapsKey } from '../apiKeys'

/**
 * @constant
 * @type {Object}
 *
 * The user's position if the browser supports and user's gives permission
 */
let userPosition = {};

/**
 * The google maps client
 *
 * The current instantiation makes it return methods as promise
 * Code accordingly...
 */
const googleMapsClient = require('@google/maps').createClient({
	key: googleMapsKey,
	Promise: Promise
});

/**
 * Locates how far away a place is using user's given coordinates
 *
 * @param {Number} lat The latitude coordinate to calculate distance from
 * @param {Number} lng The longitude coordinate to calculate distance from
 */
const getDistance = (lat, lng) => {
   return googleMapsClient.distanceMatrix({
        origins: `${userPosition.coords.latitude}, ${userPosition.coords.longitude}`,
        destinations: `${lat}, ${lng}`,
	}).asPromise()
}

/**
 * Get the user's location
 *
 * First we check to make sure the browser supports geolocation
 * If so, then we get the position and store it in the userPosition object
 */
if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition((position) => {
		userPosition = position;
	}, (error) => {
		$(".toast").toast('show');
	})
}

export { userPosition, getDistance, initMap };
