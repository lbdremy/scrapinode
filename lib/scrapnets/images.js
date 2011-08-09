var scrapImage = function($,url){
   var thumbs = [];
   $('img').each(function(index,img){
      var image = $(img).attr('src');
      thumbs.push(image);
   });
   return thumbs;
}

// Expose my image scraper
exports.scrapnets = [ { name :'images' , scrap : scrapImage }];
