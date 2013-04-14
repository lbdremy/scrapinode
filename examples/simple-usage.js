/**
 * Simple usage
 *
 * Scrap and get the title of the page using the default operators.
 */

var scrapinode = require('./../');

scrapinode.useAll(scrapinode.defaults());

scrapinode.createScraper('http://society6.com/product/Sounds-Good-Dude_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   console.log(title); // "Sound Good dude"
});