// Dependencies
var urltools = require('./../util/urltools');


// Expose Scraper

module.exports = exports = Scraper;

// Scraper contructor

function Scraper(url,$){
    this.url = url;
    this.$ = $;
    this.webname = urltools.webname(url);
}


// Prototype

Scraper.prototype.setRouter = function(router){
    this.router = router;
}

/**
 * Get a type of content from the page just downloaded that can be title, images, videos, description by default can add more if you add scrapule to scrapinode
 *
 */
Scraper.prototype.get = function(content){
    var route = this.webname + '#' + content;
    var extractor = this.router.resolve(route);
    var result;
    if(extractor){
      result = extractor.operation(this.$,this.url);
    }
    return result;
}
