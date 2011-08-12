// Dependencies
var titleScrapnet = require('./title').scrapnets;

//TODO removed gif images

var scrapImage = function($,url){
   var thumbs = [];
   var title = titleScrapnet.scrap($,url);
   $('img').each(function(){
      var alt = $(this).attr('alt');
      if( alt === title){
         var image = $(this).attr('src');
         thumbs.push(image);
      }
   });
   if(thumbs.length < 1){
      $('img[id*="product"]').each(function(){
         var image = $(this).attr('src');
         thumbs.push(image);
      });
      
      $('img[class*="product"]').each(function(){
         var image = $(this).attr('src');
         thumbs.push(image);
      });
   }
   if(thumbs.length < 2){
      $('img').each(function(){
         var image = $(this).attr('src');
         thumbs.push(image);
      });
   }
   return thumbs;
}

var scrapAmazon = function($,url){
   return scrapImage($,url);
}

// Expose my image scraper
exports.scrapnets = [ 
   { name :'images' , scrap : scrapImage },
   { name :'images-amazon' , scrap : scrapAmazon }   
];
