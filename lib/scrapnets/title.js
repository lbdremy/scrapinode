// Dependencies
var website = require('./../util/website');

var inline = function(text){
   var explode = text.split('\n').join('').split(' ');
   var size = explode.length;
   for(var i=0; i < size ; i++){
      if(!explode[i]){
         explode.splice(i,1);
         i--;
         size--;
      }
   }
   return explode.join(' ').trim();
}
   
var scrapTitle = function($,uri){
   // IMPORTANT tags/attributes
   var tag =  $('title');
   var meta = $('meta[title]');
   var h = $('h1');
   var best = '';
   // Check
   tag = tag.text().trim() || '';
   meta = meta.attr('title') || '';
   h = h.text().trim() || '';
   // Regex
   var nameWebsite = website.name(uri);
   var regex = new RegExp(nameWebsite,'i');
   var matchTag = regex.test(tag);
   var matchMeta = regex.test(meta);
   var matchH = regex.test(h);
   /**
    * Idea: Try to get a text representing the title of the page that does not contain the name of the website.
    */
   if( (!matchH || !best) && !!h) best = h; 
   if( (!matchMeta || !best) && !!meta) best = meta;
   if( (!matchTag || !best) && !!tag) best = tag;
   return inline(best);
}



// Expose my title 
exports.scrapnets =  { name : 'title' , scrap : scrapTitle };
