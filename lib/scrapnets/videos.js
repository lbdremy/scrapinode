var scrapVideo = function($,url){
   var thumbs = [];
   $('video').each(function(){
      var html = $(this).clone().wrap('<div></div>').parent().html();
      thumbs.push(html);
   });
   
   $('embed').each(function(){
      var html = $(this).clone().wrap('<div></div>').parent().html();
      thumbs.push(html);
   });
   
   return thumbs;
}


// Expose my video scrapnets
exports.scrapnets = { name : 'videos' , scrap : scrapVideo };
