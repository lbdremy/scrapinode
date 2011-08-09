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

var imageScraper = require('./scrapnets/image.js');   
var titleScraper = require('./scrapnets/title.js');

// Factory Scrapinode     
exports.create = function (url){
    var scrapinode = new Scrapinode(url);
    scrapinode
        .use(imageScraper)
        .use(titleScraper);
    return scrapinode;
}

// Scrapinode contructor

var Scrapinode = function(url){
    this.url = url;
    this.$;
    this.load(url);
}
// Inherit from EventEmitter

util.inherits(Scrapinode,EventEmitter);

// Prototype
Scrapinode.prototype.set = function(label, action){
    Scrapinode.prototype[label] = action;
}

// Always call this function when the scrapinode is 'ready'
Scrapinode.prototype.get = function(label){
    return this[label](this.$,this.url);
}

Scrapinode.prototype.use = function(mod){
    var self = this;
    var scrapinets = mod.scrapinets || null;
    if(scrapinets){
        for(var i = 0; i < scrapinets.length ; i++){
            this.set(scrapinets[i]['name'], scrapinets[i]['action']);
        }
    }
    return self;
}

Scrapinode.prototype.load = function(url){
    var self = this;
    var atResponse = function(err,res,body){
        if(err && response.status.statusCode !== 200){
            self.emit('error',err);
        }
        jsdom.env({
            html: body,
            src : [jquery],
            done : function(err,window){
                if(err) self.emit('error',err);
                self.$ = window.$;
                self.emit('ready');
            }
        });
    }
    var headers = {
         "User-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1"
    }
    request({ 
      uri : url ,
      headers : headers 
    }, atResponse);
}
