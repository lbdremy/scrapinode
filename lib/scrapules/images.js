// Dependencies
var titleScrapnet = require('./title').scrapule;
var urltools = require('./../util/urltools');

// Regex url

var filterExtension = function(src){
   var extensions = {
      png : true,
      jpeg : true,
      jpg : true,
      webp : true
   };
   var accepted = false;
   var currentExtension = urltools.extension(src);
   if(extensions[currentExtension]){
      accepted = true;
   }
   return accepted; 
}

var scrapImage = function($,url){
   var thumbs = [];
   var title = titleScrapnet.scrap($,url);
   var addToThumbs = function(image){
      var src = $(image).attr('src');
      if(src && filterExtension(src) ){
         src = urltools.toURL(src,url);
         thumbs.push(src);
      }    
   }
   $('img').each(function(){
      var alt = $(this).attr('alt');
      if( alt === title){
         addToThumbs(this);
      }
   });
   if(thumbs.length < 1){
      $('img[id*="product"]').each(function(){
          addToThumbs(this);
      });
      
      $('img[class*="product"]').each(function(){
          addToThumbs(this);
      });
   }
   if(thumbs.length < 2){
      $('img').each(function(){
          addToThumbs(this);
      });
   }
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
