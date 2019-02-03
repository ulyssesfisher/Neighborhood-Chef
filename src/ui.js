const $ = require("jquery");
import { createChefProfiles } from "./faker";

/**
 * Renders a list of results and appends them to page
 *
 * @param {Array} restaurants - list of restaurants to append
 */
const renderResultsPage = function(restaurants) {
  console.log(restaurants)
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
                <a href="${restaurant.menu_url}" target="_blank" class="btn btn-sm btn-outline-secondary">Home</a>
                <a href="" class="btn btn-sm btn-outline-secondary">Contact</a>
                </div>
                <small class="text-muted">X Miles Away</small>
              </div>
            </div>
          </div>
        </div>
      `;
  });

  let profiles = createChefProfiles(4);

  let resultsPage = `
    <nav class="navbar navbar-expand-lg navbar-dark mb-5" style="background-color: #8C4D2E;">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link" href="#">Features</a>
        <a class="nav-item nav-link" href="#">Pricing</a>
        <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </nav>
    <div class="container">
      <div id="wrapper">
        <h2>Chefs</h2>
        <div class="card-deck" id="chef-results">
          ${profiles}
        </div>

        <hr>

        <h2>Restaurants</h2>
        <div class="row" id="restaurant-results">
          ${restaurantView}
        </div>
      </div>
    </div>
    `;

  renderPage(resultsPage);
};

/**
 * Changes content of the html page
 *
 * @param {String} page - the html content we want to add
 */
const renderPage = function(page) {
  const pageContainer = $("#page");

  pageContainer.fadeOut(400, function() {
    pageContainer.empty();
    pageContainer.append(page).fadeIn();
  });
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

// TODO: use object shorthand syntax
const ui = {
  showLoadingState: showLoadingState,
  renderPage: renderPage,
  renderResultsPage: renderResultsPage
};

export default ui;
