// Dependencies

var jsdom = require('jsdom'),
    request = require('request'),
    fs     = require('fs'),
    website = require('./util/website');
    
// JQuery dependency

var jqueryExt = fs.readFileSync(__dirname + '/../deps/jquery-regex-selector.js').toString();
var jquery = fs.readFileSync(__dirname + '/../deps/jquery-1.6.2.min.js').toString() + jqueryExt;

// Scrapnets dependencies

var pathScrapnets = './scrapnets/';

// Load the page and put Jquery in the page

var load = function(url,callback){
    var self = this;
    var atResponse = function(err,res,body){
        if(err && res.statusCode !== 200){
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
    var headers = {
         "User-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1"
    }
    request({ 
      uri : url ,
      headers : headers 
    }, atResponse);
}

// Factory Scraper     

exports.createScraper = function (url,callback){
    load(url,function(err,$){
      if(!err){
         var scraper = new Scraper(url,$);
         scraper.use(pathScrapnets);
      }
      callback(err,scraper);  
    });
}

// Scraper contructor

var Scraper = function(url,$){
    this.url = url;
    this.$ = $;
    this.site = website.name(url);
}

// Prototype
Scraper.prototype.set = function(label, scrap){
    Scraper.prototype[label] = scrap;
}


Scraper.prototype.get = function(label){
    var labelSite = label + '-' + this.site;
    if(this[labelSite]) label = labelSite;
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
         console.log('ERR:'+err);
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

