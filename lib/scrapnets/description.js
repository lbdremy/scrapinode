// Dependencies
var titleScrapnet = require('./title').scrapnets;

var scrapDescription = function($,url){
   var descriptions = [];
   var description ='';
   var highScore = 0;
   var title = titleScrapnet.scrap($,url);
   var boost = {
      length : 2,
      titleIn : 5,
      descriptionWord : 5,
   };
   var regexTitle = new RegExp(title,'i');
   var regexDesc = new RegExp('description','i');
   
   var test = function(text){
      var score= 0;
      score= text.length * boost['length'];
      var matchTitle = regexTitle.test(text);
      score= matchTitle ? Math.pow(score,boost['titleIn']) : score;
      var matchDesc = regexDesc.test(text);
      score= matchDesc ? Math.pow(score,boost['descriptionWord']) : score;
      return {
         score: score, 
         text : text
      };
   }

   $('div').each(function(index,div){
      var text = $(div).text().trim();
      descriptions.push(test(text));
   });
   $('p').each(function(index,p){
      var text = $(p).text().trim();
      descriptions.push(test(text));
   });
   for(var i = 0; i < descriptions.length ; i++){
      if(descriptions[i].score > highScore){
         description = descriptions[i].text
      }
   }
   return description;
};


// Expose my description scrapper
exports.scrapnets = { name : 'description' , scrap : scrapDescription };
