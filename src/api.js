import $ from "jquery";

const api = {
    /**
     * Fetches data from an api endpoint
     * @param {String} url The url we want to hit
     * @param {Object} [options] An optional object containing the header options that can be passed to $.ajax function
     *
     * @returns {Promise} Promise object represents the response of the api
     */
    get(url, options = {}) {
        return $.ajax(Object.assign({
			url: url,
			method: "GET"
		}, options))
    }
}

export default api;
