/**
 * Module dependencies
 */

var ScrapinodeError = require('./error/scrapinode-error');

/**
 * Expose `Router`
 */

module.exports = Router;

/**
 * `Router` class
 * @contructor
 *
 * @api private
 */

function Router(){
	this.routes = [];
}

/**
 * Add the given `route` into `this.routes`
 *
 * @param {Route} route -
 *
 * @return {this}
 * @api private
 */

Router.prototype.addRoute = function(route){
	this.routes.push(route);
	return this;
};

/**
 * Find the relevant operation for the given `url` and `content` expected
 *
 * @param {String} url -
 * @param {String} content -
 * @param {Number} index -
 *
 * @return {Object} -
 * @api private
 */

Router.prototype.dispatch = function(url,content,index){
	for(var i = index; i < this.routes.length; i++){
		var route = this.routes[i];
		if(route.match(url,content)){
			var result = {
				index : i,
				operation : route.operation
			};
			return result;
		}
	}

	var message = 'Dead end, no content found and no more route.';
	var infos = {
		url : url,
		content : content,
		routes : this.routes
	};
	throw new ScrapinodeError(message + 'Informations: ' + JSON.stringify(infos));
};