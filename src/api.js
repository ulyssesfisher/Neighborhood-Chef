const $ = require("jquery");

const api = {
    /**
     * Method used to fetch data from an api
     *
     * @param {String} url The url we want to hit
     * @param {Object} options An optional object containing the header options that can be passed to $.ajax function
     */
    get(url, options = {}) {
        return $.ajax(Object.assign({
			url: url,
			method: "GET"
		}, options))
    }
}

export default api;
