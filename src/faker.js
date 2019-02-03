const $ = require("jquery");
var faker = require('faker');
const cuisineArray = ["American", "Greek", "Mexican","Chinese","Thai","Indian","Italian"];

/**
 * Create an html template for the chef profile
 *
 * @param {Object) An object representing the chef data
 *
 * @return {String} An string containing the html template for a chef profile template
 */
const createChefProfileTemplate = function(chef) {
    return (`
        <div class="card p-2" id="chef-${chef.id}" style="width: 18rem;">
            <img class="card-img-top rounded" src="${chef.avatar}">
            <div class="card-body">
				<img class="rounded-circle float-right" height="57.91" width="57.91" src="${chef.avatar}">
				<h5 class="card-title text-muted">${chef.name}</h5>
				<i class="fas fa-star"></i>
				<i class="fas fa-star"></i>
				<i class="fas fa-star"></i>
				<i class="fas fa-star"></i>
				<i class="fas fa-star-half-alt"></i>

				<p class="text-muted text-center pt-3">
					Lorem Ipsum Lorem Ipsum
					Lorem Ipsum Lorem Ipsum
					Lorem Ipsum Lorem Ipsum
					Lorem Ipsum Lorem Ipsum
				</p>
				<button class="btn btn-primary btn-lg d-block mx-auto rounded-pill" style="width: 11.5rem;">See Menu</button>
            </div>
        </div>
	`)
};

/**
 * Creates an object containing key:pair values of the chef data
 *
 * @return {Object} The chef object
 */
const createChef = function() {
    return {
        id: faker.random.uuid(),
        avatar: faker.image.avatar(),
        name: faker.name.findName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        website: faker.internet.domainName(),
        cuisines: cuisineArray[Math.floor(Math.random() * cuisineArray.length)]
    }
};

/**
 * Creates multiple chef profiles
 *
 * @param {Number} number - the number of chefs to create
 */
const createChefProfiles = function(numberOfChefs){
    let template = "";

    for(let i = 0; i < numberOfChefs; i++) {
        const chef = createChef();

        template += createChefProfileTemplate(chef);
    }

    return template;
  }

  export { createChefProfiles };
