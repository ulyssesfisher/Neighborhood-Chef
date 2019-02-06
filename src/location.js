import { googleMapsKey } from '../apiKeys'
import api from "./api";

const googleMapsClient = require('@google/maps').createClient({
    key: googleMapsKey
});

let userPosition = {};

const getDistance = (lat, lng) => {
    googleMapsClient.distanceMatrix({
        origins: `${userPosition.coords.latitude}, ${userPosition.coords.longitude}`,
        destinations: `${lat}, ${lng}`,
    }, function(err, response) {
        if (!err) {
            console.log(response.json)
          } else if (err === 'timeout') {
            // Handle timeout.
          } else if (err.json) {
            // Inspect err.status for more info.
          } else {
            // Handle network error.
          }
    })
}

const success = (position) => {
    userPosition = position;
}

const error = () => {
    $("#alert").toast('show');
}

navigator.geolocation.getCurrentPosition(success, error)

export { userLocation, getDistance };
