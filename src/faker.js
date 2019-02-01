const $ = require("jquery");
var faker = require('faker');
const cuisineArray = ["American", "Greek", "Mexican","Chinese","Thai","Indian","Italian"];
let array = [];




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

