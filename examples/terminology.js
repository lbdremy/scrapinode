/**
 * If you wonder what I mean by "path", "content", "operation" and "route"
 * 	this is your answer
 */

var scrapinode = require('./..');

var path = /http:\/\/society6.com/;
var content = 'title';
// route is association of a "path" and a "content"
// each route has its "operation" associated
var operation = function(window){
	var $ = window.$;
	var title = $('h1[itemprop="name"]').text();
	return title;
};

scrapinode.use(path,content,operation);

scrapinode.createScraper('http://society6.com/product/Sounds-Good-Dude_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   console.log(title); // "Sound Good dude"
});