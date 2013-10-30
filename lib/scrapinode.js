/*!
 * scrapinode
 * Copyright(c) 2013 Rémy Loubradou
 * Author Rémy Loubradou <remyloubradou@gmail.com>
 * MIT Licensed
 */

/**
 * Modules dependencies
 */

var browser = require('./browser'),
  Router = require('./router'),
  Route = require('./route'),
  Scraper = require('./scraper'),
  defaults = require('./defaults/');

/**
 * Expose an instance of `Scrapinode`
 *  as a convenience mostly
 */

module.exports = exports = new Scrapinode();

/**
 * Create an instance of `Scrapinode`
 *
 * @return {Scrapinode} a new instance of `Scrapinode`
 * @api public
 */

exports.createInstance = function(engine){
  return new Scrapinode(engine);
};

/**
 * `Scrapinode` class
 *
 * @constructor
 * @api private
 */

function Scrapinode(engine){
  this.engine = engine || 'jsdom';
  this.router = new Router();
}

/**
 * Create a scraper for the given `url` with the given `engine`
 *
 * @param {String|Object} options - url of the page or a set of options in this case options.url is mandatory
 * @param {String} options.url - url of the page
 * @param {String} [options.engine=this.engine] - name of the engine (jsdom or cheerio)
 * @param {String} [options.html=undefined] - HTML content
 * @param {Number} [options.timeout=5000] -  number of milliseconds after which the timeout is reached
 * @param {Number} [options.retries=3] - maximum number of times the request is resent
 * @param {Number} [options.redirects=5] - maximum number of redirections followed
 * @param {Object} [options.headers] - HTTP headers used by the request
 * @param {Function} callback - call when the scraper is ready for work
 * @param {Error} callback().err -
 * @param {Scraper} callback().scraper -
 *
 * @api public
 */

Scrapinode.prototype.createScraper = function (options,callback){
  var self = this;
  if(typeof(options) === 'string'){
    var url = options;
    options = {
      url : url,
      engine : this.engine
    };
  }

  if(!options.engine) options.engine = this.engine;
  if(!options.timeout) options.timeout = 5000;
  if(!options.retries) options.retries = 3;
  if(!options.redirects) options.redirects = 5;
  if(!options.headers) options.headers = {};
  if(!options.headers['user-agent']) options.headers['user-agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1';
  if(!options.headers['accept']) options.headers['accept'] = 'text/html, application/xhtml+xml, application/xml; q=0.9';
  if(!options.headers['accept-charset']) options.headers['accept-charset'] = 'utf-8; q=1.0, ISO-8859-1; q=0.7, *; q=0.3';
  if(!options.headers['accept-encoding']) options.headers['accept-encoding'] = 'gzip, deflate';

  browser.load(options,function(err,window){
    if(err) return callback(err);
    var scraper = new Scraper(options.url,window,self.router);
    callback(err,scraper);
  });
};

/**
 * Add the given `operation` in the router for the given `path` and `content`
 *
 * @param {String|RegExp} path -
 * @param {String|RegExp} content -
 * @param {Function} operation - function called when the path and the content match
 *
 * @return {Scrapinode} itself, allow to chain methods call
 * @api public
 */

Scrapinode.prototype.use = function(path,content,operation){
  this.router.addRoute(new Route(path,content,operation));
  return this;
};

/**
 * Add all given `routes` caracterized by a `path`, a `content` and an `operation` in the `router`
 *
 * @param {Array} routes -
 * @param {String|RegExp} routes[].path -
 * @param {String|RegExp} routes[].content -
 * @param {Function} routes[].operation -
 *
 * @return {Scrapinode} itself, allow to chain methods call
 * @api public
 */

Scrapinode.prototype.useAll = function(routes){
  var self = this;
  routes.forEach(function(route){
    self.router.addRoute(new Route(route.path,route.content,route.operation));
  });
  return self;
};


/**
 * Remove all the routes available in the router
 *
 * @return {Scrapinode} itself, allow to chain methods call
 * @api public
 */

Scrapinode.prototype.clearRouter = function(){
  this.router.routes = [];
  return this;
};

/**
 * Expose default routes for the contents "title", "descriptions", "videos", "images"
 *
 * @return {Array} routes
 * @api public
 */

Scrapinode.prototype.defaults = function(){
  return defaults;
};