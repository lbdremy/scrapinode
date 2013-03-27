/**
 * Expose `Scraper`
 */

module.exports = Scraper;

/**
 * `Scraper` class
 *
 * @param {String} url -
 * @param {Object} window -
 * @param {Router} router -
 * @constructor
 * @api private
 */

function Scraper(url,window,router){
	this.url = url;
	this.window = window;
	this.router = router;
}

/**
 * Get the given `content` from the `this.router`
 *
 * @param {String} content -
 * @param {Number} [index] -
 * @return {String|Number|Object|Boolean|null|undefined}
 * @api private
 */

Scraper.prototype.get = function(content,index) {
	if(!index) index = 0;
	var result = this.router.dispatch(this.url,content,index);
	var trouvaille = result.operation(this.window);
	if(trouvaille === null) return this.get(content,result.index + 1);
	return trouvaille;
};