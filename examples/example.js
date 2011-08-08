var Scrapinode = require('./../lib/scrapinode');

var scrapinode = Scrapinode.create('http://facebook.com');

scrapinode.on('ready',function(){
   var image = scrapinode.get('image');
   var title = scrapinode.get('title');
   console.log(title);
   console.log(image);
});

scrapinode.on('error',function(err){
   console.log(err);
});


