/**
 * Expose `Route`
 */

module.exports = Route;

/**
 * `Route` class
 * @constructor
 *
 * @param {String|RegExp} path -
 * @param {String|RegExp} content -
 * @param {Function} operation -
 *
 * @api private
 */

function Route(path,content,operation){
	if(typeof(path) === 'string'){
		if(path === '*') path = '.*';
		path = new RegExp(path);
	}
	if(typeof(content) === 'string'){
		if(content === '*') content = '.*';
		content = new RegExp(content);
	}
	this.path = path;
	this.content = content;
	this.operation = operation;
}

/**
 * Attempt to match the given `url` with `this.path` and `content` with `this.content`
 *
 * @param {String} url -
 * @param {String} content -
 *
 * @return {Boolean}
 * @api private
 */

Route.prototype.match = function(url,content){
	return this.path.test(url) && this.content.test(content);
}