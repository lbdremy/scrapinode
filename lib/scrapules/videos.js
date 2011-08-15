var scrapVideo = function($,url){
   var thumbs = [];
   $('video, embed').each(function(){
      var html = $(this).clone().wrap('<div></div>').parent().html();
      thumbs.push(html);
   });
   
   return thumbs;
}


// Expose my video scrapules
exports.scrapule = { extractor : 'videos' , scrap : scrapVideo };
