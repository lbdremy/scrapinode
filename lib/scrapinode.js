/**
 * Modules dependencies
 */

var browser = require('./browser'),
  Router = require('./router'),
  Route = require('./route'),
  Scraper = require('./scraper'),
  defaults = require('./defaults/');

// Expose scrapinode
var scrapinode = exports;

// Create the main router
var router = new Router();

/**
 * Expose engine used to build the DOM
 *  (available: "jsdom" or "cheerio")
 */

scrapinode.engine = 'jsdom';

/**
 * Create a scraper for the given `url` with the given `engine`
 *
 * @param {String|Object} options - url of the page or a set of options in this case options.url is mandatory
 * @param {Function} callback -
 * @param {Error} callback().err -
 * @param {Scraper} callback().scraper -
 *
 * @api public
 */

scrapinode.createScraper = function (options,callback){
    if(typeof(options) === 'string'){
      var url = options;
      options = {
        url : url,
        engine : scrapinode.engine
      };
    }

    /* TODO re-enable HTML feature
    if(url.match(/^https?:/)){
      options.url = url;
    }else{
      options.html = url;
    }
    */

    browser.load(options,function(err,window){
      if(err) return callback(err);
      var scraper = new Scraper(options.url,window,router);
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

scrapinode.use = function(path,content,operation){
  router.addRoute(new Route(path,content,operation));
  return scrapinode;
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

scrapinode.useAll = function(routes){
  routes.forEach(function(route){
    router.addRoute(new Route(route.path,route.content,route.operation));
  });
  return scrapinode;
};

/**
 * Expose default routes for the contents "title", "descriptions", "videos", "images"
 *
 * @return {Array} routes
 * @api public
 */

scrapinode.defaults = function(){
  return defaults;
};