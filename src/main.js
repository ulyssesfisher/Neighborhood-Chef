$('#search-btn').on('click', (e) => {
  e.preventDefault();

  const query = $('#query-input').val().trim();

  const queryUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=288&entity_type=city&q=${query}`;

  $.ajax({
    url: queryUrl,
    method: 'GET',
    beforeSend(xhr) {
	  xhr.setRequestHeader('user-key', '4732218ff276d0553217a3671fcd8ebf');
    },
  }).then((response) => {
    const restaurants = response.restaurants;

    restaurants.forEach((restaurant) => {
	  $('#results').append(`
			<div>
				<p>${restaurant.restaurant.name}</p>
			</div>
		`);
    });
  });
});
