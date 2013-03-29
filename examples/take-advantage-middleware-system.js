/**
 * Take advantage of the middleware system to always get content on a page
 *  The first route/operation used in the stack (router) should be specific
 *  and the others less and less specific, more generic.
 */

var scrapinode = require('./../');

scrapinode.use(/http:\/\/society6\.com/,'title',function(window){
	var $ = window.$;
   // this selector is really appropriate for product pages not for the index page
	var title = $('h1[itemprop="name"]').text();
   // if title is falsy, the operation will return "null",
   // which means that the next matching route will be used
   // and so its associated operation will be called with the same "window"
   // this logic goes on and on until an operation returns something else than "null"
   console.log('see the title here is empty: "' + title + '"');
   if(!title) return null;
	return title;
});

scrapinode.use('*','title',function(window){
	var $ = window.$;
   var title = $('title').text();
   return title;
});

scrapinode.createScraper('http://society6.com',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   console.log(title); // "Society6 | Affordable Art Prints, iPhone Cases and T-shirts"
});