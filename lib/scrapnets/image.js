var scrapImage = function($,url){
   var image = $('image').attr('src') || null;
   if(image) return image;
   return '';
}

// Expose my image scraper
exports.scrapinets = [ { name :'image' , action : scrapImage }];
