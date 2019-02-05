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
        <div class="card p-2 col-3 col-xs-12 shadow-sm" id="chef-${chef.id}" style="width: 18rem;">
            <img class="card-img-top rounded" src="${chef.avatar}">
            <div class="card-body">
				<img class="rounded-circle float-right" height="57.91" width="57.91" src="${chef.avatar}">
				<h5 class="card-title text-muted">${chef.name}</h5>
				<i class="fas fa-star"></i>
				<i class="fas fa-star"></i>
				<i class="fas fa-star"></i>
				<i class="fas fa-star"></i>
				<i class="fas fa-star-half-alt"></i>
				<p class=chef-cuisine>Chef Specialty: ${cuisine}</p>
				<p class="text-muted text-center pt-3">
                <div class = "chefBio">${chef.bio}</div>
				</p>
				<button class="btn btn-primary btn-lg d-block mx-auto rounded-pill chef-btn" data-chef-id="${chef.id}" style="width: 11.5rem;">See Menu</button>
            </div>
        </div>
    `)
};

const createRestaurantTemplate = function (restaurant) {
	if (restaurant.thumb == "") {
		restaurant.thumb = "https://res.cloudinary.com/dqmge8cle/image/upload/v1549389069/nclogo_alt.svg"
	}

	return (`
		<div class="col-4 col-xs-12">
			<div class="card mb-4 shadow-sm">
				<img class="" src="${restaurant.thumb}">
				<div class="card-body">
					<p class="card-text">${restaurant.name}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<a href="${ restaurant.menu_url}" target="_blank" class="btn btn-sm btn-outline-secondary">Home</a>
							<a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary restaurant-modal" data-rest-id="${ restaurant.id}">Contact</a>
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
    <a class="navbar-brand" href="#">Neighborhood Chef</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link" href="#">Features</a>
        <a class="nav-item nav-link" href="#">Pricing</a>
      </div>
    </div>
  </nav>
    <div class="container">
      <div id="wrapper">
        <h2>Chefs</h2>
        <div class="card-deck" id="chef-results">
          ${chefProfiles}
        </div>

        <hr>

        <h2>Restaurants</h2>
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
