/**
 * This file is reserved for functions that apply to making ui changes.
 */

const $ = require("jquery");

const renderRestaurants = function(restaurants) {
    let resultsPage = "";

    restaurants.forEach(restaurant => {
      resultsPage += `
        <div>
          <p>${restaurant.restaurant.name}</p>
        </div>
        <br>
      `;
    });
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
    renderRestaurants: renderRestaurants,
}

export default ui;