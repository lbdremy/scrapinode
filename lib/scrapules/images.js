// Dependencies
var titleScrapnet = require('./title').scrapule;
var urltools = require('./../util/urltools');

var filterExtension = function(thumbs){
   var filteredThumbs =  [];
   var extensions = {
      gif : false
   };
   var currentExtension;
   for( var i = 0; i < thumbs.length ; i++){
      currentExtension = urltools.extension(thumbs[i]);
      if(!(extensions[currentExtension] === false)){
         filteredThumbs.push(thumbs[i]);
      }
   }
   return filteredThumbs; 
}

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
   thumbs = filterExtension(thumbs);
   return thumbs;
}

var scrapAmazon = function($,url){
   return scrapImage($,url);
}

// Expose my image scraper
exports.scrapule = [ 
   { extractor :'images' , scrap : scrapImage },
   { extractor :'images-amazon' , scrap : scrapAmazon }   
];
