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

module.exports = new Scrapinode();

/**
 * Create an instance of ̀Scrapinode`
 *
 * @return {Scrapinode}
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
};

/**
 * Create a scraper for the given `url` with the given `engine`
 *
 * @param {String|Object} options - url of the page or a set of options in this case options.url is mandatory
 * @param {String} options.url - url of the page
 * @param {String} [engine='this.engine'] - name of the engine (jsdom or cheerio)
 * @param {String} [html=undefined] - HTML content
 * @param {Function} callback -
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
 * @param {Function} operation -
 *
 * @return {this}
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
 * @return {this}
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
 * @return
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