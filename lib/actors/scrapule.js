// Module dependencies
var Extractor = require('./extractor');

// Expose Scrapule
module.exports = exports = Scrapule;

// Scrapule Class
function Scrapule(path,site){
   this.path = path;
   this.site = site;   
}


Scrapule.prototype.loadExtractors = function(){
   var scrapuleLoaded = require(this.path);
   var extractors = [];
   if(scrapuleLoaded.length){
      for(var i = 0; i < scrapuleLoaded.length ; i++){
         extractors.push(new Extractor(merge(this.site,scrapuleLoaded[i].route),scrapuleLoaded[i].operation));
      } 
   }else{
      extractors.push(new Extractor(merge(this.site,scrapuleLoaded.route),scrapuleLoaded.operation));
   }
   return extractors;
} 

function merge(site,route){
   var site = site;
   var content;
   routeSplit = route.split('#');
   if(routeSplit.length === 2 ){
      site = routeSplit[0];
      content = routeSplit[1];
   }else{
      content = route;
   }
   return site + '#' + content;
}
