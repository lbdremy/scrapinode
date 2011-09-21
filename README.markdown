# Scrapinode 
   - 1 Scraper = 1 website scraped

##Features
###Client
   - Implicit routing using domain name and content-type name.
   - Possibility to add extensions for a better scrapping.
   - Lazy loading of these extensions
   
###Developers
   - Create your own scrap function for specific domain name and specific content.
   
##Install
    `npm install scrapinode`
    
##Get Started
    var scrapinode = require('scrapinode');
    scrapinode.init(); // Look at default scrapule contained in /lib/scrapules
    
    scrapinode.use('/path/to/my/personal/scrapules/'); // Add a scrapule (a scrapule is a set of extractor)
    
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
    
##Create my own scrap(mod)ule

    var scrapVideos = function($,url){
      var videos = [];
      //scrap stuff with Jquery
      $('video').each(function(){
         ...
      }
      return videos;
    }
   
    // You can expose object/array of extractors. An extractor is an object having two specifics properties: route {string}(pattern: `site#content`) and operation {function}. 
    // exports = [{ route : 'site#videos' , operation : scrapVideos }, {...}];
    exports = { route : 'site#videos' , operation : scrapVideos };
   
##Contributions
Contributions, suggestions, comments, issues are welcome.

##Licence
(The MIT License)

Copyright (c) 2010-2011 HipSnip Limited

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
