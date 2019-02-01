const cuisineArray = [];

let array = []

queryURL = `https://developers.zomato.com/api/v2.1/cuisines?city_id=288`;

$.ajax({
    url: queryURL,
    method: 'GET',
    beforeSend(apiKey) {
        apiKey.setRequestHeader("user-key", "93813bd7a2f287eab01ebee7d56af60b");
    },
}).then(function (response) {
    console.log(response.cuisines[1].cuisine.cuisine_name);
    array = response.cuisines;
    console.log(array[2]);
});

    for (let i = 0; i < 5; i++) {

        $('<img/>', {
            src: faker.image.avatar()
        }).appendTo('#wrapper');

        $('<div/>', {
            text: faker.name.findName()
        }).appendTo('#wrapper');

        $('<div/>', {
            text: faker.company.companyName()
        }).appendTo('#wrapper');

        $('<div/>', {
            text: faker.internet.email()
        }).appendTo('#wrapper');

        $('<div/>', {
            text: faker.internet.domainName()
        }).appendTo('#wrapper');

    }

