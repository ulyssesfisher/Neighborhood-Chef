import faker from "faker";

const chefs = [];

/**
 * Creates an object containing key:pair values of the chef data
 *
 * @return {Object} The chef object
 */
const createChef = function () {
	return {
		id: faker.random.uuid(),
		avatar: faker.image.avatar(),
		name: faker.name.findName(),
		company: faker.company.companyName(),
		email: faker.internet.email(),
		website: faker.internet.domainName(),
		bio: faker.lorem.paragraph(),
	}
};

export { createChef, chefs };
