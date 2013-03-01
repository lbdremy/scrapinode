/**
 * Module dependencies
 */

var utils = require('./../utils/');

/**
 * Expose
 */

module.exports = exports = [
   {
      path : '*',
      content : 'descriptions',
      operation : scrapDescription
   },
   {
      path : '*',
      content : 'title',
      operation : scrapTitle
   },
   {
      path : '*',
      content : 'images',
      operation : scrapImage
   },
   {
      path : '*',
      content : 'videos',
      operation : scrapVideo
   }
];

function scrapDescription(window){
   var $ = window.$;
   var url = window.url;
   var descriptions = [];

   // Open Graph protocol by Facebook <meta property="og:description" content="(*)"/>
   $('meta[property="og:description"]').each(function(){
      var content = $(this).attr('content');
      if(content) descriptions.push(content);
   });

   // Schema.org : <* itemprop="description">(*)</*>
   $('[itemprop="description"]').each(function(){
      var text = $(this).text();
      if(text) descriptions.push(text);
   });

   // Meta tag description: <meta property="description" content="(*)" />
   $('meta[name="description"]').each(function(){
      var description = utils.inline($(this).attr('content')).trim();
      if(description) descriptions.push(description);
   });

   // Random text in div and p tags. Oriented product informations
   if(descriptions.length === 0){
      $('div,p').each(function(){
         if( ($(this).attr('class') && $(this).attr('class').toLowerCase() === 'productdesc') || ($(this).attr('id') && $(this).attr('id').toLowerCase() === 'productdesc')){
            var description = utils.inline($(this).text()).trim();
            if(description) descriptions.push(description);
         }
      });
   }
   return descriptions;
}

/**
 * Helpers for `scrapImage` function
 */

var ENUM_INVALID_EXTENSIONS = {
   gif : false
};

function isValidExtension(src){
   var extension = src.split('.').pop();
   var isValid = ENUM_INVALID_EXTENSIONS[extension] === false ? false : true;
   return isValid;
}

/**
 *
 */

function scrapImage(window){
   var $ = window.$;
   var url = window.url;

   var thumbs = [];
   var thumbsRejected = [];
   var title = scrapTitle(window);
   var addToThumbs = function(image,beginning){
      var src = $(image).attr('src');
      if(src && isValidExtension(src) ){
         src = utils.toURL(src,url);
         if(beginning){
            thumbs.unshift(src);
         }else{
            thumbs.push(src);
         }
      }else if(src){
         thumbsRejected.push(src);
      }
   };
   // Open Graph protocol by Facebook: <meta property="og:image" content="(*)"/>
   $('meta[property="og:image"]').each(function(){
      var content = $(this).attr('content');
      if(content) thumbs.push(utils.toURL(content));
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
         if($(this).attr('itemprop') === 'image') return;
         var alt = $(this).attr('alt');
         // Leave this test alone
         // the selector 'img[alt="title"]' will not work if the title is like LG 42PT35342" PLASMA TV. Escaping issues.
         // Image where the title of the page is equal to the content of the alt attribute of the image tag.
         if(alt === title){
            addToThumbs(this,true);
         }else{
            addToThumbs(this);
         }
      });
   }

   if(thumbs.length === 0){
      thumbs = thumbsRejected;
   }

   return thumbs;
}


/**
 *
 */

function scrapTitle(window){
   var $ = window.$;
   var url = window.location.href;

   // Tags or attributes whom can contain a nice title for the page
   var titleTag =  $('title').text().trim();
   var metaTitleTag = $('meta[name="title"]').attr('content');
   var openGraphTitle = $('meta[property="og:title"]').attr('content');
   var h1Tag = $('h1:first').text().trim();
   var itempropNameTag = $('[itemprop="name"]').text().trim();
   var titles = [titleTag, metaTitleTag, openGraphTitle, h1Tag, itempropNameTag];

   // Regex of the web site name
   var nameWebsite = utils.getWebsiteName(url);
   var regex = new RegExp(nameWebsite,'i');
   // Sort to find the best title
   var titlesNotEmpty = titles.filter(function(value){
      return !!value;
   });
   var titlesBest = titlesNotEmpty.filter(function(value){
      return !regex.test(value);
   });
   var bestTitle = (titlesBest && titlesBest[0]) || (titlesNotEmpty && titlesNotEmpty[0]) || '';
   return utils.inline(bestTitle);
}

/**
 *
 */

function scrapVideo(window){
   var $ = window.$;
   var url = window.location.href;
   var thumbs = [];

   // Open Graph protocol by Facebook: <meta property="og:video" content="(*)"/>
   $('meta').each(function(){
      var property = $(this).attr('property');
      var content = $(this).attr('content');
      if(property === 'og:video' && content){
         thumbs.push(utils.toURL(content));
      }
   });

   $('video, embed').each(function(){
      var src = $(this).attr('src');
      if(src) thumbs.push(utils.toURL(src,url));
   });

   return thumbs;
}
