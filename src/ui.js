const $ = require("jquery");
import { createChefProfiles } from "./faker";

/**
 * Renders a list of results and appends them to page
 *
 * @param {Array} restaurants - list of restaurants to append
 */
const renderResultsPage = function(restaurants) {
    let restaurantView = "";

    restaurants.forEach(restaurant => {
      restaurantView += `
        <div class="card">
          <div class="card-body">
            <p>${restaurant.restaurant.name}</p>
          </div>
        </div>
      `;
    });

    let profiles = createChefProfiles(4);

    let resultsPage = `
    <div class="container">
      <div id="wrapper">
        <h2>Chefs</h2>
        <div class="card-deck" id="chef-results">
          ${profiles}
        </div>

        <h2>Restaurants</h2>
        <div class="card-deck" id="restaurant-results">
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
  const pageContainer = $('#page');

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
    renderResultsPage: renderResultsPage,
}

export default ui;
