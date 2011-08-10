var scrapinode = require('./../lib/scrapinode');

var url = 'http://www.amazon.co.uk/Navigate-Hungry-Jungle-Insulated-Snack/dp/B000BNTQLA/ref=amb_link_160755407_12?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=center-1&pf_rd_r=1KYYFD9PPNQHPNBF3VZJ&pf_rd_t=101&pf_rd_p=250067227&pf_rd_i=118859031';

scrapinode.createScraper(url,function(scraper){
   var image = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   console.log(title);
   console.log(description);
});


var url2 = 'http://www.youtube.com/watch?v=03_9oBmJ6nw&feature=feedrec_grec_index';

scrapinode.createScraper(url2,function(scraper){
   var image = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   var videos = scraper.get('videos');
   console.log(videos);
   console.log(title);
   console.log(description);
});
