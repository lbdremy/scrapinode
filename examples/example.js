var scrapinode = require('./../lib/scrapinode');

var url = 'http://www.amazon.co.uk/Navigate-Hungry-Jungle-Insulated-Snack/dp/B000BNTQLA/ref=amb_link_160755407_12?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=center-1&pf_rd_r=1KYYFD9PPNQHPNBF3VZJ&pf_rd_t=101&pf_rd_p=250067227&pf_rd_i=118859031';

scrapinode.createScraper(url,function(scraper){
   var image = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   console.log(title);
   console.log(description);
});


var url2 = 'http://www.rueducommerce.fr/TV-Hifi-Home-Cinema/TV-3D/TV-de-32-a-37/SAMSUNG/4842915-UE32D6200-Televiseur-LED-16-9-32-81cm-3D-Ready-HDTV-1080p-TNT-HD-200Hz-DLNA-SMART-TV-4xHDMI-CI-USB.htm#xtatc=INT-191-0||00';

scrapinode.createScraper(url2,function(scraper){
   var image = scraper.get('images');
   var title = scraper.get('title');
   var description = scraper.get('description');
   console.log(title);
   console.log(description);
});
