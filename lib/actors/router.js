// Modules dependencies


// Expose Router
module.exports = exports = Router;

// The Router object is responsible for drive a route to the specific extractor
function Router(){
   this.extractors = []; // Array of Extractors
   this.scrapules = [];
}

Router.prototype.addExtractor = function(extractor){
   var self = this;
   this.extractors.push(extractor);
   // Allow chainable call
   return self;
}

Router.prototype.addExtractors = function(extractors){
   var self = this;
   this.extractors = this.extractors.concat(extractors);
   // Allow chainable call
   return self;
}

Router.prototype.addScrapule = function(scrapule){
   var self = this;
   this.scrapules.push(scrapule);
   // Allow chainable call
   return self;
}

Router.prototype.resolve = function(route){
   var route = parseRoute(route);
   // Check scrapules 
   for(var i = 0; i < this.scrapules.length; i++){
      if(route.site === this.scrapules[i].site || this.scrapules[i].site === 'default'){ // Always load default scrapules on the first scrap
         this.addExtractors(this.scrapules[i].loadExtractors());
         this.scrapules.splice(i,1); // Removed the scrapule already loaded
         i--;
      }
   }
   // Check extractors
   var extractor;
   for(var i = 0; i < this.extractors.length ; i++){
      if(matchRoute(this.extractors[i],route)){
         extractor = this.extractors[i];
         if(extractor.route.site !== 'default') break; // Break the loop if the specific extractor has been found
      }
   }
   return extractor;
} 

function matchRoute(extractor,route){
   var pass = false;
   if(extractor.route.site === route.site && extractor.route.content === route.content){
      pass = true;
   }else if(extractor.route.site === 'default' && extractor.route.content === route.content){
      pass = true;
   }
   return pass;
}

function parseRoute(rt){
   var route = {};
   routeSplit = rt.split('#');
   if(routeSplit.length === 2 ){
      route.site = routeSplit[0];
      route.content = routeSplit[1];
   }
   return route;
}
