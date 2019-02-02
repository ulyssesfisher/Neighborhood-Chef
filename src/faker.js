const $ = require("jquery");
var faker = require('faker');
const cuisineArray = ["American", "Greek", "Mexican","Chinese","Thai","Indian","Italian"];
const numberOfChefs = 5;

/**
 * Create an html template for the chef profile
 *
 * @param {Object) An object representing the chef data
 *
 * @return {String} An string containing the html template for a chef profile template
 */
const createChefProfileTemplate = function(chef) {
    return (`
        <div id="chef-${chef.id}">
            <img src="${chef.avatar}">
            <div>
                <p>${chef.name}</p>
                <p>${chef.company}</p>
                <p>${chef.name}</p>
                <p>${chef.email}</p>
                <p>${chef.website}</p>
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
 */
const createChefProfiles = function(){
    for(let i = 0; i < numberOfChefs; i++) {
        const chef = createChef();

        const profile = createChefProfileTemplate(chef);

        $('#wrapper').append(profile);
    }
  }

  export default createChefProfiles;
