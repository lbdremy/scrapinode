// Dependencies
var urltools = require('./util/urltools');

// Scraper contructor

var Scraper = function(url,$){
    this.url = url;
    this.$ = $;
    this.webname = urltools.webname(url);
}

// Expose Scraper

exports = module.exports = Scraper;

// Prototype

Scraper.prototype.set = function(label, scrap){
    Scraper.prototype[label] = scrap;
}

Scraper.prototype.get = function(label){
    var labelSite = label + '-' + this.webname;
    if(this[labelSite]) label = labelSite;
    return this[label](this.$,this.url);
}
