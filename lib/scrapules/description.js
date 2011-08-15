// inline the text without /n and ' ' (space)
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

// Scrap Everywhere
var scrapDescription = function($,url){
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
      $('div:regex(id,productdescription),div:regex(class,productdescription)').each(function(){
         var description = inline($(this).text()).trim();
         descriptions.push(description);
      });
   }
   if(descriptions.length < 2){
      $('div:regex(id,productdesc),div:regex(class,productdesc)').each(function(){
         var description = inline($(this).text()).trim();
         descriptions.push(description);
      });
   }
   return descriptions;
};

// Scrap Amazon 12/08/2011
var scrapAmazon = function($,url){
   var descriptions = [];
   $('.productDescriptionWrapper').each(function(){
         var description = inline($(this).text()).trim();
         if(description) descriptions.push(description);
   });
   return descriptions;
   
}

// Expose my description scrapper
exports.scrapule = [
   { extractor : 'description' , scrap : scrapDescription } ,
   { extractor : 'description-amazon' , scrap : scrapAmazon }
];
