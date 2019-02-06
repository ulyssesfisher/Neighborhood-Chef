import $ from 'jquery';
import { restaurants } from './restaurants';
import { chefs, createChef } from "./chefs";

/**
 * Create an html template for the chef profile
 *
 * @param {Object) An object representing the chef data
 *
 * @return {String} An string containing the html template for a chef profile template
 */
const createChefProfileTemplate = function (chef) {
	const cuisine = $("#query-input").val().toUpperCase();

	return (`
        <div class="card p-2 col-sm-4 col-xs-12 shadow-sm" id="chef-${chef.id}">
            <img class="card-img-top rounded" src="${chef.avatar}">
            <div class="card-body d-flex flex-column align-items-center">

				<h5 class="card-title text-muted">
					${chef.name}
				</h5>

				<div>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star-half-alt"></i>
				</div>

				<span class="badge badge-secondary">${cuisine}</span>

				<p class="text-muted overflow-hidden line-clamp mt-3">
					${chef.bio}
				</p>

				<button class="btn btn-primary btn-lg d-block mt-auto rounded-pill chef-btn" data-chef-id="${chef.id}">
					Details
				</button>
            </div>
        </div>
    `)
};

const createRestaurantTemplate = function (restaurant) {
	if (restaurant.thumb == "") {
		restaurant.thumb = "https://res.cloudinary.com/dqmge8cle/image/upload/v1549389069/nclogo_alt.svg"
	}

	return (`
		<div class="col-md-4 col-xs-12">
			<div class="card mb-4 shadow-sm">
				<img class="card-img-top" src="${restaurant.thumb}">
				<div class="card-body">
					<p class="card-text">${restaurant.name}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<a href="${restaurant.menu_url}" target="_blank" class="btn btn-sm btn-outline-secondary">Menu</a>
							<a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary restaurant-modal" data-rest-id="${restaurant.id}">Details</a>
						</div>
						<small class="text-muted">X Miles Away</small>
					</div>
				</div>
			</div>
		</div>
	`);
}

/**
 * Creates multiple chef profiles
 *
 * @param {Number} number - the number of chefs to create
 *
 * @return {String} template - a string representing all the chefs in a single template
 */
const createChefProfiles = function (numberOfChefs) {
	let template = "";

	for (let i = 0; i < numberOfChefs; i++) {
		const chef = createChef();

		template += createChefProfileTemplate(chef);

		chefs.push(chef);
	}

	return template;
}

/**
 * Build up the results pate
 *
 * @param {String} chefProfiles - html content representing chef profiles
 * @param {String} restaurantView - html content respresenting restaurants
 *
 * @return {String} resultsPage - html content representing the entire results page
 */
const buildResultsPage = function() {
  let restaurantView = "";

  restaurants.forEach(function({ restaurant }) {
	  restaurantView += createRestaurantTemplate(restaurant)
  });

  let chefProfiles = createChefProfiles(4);

  return(`
    <nav class="navbar navbar-expand-lg navbar-dark mb-5" style="background-color: #8C4D2E;">
	<a class="navbar-brand" href="index.html">Neighborhood Chef</a>
  </nav>
    <div class="container">
      <div id="wrapper">
        <h2 class="text-md-left text-center">Chefs</h2>
        <div class="card-deck" id="chef-results">
          ${chefProfiles}
        </div>

        <hr>

        <h2 class="text-md-left text-center">Restaurants</h2>
        <div class="row" id="restaurant-results">
          ${restaurantView}
        </div>
      </div>
    </div>
    `);
}

const template = {
	createChefProfiles,
	buildResultsPage
}

export default template;
