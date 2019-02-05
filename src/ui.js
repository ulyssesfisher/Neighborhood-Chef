const $ = require("jquery");
import { createChefProfiles, chefs } from "./faker";


// append the modal content
const appendModalContent= function(content) {
  $(".modal-body").empty();
  $(".modal-body").append(content);
}

// When you run the function, it appends the profile to the modal
const appendChefProfile = function (profile) {
  $(".modal-title").text(`${profile.name}`);

  appendModalContent(`
    <div class = "modalProfile">
      <p>This is the bio: ${profile.bio}</p>
      <p>Company: ${profile.company}</p>
      <p>Email: ${profile.email}</p>

    </div>
  `);

  // $(".modal-title").text(`${profile.name}`);
};

const appendRestaurantProfile = function ({ restaurant }) {
  $(".modal-title").text(`${restaurant.name}`);
console.log(restaurant);
  appendModalContent(`
    <div class="modalProfile">
    <p>Cuisine: ${restaurant.cuisines}</p>
     <p> Address: ${restaurant.location.address}<br>${restaurant.location.city}</div></p>
      <p>Rating: ${restaurant.user_rating.aggregate_rating}</p>
      <p>Votes: ${restaurant.user_rating.votes}</p>
    </div>
  `);
}

/**
 * Renders a list of results and appends them to page
 *
 * @param {Array} restaurants - list of restaurants to append
 */
const renderResultsPage = function (restaurants) {
  let restaurantView = "";

  restaurants.forEach(function ({ restaurant }) {
    console.log(restaurant.thumb);
   
   
    if (restaurant.thumb == ""){
      console.log(1)
      restaurant.thumb = "https://vignette.wikia.nocookie.net/thedailybugle/images/7/77/Ultimate_Spiderman_1.jpg/revision/latest/scale-to-width-down/365?cb=20120303020310";
    }
    restaurantView += `
        <div class="col-4 col-xs-12">
        <div class="card mb-4 shadow-sm">
            <img class="" src="${restaurant.thumb}">
            <div class="card-body">
              <p class="card-text">${restaurant.name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <a href="${restaurant.menu_url}" target="_blank" class="btn btn-sm btn-outline-secondary">Home</a>
                <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary restaurant-modal" data-rest-id="${restaurant.id}">Contact</a>
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

  // chef card event listener
  $('.chef-btn').on('click', function (event) {
    let chef = chefs.find(function (chef) {
      return chef.id == event.target.dataset.chefId;
    });
    appendChefProfile(chef);
    $('#chefModal').modal('show');
  });


// const cuisine = $( "#query-input" ).val();
//     console.log(cuisine)




  // restaurant card event listener
  $(".restaurant-modal").on("click", function() {
    let rest = restaurants.find(function ({ restaurant }) {
      return restaurant.id == event.target.dataset.restId;
    });

    appendRestaurantProfile(rest,);

    $('#chefModal').modal('show');
  })
};


/**
 * Changes content of the html page
 *
 * @param {String} page - the html content we want to add
 */
const renderPage = function (page) {
  const pageContainer = $("#page");

  // pageContainer.fadeOut(400, function() {
  pageContainer.empty();
  pageContainer.append(page)//.fadeIn();
  // });
};

/**
 * Shows the loading state inside of an element
 *
 * @param {String} selector the target selector
 */
const showLoadingState = function (selector) {
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

