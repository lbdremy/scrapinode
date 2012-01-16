var scrapinode = require('./../main.js')();

// Issue with this page similar to https://github.com/tmpvar/jsdom/issues/290
// Works great with cheerio
var url = 'http://www.dell.com/uk/p/xps-15z/pd?oc=n0015z01epp&model_id=xps-15z&';

scrapinode.createScraper(url,'jsdom',function(err,scraper){
   if(err){
    console.log(err);
   }else{
      var title = scraper.get('title');
      var description = scraper.get('description');
      var images = scraper.get('images');
      console.log('IMAGES');
      console.log(images);
      console.log('TITLE:'+title);
      console.log('DESCRIPTION');
      console.log(description);
   }
});
