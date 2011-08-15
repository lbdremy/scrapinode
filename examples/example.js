var scrapinode = require('./../main.js')();

var url = 'http://www.amazon.co.uk/gp/product/B002FK9I5Q/ref=s9_simh_gw_p79_d0_g79_i2?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=center-2&pf_rd_r=1P7JMEKKPYPGVQHZ8MPB&pf_rd_t=101&pf_rd_p=467128533&pf_rd_i=468294';

scrapinode.createScraper(url,function(err,scraper){
   var images = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   console.log('IMAGES');
   console.log(images);
   console.log('TITLE:'+title);
   console.log('DESCRIPTION');
   console.log(description);
});

var url3 = 'http://www.youtube.com/user/NormanFaitDesVideos';

scrapinode.createScraper(url3,function(err,scraper){
   var images = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   console.log('IMAGES');
   console.log(images);
   console.log('TITLE:'+title);
   console.log('DESCRIPTION');
   console.log(description);
});

/*
var url2 = 'http://www.rueducommerce.fr/TV-Hifi-Home-Cinema/TV-LED/TV-LED-de-38-a-42/SAMSUNG/4844002-UE40D5000-Televiseur-LED-16-9-40-102cm-HDTV-1080p-TNT-HD-100Hz-DLNA-4xHDMI-USB.htm#pdd';

scrapinode.createScraper(url2,function(err,scraper){
   var images = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   console.log('IMAGES');
   console.log(images);
   console.log('TITLE:'+title);
   console.log('DESCRIPTION');
   console.log(description);
});
*/
