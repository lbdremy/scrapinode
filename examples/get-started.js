/**
 * Module dependencies
 */

var scrapinode = require('./../');

// Define an operation for a specific route and content
scrapinode.use('society6.com','title',function(window,next){
  var $ = window.$;
  var url = window.url; // maybe you want to check for some reasons 
  var title = $('h1[itemprop="name"]').text();
  if(!title) return next();
  return title;
});

// Use default operations for content like "title", "descriptions", "images", "videos"
scrapinode.useAll(scrapinode.defaults());

scrapinode.createScraper('http://society6.com/product/Sounds-Good-Dude_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   console.log(title); // "Sound Good dude"
});