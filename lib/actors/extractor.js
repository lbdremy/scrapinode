// Modules dependencies

// Expose Extractor
module.exports = exports = Extractor;

function Extractor(route,operation){
   this._parse(route);
   this.operation = operation;   
} 

Extractor.prototype._parse = function(rt){
   this.route = {};
   routeSplit = rt.split('#');
   if(routeSplit.length === 2 ){
      this.route.site = routeSplit[0];
      this.route.content = routeSplit[1];
   }
}
