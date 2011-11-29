// Modules dependencies

// Expose Singleton Scrap

module.exports = exports = new Scrap();

function Scrap(){
   var self = this;
   return function(content){
      if(self[content]) return self[content];
   }
}

// TODO DRY description, images, title, price and currency.

Scrap.prototype.description = function(paths){
   return function($,url){ 
      var descriptions = [];
      function add(element,format){
         var text = $(element).text();
         if(text) text = text.trim().replace(/\n|\t|\r/g,'');
         if(format && text) text = format(text);
         if(text) descriptions.push(text);
      }
      for(var i = 0; i < paths.length; i++){
         var path = paths[i].path || paths[i];
         var each = paths[i].each || false;
         var format = paths[i].format;
         if(each){
            $(path).each(function(){
               add(this,format);
            });
         }else{
            add(path,format);
         }
      }
      return descriptions 
   };
}

Scrap.prototype.images = function(paths){
   return function($,url){ 
      var thumbs = [];
      function add(element,format){
         var src = $(element).attr('src');
         if(src) src = src.trim().replace(/\n|\t|\r/g,'');
         if(format && src) src = format(src);
         if(src) thumbs.push(src);
      }
      for(var i = 0; i < paths.length; i++){
         var path = paths[i].path || paths[i];
         var each = paths[i].each || false;
         var format = paths[i].format;
         if(each){
            $(path).each(function(){
               add(this,format);
            });
         }else{
            add(path,format);
         }
      }
      return thumbs
   };
}

Scrap.prototype.title = function(path){
   return function($,url){
      var title;
      function find(path){ 
         var title = $(path).text();
         if(title) title = title.trim().replace(/\n|\t|\r/g,'');
         return title
      }
      if(typeof path === 'string'){ 
         title = find(path);
      }else{
         // Here path is considered to be an Array Object
         for( var i=0; i < path.length; i++){
            title = find(path[i]);
            if(title) break;
         }
      }
      return title;
   };
}

Scrap.prototype.price = function(path){
   return function($,url){
      var price;
      function find(path){
         var price = $(path).text();
         if(price) price = price.trim().replace(/\n|\t|\r| /g,'').replace(/\$|£|€|EUR|GBP|USD|�/gi,'');
         var pattern = /([0-9,]{1,}(\.?[0-9]{1,}))/;
         var rests = price.match(pattern);
         if(rests) price = rests[1];
         return price;
      }
      if(typeof path === 'string'){ 
         price = find(path);
      }else{
         // Here path is considered to be an Array Object
         for( var i=0; i < path.length; i++){
            price = find(path[i]);
            if(price) break;
         }
      }
      return price; 
   };
}

Scrap.prototype.currency = function(path){
   return function($,url){ 
      var currency;
      function find(path){
         var currency = $(path).text();
         if(currency.match(/GBP|£|�/gi) !== null ){currency = 'GBP';}
         else if(currency.match(/EUR|€/gi) !== null ){currency = 'EUR';}
         else if(currency.match(/USD|\$/gi) !== null ){ currency = 'USD';}
         return currency;
      }
      if(typeof path === 'string'){
         currency = find(path); 
      }else{
         // Here path is considered to be an Array Object
         for( var i=0; i < path.length; i++){
            currency = find(path[i]);
            if(currency) break;
         }
      }
      return currency;
   };
}
