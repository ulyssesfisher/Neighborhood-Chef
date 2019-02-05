import $ from "jquery";
import { createChefProfiles, chefs } from "./faker";

/**
 * Appends content to the modal content
 *
 * This method assumes that a bootstrap modal is used
 * A selector may be passed in to customize where
 * content is inserted
 *
 * @param {String} [selector=.modal-body] the selector to target for inserting content
 * @param {String}  content - the html content to be inserted into the selector
 */
const appendModalContent = function(content, title, selector = ".modal-body") {
  $(selector).empty();
  $(selector).append(content);

  if(title) {
    $(".modal-title").text(title);
  }
};

/**
 * Appends the chef's profile to the modal body
 *
 * @param {String} profile - The html representation of a chef
 */
const appendChefProfile = function(profile) {
  appendModalContent(`
    <div class = "modalProfile">
      <p>This is the bio: ${profile.bio}</p>
      <p>Company: ${profile.company}</p>
      <p>Email: ${profile.email}</p>
    </div>
  `, profile.name);
};

/**
 *
 * @param {Object} Restaurant - the restaurant object return from the api
 * @param {Object} Restaurant.restaurant the restaurtant object containing restaurant info
 */
const appendRestaurantProfile = function({ restaurant }) {
  appendModalContent(`
    <div class="modalProfile">
      ${restaurant.name}
    </div>
  `, restaurant.name);
};

/**
 * Build up the results pate
 *
 * @param {String} chefProfiles - html content representing chef profiles
 * @param {String} restaurantView - html content respresenting restaurants
 *
 * @return {String} resultsPage - html content representing the entire results page
 */
const buildResultsPage = function(chefProfiles, restaurantView) {

  let resultsPage = `
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
    `;

    return resultsPage;
}

/**
 * Renders a list of results and appends them to page
 *
 * @param {Array} restaurants - list of restaurants to append
 */
const renderResultsPage = function(restaurants) {
  let restaurantView = "";

  restaurants.forEach(function({ restaurant }) {
    restaurantView += `
        <div class="col-4 col-xs-12">
        <div class="card mb-4 shadow-sm">
            <img class="" src="${restaurant.thumb}">
            <div class="card-body">
              <p class="card-text">${restaurant.name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <a href="${
                  restaurant.menu_url
                }" target="_blank" class="btn btn-sm btn-outline-secondary">Home</a>
                <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary restaurant-modal" data-rest-id="${
                  restaurant.id
                }">Contact</a>
                </div>
                <small class="text-muted">X Miles Away</small>
              </div>
            </div>
          </div>
        </div>
      `;
  });

  let profiles = createChefProfiles(4);

  let resultsPage = buildResultsPage(profiles, restaurantView);

  renderPage(resultsPage);

  // chef card event listener
  $(".chef-btn").on("click", function(event) {
    let chef = chefs.find(function(chef) {
      return chef.id == event.target.dataset.chefId;
    });
    appendChefProfile(chef);
    $("#chefModal").modal("show");
  });

  // restaurant card event listener
  $(".restaurant-modal").on("click", function() {
    let rest = restaurants.find(function({ restaurant }) {
      return restaurant.id == event.target.dataset.restId;
    });

    appendRestaurantProfile(rest);

    $("#chefModal").modal("show");
  });
};

/**
 * Changes content of the html page
 *
 * @param {String} page - the html content we want to add
 */
const renderPage = function(page) {
  const pageContainer = $("#page");

  pageContainer.empty();
  pageContainer.append(page);
};

/**
 * Shows the loading state inside of an element
 *
 * @param {String} selector the target selector
 */
const showLoadingState = function(selector) {
  $(selector).empty();
  $(selector).append(
    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Loading...`
  );
};

const ui = {
  showLoadingState: showLoadingState,
  renderPage: renderPage,
  renderResultsPage: renderResultsPage
};

export default ui;
