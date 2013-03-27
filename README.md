# scrapinode - content driven and route based scraper

[![](https://secure.travis-ci.org/lbdremy/scrapinode.png)](http://travis-ci.org/#!/lbdremy/scrapinode) [![Dependency Status](https://gemnasium.com/lbdremy/scrapinode.png)](https://gemnasium.com/lbdremy/scrapinode)

## When use it?

When you want to retrieve information about the page pointed by the URL that your user has just copied, scrapinode is a great fit.
First scrapinode comes out of the box with a great feature of 1 line of code, that will give you the title, the description and the images of any HTML page on the web.
Second if you need more, you can extend it. See the examples to know more about it.

## Features

- Retrieve content like "title", "descriptions", "images", "videos" on any HTML pages with 1 line of code.
- Define specific operations based on the url of the page and the content you hope retrieve with regex.
- Scrape pages with jsdom + jquery or with cheerio.
- The HTTP client takes care to handle HTTP and HTML redirections.
- Scrape image like it was a HTML page.

## Install

```bash
npm install scrapinode
```

## Usage

```javascript
var scrapinode = require('scrapinode');

// Define an operation for a specific route and content
scrapinode.use('society6.com','title',function(window){
  var $ = window.$;
  var url = window.location.href; // url of the page maybe you want to check for some reasons
  var title = $('h1[itemprop="name"]').text();
  if(!title) return null;
  return title;
});

// Use default operations for content like "title", "descriptions", "images", "videos"
scrapinode.useAll(scrapinode.defaults());

scrapinode.createScraper('http://society6.com/product/Sounds-Good-Dude_T-shirt',function(err,scraper){
   if(err) return console.error(err);
   var title = scraper.get('title');
   console.log(title); // "Sound Good dude"
});
```

## Test

```bash
npm test
```

## Test coverage

```bash
make coverage
```

## Licence

(The MIT License)

Copyright (c) 2013 Rémy Loubradou

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
