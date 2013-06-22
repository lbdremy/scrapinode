/**
 * Use jsdom and zepto
 */

var scrapinode = require('./../');

scrapinode.use(/http:\/\/society6.com/,'title',function(window){
	var $ = window.$;
	var title = $('h1[itemprop="name"]').text();
	return title;
});

var options = {
	url : 'http://society6.com/product/Sounds-Good-Dude_T-shirt',
	engine : 'jsdom+zepto'
};

scrapinode.createScraper(options,function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   console.log(title); // "Sound Good dude"
});