const $ = require("jquery");
import ui from "./ui";
import api from "./api";

if ("geolocation" in navigator) {
	//console.log(
		//navigator.geolocation.getCurrentPosition(function(position) {
			//console.log('position', position)
		//})
	//);
} else {
	console.log('no geolocation');
}

// The api key for the zomato api
// feel free to change as needed
const zomatoApiKey = "4732218ff276d0553217a3671fcd8ebf";

// if we hit the enter button on the query input don't submit the form
$("#query-input").on("keydown", function(e) {
  if (e.keyCode == 13) e.preventDefault();
});

// The event that occurs when the user hits the search button
// for a category
$("#search-btn").on("click", function(e) {
  e.preventDefault();
  ui.showLoadingState(e.target);

  const query = $("#query-input").val().trim();

  const queryUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=288&entity_type=city&q=${query}`;

  api.get(queryUrl, {
	beforeSend: function(xhr) {
	  xhr.setRequestHeader("user-key", zomatoApiKey);
	}
  }).then(function(response) {
		ui.renderResultsPage(response.restaurants);
  });
});
