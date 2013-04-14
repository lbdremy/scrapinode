/**
 * Get the title and the description
 */

var scrapinode = require('./../');

scrapinode.useAll(scrapinode.defaults());

scrapinode.createScraper('http://society6.com/product/Sounds-Good-Dude_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   var description = scraper.get('descriptions')[0];
   console.log(title,description);
   // "Sound Good dude American Apparel T-shirts are made with 100% fine jersey cotton combed for softness and comfort.
   // (Athletic Grey and Athletic Blue contain 50% polyester / 25% cotton / 25% rayon)"
});