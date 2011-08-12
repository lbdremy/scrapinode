var scrapAmount = function($,url){

}

var scrapCurrency = function($,url){

}

var scrapPrice = function($,url){
   var currency = [ '$', '£' , '€' , 'dollar' , 'dollars' , 'pound' ,'pounds' , 'euro' ,'euros' ];
   var price;
   var amount;
   var currency;
   /*
   var score;
   var boost = {
      color : 10,
      size : 2,
      weight : 10,
      tagB : 10,
   };
   */
   var regex = new RegExp('(' + currency.join('|') + ')[0-9-\.]{1,}(' + currency.join('|') + ')','i');
   $('b,div,p,span').each(function(){
      var text = $(this).text().trim();
      if(text.length < 9){
         var match = regex.exec(text);
         /*
         var currentScore = 0;
         var color = $(this).css('color');
         console.log('COLOR:'+color);
         if( color !== '#000' || color !== 'rgb(0, 0, 0)' || color !== '#000000' || color !== 'black'){
            currentScore += boost['color'];
         }
         */
         if(match){
            console.log(match);
         }  
      }
   });
}


// Expose my price scrapnets
exports.scrapnets = [  { 
      name : 'amount' , 
      scrap : scrapAmount 
   } ,
   {
      name : 'currency' ,
      scrap : scrapCurrency 
   } ,
   {
      name : 'price' ,
      scrap : scrapPrice
   }
];
      
