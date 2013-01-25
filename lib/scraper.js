/**
 * Expose `Scraper`
 */

module.exports = Scraper;

/**
 * `Scraper` class
 * @constructor
 *
 * @api private
 */

function Scraper(url,window,router){
	this.url = url;
	this.window = window;
	this.router = router;
}

/**
 * Get the given `content` from the `router`
 *
 * @param {String} content -
 * @param {Number} [from] -
 *
 * @return {*}
 * @api private
 */

Scraper.prototype.get = function(content,from) {
	var self = this;
	from = from || 0;
	var result = this.router.dispatch(this.url,content,from);
	var trouvaille = result.operation(this.window);
	if(trouvaille === null) return self.get(content,result.to);
	return trouvaille;
};