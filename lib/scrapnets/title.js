var scrapTitle = function($,url){
   return $('title').text();
}

// Expose my title scrapper
exports.scrapinets = [ { name : 'title' , action : scrapTitle }];
