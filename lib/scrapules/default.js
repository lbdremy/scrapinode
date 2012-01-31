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
   
   // Open Graph protocol by Facebook <meta property="og:description" content="(*)"/>
   $('meta').each(function(){
      var property = $(this).attr('property');
      var content = $(this).attr('content');
      if(property === 'og:description' && content){
         descriptions.push(content);
      }
   });
   
   // Schema.org : <* itemprop="description">(*)</*>
   $('[itemprop="description"]').each(function(){
      var text = $(this).text();
      if(text){
         descriptions.push(content);
      }
   });
   
   // Meta tag description: <meta property="description" content="(*)" />
   $('meta').each(function(){
      if($(this).attr('name') && $(this).attr('name').toLowerCase()=== 'description'){
         var description = inline($(this).attr('content')).trim();
         if(description) descriptions.push(description);
      }
   });
   
   // Random text in div and p tags. Oriented product informations
   if(descriptions.length === 0){
      $('div,p').each(function(){
         if( ($(this).attr('class') && $(this).attr('class').toLowerCase() === 'productdesc') || ($(this).attr('id') && $(this).attr('id').toLowerCase() === 'productdesc')){
            var description = inline($(this).text()).trim();
            if(description) descriptions.push(description);
         }
      });
   }
   return descriptions;
};

/**
 * Default Image Scraper
 *
 */
 
var extensionsImage = {
   gif : false
};
// Permissive extension validator
// means even if the extension is not authorized explicitly the function considers the extension is valid (return true)
function validExtension(src){
   var extension = src.split('.').pop();
      if(extensionsImage[extension] === false){
         return false;
      }
      return true;
} 


function scrapImage($,url){
   var thumbs = [];
   var title = scrapTitle($,url);
   var addToThumbs = function(image,beginning){
      var src = $(image).attr('src');
      if(src && validExtension(src) ){
         src = urltools.toURL(src,url);
         if(beginning){
            thumbs.unshift(src);
         }else{
            thumbs.push(src);
         }
      }    
   }
   // Open Graph protocol by Facebook: <meta property="og:image" content="(*)"/>
   $('meta').each(function(){
      var property = $(this).attr('property');
      var content = $(this).attr('content');
      if(property === 'og:image' && content){
         thumbs.push(urltools.toURL(content));
      }
   });
   
   // Schema.org: <img itemprop="image" src="(*)"/>
   $('img[itemprop="image"]').each(function(){
      addToThumbs(this);
   });
   
   // Oriented product informations
   if(thumbs.length < 1){
      $('img[id*="product"]').each(function(){
          addToThumbs(this);
      });
      
      $('img[class*="product"]').each(function(){
          addToThumbs(this);
      });
   }
   
   // Grab all images
   if(thumbs.length < 10){
      $('img').each(function(){
         var alt = $(this).attr('alt');
         // Leave this test alone 
         // the selector 'img[alt="title"]' will not work if the title is like LG 42PT35342" PLASMA TV. Escaping issues.
         // Image where the title of the page is equal to the content of the alt attribute of the image tag.
         if( alt === title){ 
            addToThumbs(this,true);
         }else{
            addToThumbs(this)
         }
      });
   }
   return thumbs;
}


/**
 * Default Title Scraper
 *
 */

function scrapTitle($,url){
   
   // Tags or attributes whom can contain a nice title for the page
   var titleTag =  $('title').text().trim();
   var metaTitleTag = $('meta[title]').attr('title');
   var h1Tag = $('h1:first').text().trim();
   var itempropNameTag = $('[itemprop="name"]').text().trim();
   var titles = [titleTag, metaTitleTag, h1Tag, itempropNameTag];
   
   // Regex of the web site name
   var nameWebsite = urltools.webname(url);
   var regex = new RegExp(nameWebsite,'i');
   
   // Sort to find the best title
   var titlesNotEmpty = titles.filter(function(value){
      if(value ){
         return true;
      }
      return false;
   });
   var titlesBest = titlesNotEmpty.filter(function(value){
      if(regex.test(value)){
         return false;
      }
      return true;
   });
   var bestTitle = (titlesBest && titlesBest[0]) || (titlesNotEmpty && titlesNotEmpty[0]) || '';
   return inline(bestTitle);
}

/**
 * Default Videos Scraper
 *
 */
 
function scrapVideo($,url){
   var thumbs = [];
   
   // Open Graph protocol by Facebook: <meta property="og:video" content="(*)"/>
   $('meta').each(function(){
      var property = $(this).attr('property');
      var content = $(this).attr('content');
      if(property === 'og:video' && content){
         thumbs.push(content);
      }
   });
   
   $('video, embed').each(function(){
      var html = $(this).clone().wrap('<div></div>').parent().html();
      thumbs.push(html);
   });

   return thumbs;
}
