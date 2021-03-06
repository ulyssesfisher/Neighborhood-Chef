import $ from 'jquery';
import template from './templates';
import { showChefInfo, showRestaurantInfo } from './eventListeners'
import { getDistance, userPosition } from './location';

/**
 * Initilialize the alert toast
 */
$('.toast').toast({
	autohide: false
})

/**
 * Appends content to the modal content
 *
 * This method assumes that a bootstrap modal is used
 * A selector may be passed in to customize where
 * content is inserted
 *
 * @param {String}  content - the html content to be inserted into the selector
 * @param {String}  title - text to change modal title to
 * @param {String} [selector=.modal-body] the selector to target for inserting content
 */
const appendModalContent = function(content, title, selector = ".modal-body") {
  $(selector).empty();
  $(selector).append(content);

  if(title) {
    $(".modal-title").text(title);
  }
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
 * @param {String} [loadingText=Loading...] text to insert into loading state
 */
const showLoadingState = function(selector, loadingText="Loading...") {
  $(selector).empty();
  $(selector).append(
    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;${loadingText}`
  );
};

/**
 * Renders a list of results and appends them to page
 */
const renderResultsPage = function() {
  let page = template.buildResultsPage();

  renderPage(page);

  // chef card event listener
  $(".chef-btn").on("click", showChefInfo);

  // restaurant card event listener
  $(".restaurant-modal").on("click", showRestaurantInfo);

  // if we have user's location let's show how far away restaurant is
  if (userPosition.coords) {
	$('.location').each(function() {
		showLoadingState(this, " ");
		getDistance(this.dataset.lat, this.dataset.lng).then(
			response => $(this).text(response.json.rows[0].elements[0].duration.text)
		).catch(error => {
			// ?
		})
	})
  }
};

const ui = {
  showLoadingState: showLoadingState,
  renderPage: renderPage,
  renderResultsPage: renderResultsPage,
  appendModalContent: appendModalContent
};

export default ui;
