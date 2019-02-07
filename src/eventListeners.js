import $ from "jquery";
import api from "./api";
import { zomatoApiKey } from "../apiKeys";
import { set } from "./restaurants";
import { chefs } from "./chefs";
import { restaurants } from "./restaurants";
import ui from "./ui";
import { initMap } from "./location";

/**
 * Prevent enter button on the query input from submitting the form
 */
$("#query-input").on("keydown", function (e) {
	if (e.keyCode == 13) e.preventDefault();
});

/**
 * The event that occurs when the user hits the search button for a category
 *
 * @param {event} event The event listener event
 */
const search = function (event) {
	event.preventDefault();

	ui.showLoadingState(event.target);

	const query = $("#query-input").val().trim();

	const queryUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=288&entity_type=city&q=${query}`;

	api.get(queryUrl, {
		beforeSend: function (xhr) {
			xhr.setRequestHeader("user-key", zomatoApiKey);
		}
	}).then(function (response) {
		set(response.restaurants);
		ui.renderResultsPage();
	});
}

/**
 * When triggered this event will show a modal that reveals the chef's info
 *
 * @param {event} event The event listener event
 */
const showChefInfo = function(event) {
	let profile = chefs.find(function (chef) {
		return chef.id == event.target.dataset.chefId;
	});

	ui.appendModalContent(`
		<div class="modalProfile">
			<p>Company: ${profile.company}</p>
			<p>Email: ${profile.email}</p>
			<p>This is the bio: ${profile.bio}</p>
		</div>
	`, profile.name);

	$("#info-modal").modal("show");
}

/**
 * When triggered this event will show a modal that reveals a restaurant's info
 *
 * @param {event} event The event listener event
 */
const showRestaurantInfo = function(event) {
	let restaurant = restaurants.find(function ({ restaurant }) {
		return restaurant.id == event.target.dataset.restId;
	});

	let r = restaurant.restaurant;

	ui.appendModalContent(`
		<div class="modalProfile" id="${r.id}">
			<p>Cuisine: ${r.cuisines}</p>
			<p> Address: ${r.location.address}<br>${r.location.city}</div></p>
			<p>Rating: ${r.user_rating.aggregate_rating}</p>
			<p>Votes: ${r.user_rating.votes}</p>
			<div id="map"></div>
		</div>
	`, r.name);

	 $("#info-modal").modal("show");

	 new google.maps.Map(document.getElementById(`map`), {
		center: {
			lat: parseFloat(r.location.latitude),
			lng: parseFloat(r.location.longitude)
		},
		zoom: 15
	  });
}

export {
	search,
	showChefInfo,
	showRestaurantInfo
}
