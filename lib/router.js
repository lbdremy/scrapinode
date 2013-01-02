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
}

/**
 * Find the relevant operation for the given `url` and `content` expected
 *
 * @param {String} url -
 * @param {String} content -
 * @param {Number} from -
 *
 * @return {Object} - 
 * @api private
 */

Router.prototype.dispatch = function(url,content,from){
	for(var i = from; i < this.routes.length;i++){
		var route = this.routes[i];
		if(route.match(url,content)){
			return { 
				to : i + 1, 
				operation : route.operation 
			};
		} 
	}
	return { 
		to : this.routes.length,
		operation : function(window,next){
			next(new ScrapinodeError('No operations found for url: ' +  url + ' and content: ' + content)); 
		}
	};
}