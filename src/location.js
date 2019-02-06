import $ from 'jquery'
import { googleMapsKey } from '../apiKeys'

const googleMapsClient = require('@google/maps').createClient({
	key: googleMapsKey,
	Promise: Promise
});

let userPosition = {};

const getDistance = (lat, lng) => {
   return googleMapsClient.distanceMatrix({
        origins: `${userPosition.coords.latitude}, ${userPosition.coords.longitude}`,
        destinations: `${lat}, ${lng}`,
	}).asPromise()
}

const success = (position) => {
    userPosition = position;
}

const error = (error) => {
    $(".toast").toast('show');
}

navigator.geolocation.getCurrentPosition(success, error)

export { userPosition, getDistance };
