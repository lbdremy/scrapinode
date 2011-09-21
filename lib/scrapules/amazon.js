// Expose defaults Extractors
module.exports = exports = [
   {
      route : 'description',
      operation : scrapDescription
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

// Scrap Amazon 12/08/2011
function scrapDescription($,url){
   var descriptions = [];
   $('.productDescriptionWrapper').each(function(){
         var description = inline($(this).text()).trim();
         if(description) descriptions.push(description);
   });
   return descriptions;
   
}
