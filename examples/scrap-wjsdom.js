var scrapinode = require('./../main.js')();

var url = 'http://ecx.images-amazon.com/images/I/51RRbTkbfBL._SL500_AA300_.jpg';

scrapinode.createScraper(url,'jsdom',function(err,scraper){
   if(err){
    console.log(err);
   }else{
      var title = scraper.get('title');
      var description = scraper.get('description');
      var images = scraper.get('images');
      var video = scraper.get('video');
      console.log('IMAGES');
      console.log(images);
      console.log('TITLE:'+title);
      console.log('DESCRIPTION');
      console.log(description);
      console.log('VIDEO');
      console.log(video);
   }
});

