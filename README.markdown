# Scrapinode 
Modular Scraper

[![](http://travis-ci.org/lbdremy/scrapinode.png)](http://travis-ci.org/#!/lbdremy/scrapinode)

##Features
###Clients
   - Implicit routing using domain name and content-type name.
   - Possibility to add extensions named scrapules for a better scrapping.
   - Lazy loading of these extensions
   
###Developers
   - Create your own scrap function for specific domain name and specific content.
   
##Install

```
npm install scrapinode
``` 
##Get Started

```js
 var scrapinode = require('scrapinode');
 // Load the default `Scrapule` into the set of scrapules available for scrapinode. 
 // Look at the default scrapule contained in /lib/scrapules/default.js to know more about this scrapule.
 scrapinode.init(); 
 
 // Load a set of `Scrapule` into scrapinode contained in the scrapules folder (a scrapule is a set of extractors)
 // An absolute path is required in argument.
 scrapinode.use( __dirname + '/path/to/my/personal/scrapules/'); 
 
 // Scrap the awesome video page of Norman on YouTube
 var url = 'http://www.youtube.com/user/NormanFaitDesVideos';
 scrapinode.createScraper(url ,function(err,scraper){
   if(err){ 
      console.log(err);
   }else{
      var images = scraper.get('images');
      var videos = scraper.get('videos');
      var title = scraper.get('title');
      var description = scraper.get('description');
    }
 });
 
 // Scrap an amazon product
 var url = 'http://www.amazon.co.uk/gp/product/B005PVOMTO/ref=s9_simh_gw_p63_d0_g63_i3?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=center-2&pf_rd_r=1AR79J0XVRX6B58D60Y1&pf_rd_t=101&pf_rd_p=467128533&pf_rd_i=468294';
 scrapinode.createScraper(url ,function(err,scraper){
   if(err){ 
      console.log(err);
   }else{
      var images = scraper.get('images');
      var videos = scraper.get('videos');
      var title = scraper.get('title');
      var description = scraper.get('description');
    }
 });
```    
##Create your own scrap[mod]ule
A `Scrapule` is an `Object` more particularly an `Array` implementing the following interface:

```js
// Create your scrapule
var scrapule = [
   {
      route : 'domain#contentType1',
      operation : function(url,$){ }
   },
   {
      route : 'domain#contentType2',
      operation : function(url,$){ }
   },
   {
      route : 'domain#contentType3',
      operation : function(url,$){ }
   },
   {
      route : 'domain#contentType4',
      operation : function(url,$){ }
   }
];

// Expose it
module.exports = scrapule;

```

Have a look to the default scrapule in the file [`/lib/scrapules/default.js`](https://github.com/lbdremy/scrapinode/blob/master/lib/scrapules/default.js) if you want to know more.

##Test

```
npm test
```
##Contributions
Contributions, suggestions, comments, issues are welcome.

##Licence
(The MIT License)

Copyright (c) 2010-2011 HipSnip Limited

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
