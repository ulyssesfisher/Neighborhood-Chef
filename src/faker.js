const $ = require("jquery");
var faker = require('faker');
const cuisineArray = ["American", "Greek", "Mexican","Chinese","Thai","Indian","Italian"];
const numberOfChefs = 5;

const createChefProfile = function(chef) {
    return `
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
`};

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

const createChefProfiles = function(){
    for(let i = 0; i < numberOfChefs; i++) {
        const chef = createChef();

        const profile = createChefProfile(chef);

        $('#wrapper').append(profile);
    }
  }

  export default createChefProfiles;