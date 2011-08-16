# Scrapinode 
   - 1 SCRAPER = 1 SITE SCRAPED
   - Extend the behavior of your scraper as much as you want with your own module (just expose the good interface).

##Install
    `npm install scrapinode`
    
##Get Started

    var scrapinode = require('scrapinode');
    var myScrapule = require('my-scrapule');
    scrapinode.init(); // Extend the prototype of the Scraper Class with available scrapules in the scrapules directory(/lib/scrapnet)
    
    // Extend the prototype of the Scraper Class with my own scrapnet module
    scrapinode.use(myScrapule);
    
    // My first scraper, scrap the awesome video page of Norman
    var url = 'http://www.youtube.com/user/NormanFaitDesVideos';
    scrapinode.createScraper(url ,function(err,scraper){
      if(err) console.log(err);
      var images = scraper.get('images');
      var videos = scraper.get('videos');
      var title = scraper.get('title');
      var description = scraper.get('description');
    });
    
    // My second scraper, scrap an amazon product
    var url = 'http://www.youtube.com/user/NormanFaitDesVideos';
    scrapinode.createScraper(url ,function(err,scraper){
      if(err) console.log(err);
      var images = scraper.get('images');
      var title = scraper.get('title');
      var description = scraper.get('description');
    });
    
##Create my own scrap(mod)ule

    var scrapVideos = function($,url){
      //scrap stuff with Jquery
      $('video').each(function(){
         ...
      }
    }
   
    // You can expose object/array of objects 
    // exports.scrapule = [{ extractor : 'videos' , scrap : scrapVideos }, {...}];
    exports.scrapule = { extractor : 'videos' , scrap : scrapVideos };
   
##Contributions
Contributions, suggestions, comments, issues^^ are welcome.

##Licence
(The MIT License)

Copyright (c) 2010-2011 HipSnip Limited

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
