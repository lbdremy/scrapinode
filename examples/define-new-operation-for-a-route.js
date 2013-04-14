/**
 * Define a new operation for a route
 *
 * A route is caracterized by a content and path (there are regex or string),
 * also an operation is attached to each route.
 */

var scrapinode = require('./../');

scrapinode.use(/http:\/\/society6\.com/,'title',function(window){
	var $ = window.$;
	var title = $('h1[itemprop="name"]').text();
	return title;
});

scrapinode.use(/http:\/\/society6\.com/,'artist',function(window){
	var $ = window.$;
	var artist = $('.details>h3>a').text();
	return artist;
});

scrapinode.createScraper('http://society6.com/product/Sounds-Good-Dude_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   var artist = scraper.get('artist');
   console.log(title,artist); // "Sounds Good Dude Chase Kunz"
});

scrapinode.createScraper('http://society6.com/product/the-lord-of-fashion_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   var artist = scraper.get('artist');
   console.log(title,artist); // "the lord of fashion H A P P Y J O Y"
});
