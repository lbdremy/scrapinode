// Dependencies
var urltools = require('./../util/urltools');

// Expose defaults Extractors
module.exports = exports = [
   {
      route : 'default#description',
      operation : scrapDescription
   },
   {
      route : 'title',
      operation : scrapTitle
   },
   {
      route : 'default#images',
      operation : scrapImage
   },
   {
      route : 'default#videos',
      operation : scrapVideo
   }
];
 
// inline the text without /n and ' ' (space)
function inline(text){
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

/**
 * Default description Scraper
 *
 */
 
// Scrap Everywhere
function scrapDescription($,url){
   var descriptions = [];
   
   $('meta').each(function(){
      if($(this).attr('name').toLowerCase() === 'description'){
         var description = inline($(this).attr('content')).trim();
         if(description) descriptions.push(description);
      }
   });
   $('div,p').each(function(){
      if( ($(this).attr('class').toLowerCase() === 'productdesc') || ($(this).attr('id').toLowerCase() === 'productdesc')){
         var description = inline($(this).text()).trim();
         if(description) descriptions.push(description);
      }
   });
   
   if(descriptions.length < 2){
      $('div:regex(id,productdesc),div:regex(class,productdesc)').each(function(){
         var description = inline($(this).text()).trim();
         if(description) descriptions.push(description);
      });
   }
   return descriptions;
};

/**
 * Default Image Scraper
 *
 */
 
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

function scrapImage($,url){
   var thumbs = [];
   var title = scrapTitle($,url);
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


/**
 * Default Title Scraper
 *
 */

function scrapTitle($,url){
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
   var nameWebsite = urltools.webname(url);
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

/**
 * Default Videos Scraper
 *
 */
 
function scrapVideo($,url){
   var thumbs = [];
   $('video, embed').each(function(){
      var html = $(this).clone().wrap('<div></div>').parent().html();
      thumbs.push(html);
   });

   return thumbs;
}
