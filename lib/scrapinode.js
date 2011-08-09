// Dependencies

var jsdom = require('jsdom'),
    http = require('http'),
    request = require('request'),
    fs     = require('fs'),
    util   = require('util'),
    EventEmitter = require('events').EventEmitter;
    
// JQuery dependency

var jquery = fs.readFileSync(__dirname + '/../deps/jquery-1.6.2.min.js').toString();

// Scrapnets dependencies

var pathScrapnets = './scrapnets/';

// Load the page and put Jquery in the page

var load = function(scraper,callback){
    var self = this;
    var atResponse = function(err,res,body){
        if(err && res.status.statusCode !== 200){
            console.log(err);
        }
        jsdom.env({
            html: body,
            src : [jquery],
            done : function(err,window){
                if(err) console.log(err);
                scraper.$ = window.$;
                callback(scraper);
            }
        });
    };
    var headers = {
         "User-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1"
    }
    request({ 
      uri : scraper.url ,
      headers : headers 
    }, atResponse);
}

// Factory Scraper     

exports.createScraper = function (url,callback){
    var scraper = new Scraper(url);
    scraper.use(pathScrapnets);
    load(scraper,callback);
}

// Scraper contructor

var Scraper = function(url){
    this.url = url;
    this.$;
}

// Prototype
Scraper.prototype.set = function(label, scrap){
    Scraper.prototype[label] = scrap;
}


Scraper.prototype.get = function(label){
    return this[label](this.$,this.url);
}

Scraper.prototype.use = function(mod){
    var self = this;
    if(typeof(mod) === 'string'){
      try{
         var path = mod[mod.length -1] === '/' ? mod : mod + '/';
         var explode = path.split('.');
         path = path[0] === '.' ? __dirname + explode.slice(1,explode.length).join('.') : path;
         var files = fs.readdirSync(path);
         files.forEach(function(file){
            var scrapnet = require(path + file);
            self.use(scrapnet);
         });
      }catch(err){
         console.log(err);
      }
    }else{
      var scrapnets = mod.scrapnets;
      if(scrapnets && scrapnets.length){
        for(var i = 0; i < scrapnets.length ; i++){
            this.set(scrapnets[i]['name'], scrapnets[i]['scrap']);
        }
      }else if(scrapnets){
         this.set(scrapnets['name'], scrapnets['scrap']);
      }
    }
    return self;
}

