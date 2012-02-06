// Modules dependencies

var fs = require('fs'),
    browser = require('./browser/browser-load'),
    Scraper = require('./actors/scraper'),
    Router = require('./actors/router'),
    Extractor = require('./actors/extractor');
    Scrapule = require('./actors/scrapule');


// scrapules dependencies

var pathScrapules = __dirname + '/scrapules/';

// Module Scrapinode

var scrapinode = function(){
   return scrapinode.init();
};

// Expose Scrapinode module

module.exports = exports = scrapinode;

// Create a main Router

var router = new Router();

// Expose init similar to call scrapinode when required
scrapinode.init = function(){
   scrapinode.use(pathScrapules);
   return scrapinode;
}

// Expose engine (available: jsdom[+jquery] or cheerio)
scrapinode.engine = 'jsdom'; 

// Expose option imageToHTML.
// If the link requested responds with the header content-type=image/*
// a piece of html is created with an image tag containing the link in the src attribute.
scrapinode.imageToHTML = true;

// Expose factory for Scraper
scrapinode.createScraper = function (url,engine,callback){
    if(typeof(engine) === 'function'){
      callback = engine;
      engine = null;
    }
    var options = {
      url : url,
      engine : engine || scrapinode.engine,
      imageToHTML : scrapinode.imageToHTML
    }
    browser.load(options,function(err,$){
      if(!err){
         var scraper = new Scraper(url,$);
         scraper.setRouter(router);
      }
      callback(err,scraper);  
    });
}

// Expose use

/**
 * Add one extractor OR one scrapule to the router responsible for load lazily or eagerly extractors.
 *
 * @param {String} route - this string can be a route with this specific pattern `site#content-type` or a path to a directory 
 * @param {Function [optional]} operation - this will be executed if the route given in first parameter match 
 *  with the current url scraped by the Scraper
 * //TODO @param {Boolean} eager - if true the extractor will be required now, if not it will be required when it is needed. Default : false
 *
 * @return {Object} - allow chainable call
 */
scrapinode.use = function(route,operation){
    if(typeof(operation) === 'undefined' || typeof(operation) === 'boolean'){
      var path = route;
      //eager = eager || operation;
    }
    
    // Lookup on the path
    if(path){
         try{
            var files = fs.readdirSync(path);
            files.forEach(function(filename){
               var filepath = path + filename.replace('.js','');
               var route = filename.replace('.js','');;
               router.addScrapule(new Scrapule(filepath,route));
            });
         }catch(err){
            throw new Error('Directory probably missing. \n Stack:' + err);
         }
    }else{
      router.addExtractor(new Extractor(route,operation));
    }
    return scrapinode;
}
