// Modules dependencies

var jsdom = require('jsdom'),
    request = require('request'),
    fs     = require('fs'),
    Scraper = require('./scraper');
    
// JQuery dependencies

var jqueryExt = fs.readFileSync(__dirname + '/../deps/jquery-regex-selector.js').toString();
var jquery = fs.readFileSync(__dirname + '/../deps/jquery-1.6.2.min.js').toString() + jqueryExt;

// scrapules dependencies

var pathScrapules = './scrapules/';

// Load the page and put Jquery in the page

var load = function(url,callback){
    var self = this;
    var atResponse = function(err,res,body){
        if(err || res.statusCode !== 200){
            callback(err,null);
            return;
        }
        jsdom.env({
            html: url,
            src : [jquery],
            done : function(err,window){
                callback(err,window.$);
            }
        });
    };
    // hack to appear like a user-browser
    var headers = {
         "User-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1"
    }
    request({ 
      uri : url ,
      headers : headers 
    }, atResponse);
}

// Module Scrapinode

var scrapinode = function(){
   return scrapinode.init();
};

// Expose Scrapinode module

module.exports = exports = scrapinode;

// Expose init similar to call scrapinode when required, allow to extend the Scraper prototype with scrapules currently available

scrapinode.init = function(){
   scrapinode.use(pathScrapules);
   return scrapinode;
}

// Expose factory for Scraper
scrapinode.createScraper = function (url,callback){
    load(url,function(err,$){
      if(!err){
         var scraper = new Scraper(url,$);
      }
      callback(err,scraper);  
    });
}

// Expose use and set functions to extend the prototype of Scraper

scrapinode.use = function(mod){
    if(typeof(mod) === 'string'){
         var path = mod[mod.length -1] === '/' ? mod : mod + '/';
         var explode = path.split('.');
         path = path[0] === '.' ? __dirname + explode.slice(1,explode.length).join('.') : path;
         try{
            var files = fs.readdirSync(path);
         }catch(err){
            throw new Error('Directory probably missing. \n Stack:' + err);
         }
         files.forEach(function(file){
            var scrapule = require(path + file);
            scrapinode.use(scrapule);
         });
    }else{
      var scrapule = mod.scrapule;
      if(scrapule && scrapule.length){
        for(var i = 0; i < scrapule.length ; i++){
            scrapinode.set(scrapule[i]['extractor'], scrapule[i]['scrap']);
        }
      }else if(scrapule){
         scrapinode.set(scrapule['extractor'], scrapule['scrap']);
      }
    }
    // Allow to chain function expose by scrapinode
    return scrapinode;
}

scrapinode.set = function(extractor,scrap){
    Scraper.prototype[extractor] = scrap;
    // Allow to chain function expose by scrapinode
    return scrapinode;
}
