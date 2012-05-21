/** 
 * Modules dependencies
 */

var vows = require('vows'),
    assert = require('assert'),
    scrapinode = require('./../main');
    Scraper = require('./../lib/actors/scraper')
// Vows test suite
var suite = vows.describe('Scrapinode');

// Elements for the test suite
var pathScrapulesDir = __dirname + '/scrapules/';
var urlDefault = 'http://www.comet.co.uk/p/Plasma-TVs/buy-LG-42PT353-Plasma-TV/721050';
var urlCultBeauty = 'http://www.cultbeauty.co.uk/clarisonic/clarisonic-plus_sonic_skin_cleansing_system.php';
var urlImage = 'http://ecx.images-amazon.com/images/I/51RRbTkbfBL._SL500_AA300_.jpg';
var urlwithHTTPRefreshMeta = 'http://www.windowsphone.com/en-US/apps/82a23635-5bd9-df11-a844-00237de2db9e';

suite.addBatch({
   'Load a scrapule in scrapinode' : {
      topic : function(){
         var useScrapules = function(){ scrapinode.use(pathScrapulesDir)}
         return useScrapules
      },
      'should happen without throwing errors' : function(useScrapules){
         assert.doesNotThrow(useScrapules,Error)
      }
   }
}).addBatch({
   'Create a scraper' : {
      'to grab relevant elements in the HTML page thanks to its url' : {
         topic : function(){
            scrapinode.init();
            scrapinode.createScraper(urlDefault,this.callback);
         },
         'should happen without error' : function(err,scraper){
            assert.isNull(err);
         },
         'should give a Scraper object': function(err,scraper){
            assert.instanceOf(scraper,Scraper);
         },
         'should give a Scraper object able to retrieve the title of the page' : function(err,scraper){
            assertStringNotEmpty(scraper.get('title'));
         },
         'should give a Scraper object able to retrieve a description of the page' : function(err,scraper){
            assertArrayNotEmpty(scraper.get('description'));
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assertArrayNotEmpty(scraper.get('images'));
         }
      },
      'to grab relevant elements in the HTML page thanks to its url using a specific scrapule determined by the domain' : {
         topic : function(){
            scrapinode.use(pathScrapulesDir);
            scrapinode.createScraper(urlCultBeauty,this.callback)
         },
         'should happen without error' : function(err,scraper){
            assert.isNull(err);
         },
         'should give a Scraper object' : function(err,scraper){
            assert.instanceOf(scraper,Scraper);
         },
         'should give a Scraper object able to retrieve the title of the page' : function(err,scraper){
            assertStringNotEmpty(scraper.get('title'));
         },
         'should give a Scraper object able to retrieve a description of the page' : function(err,scraper){
            assertArrayNotEmpty(scraper.get('description'));
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assertArrayNotEmpty(scraper.get('images'));
         },
         'should give a Scraper object able to retrieve the price of the product' : function(err,scraper){
            var price = scraper.get('price');
            assert.isNotEmpty(price);
            assert.match(price,/([0-9,]{1,}(\.?[0-9]{1,}))/)
         }
      },
      'to grab relevant elements in the HTML page where the link given point to an image.' : {
         topic : function(){
            scrapinode.createScraper(urlImage,this.callback)
         },
         'should happen without error' : function(err,scraper){
            assert.isNull(err);
         },
         'should give a Scraper object' : function(err,scraper){
            assert.instanceOf(scraper,Scraper);
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assertArrayNotEmpty(scraper.get('images'));
         },
      },
      'to grab relevant elements in the HTML page where the HTTP-REFRESH meta tag must be followed' : {
         topic : function(){
            scrapinode.createScraper(urlwithHTTPRefreshMeta,this.callback)
         },
         'should give a Scraper object' : function(err,scraper){
            assert.instanceOf(scraper,Scraper);
         },
         'should give a Scraper object able to retrieve the title of the page' : function(err,scraper){
            assertStringNotEmpty(scraper.get('title'));
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assertArrayNotEmpty(scraper.get('images'));
         }
      },
      'to grab relevant elements in the HTML page given in argument' : {
         topic : function(){
            var html = '<!DOCTYPE html><html><head><title>Blabla.com</title></head><body><img src="http://blabla.com/favicon.ico"/></body></html>';
            scrapinode.createScraper(html,this.callback);
         },
         'should give a Scraper object' : function(err,scraper){
            assert.instanceOf(scraper,Scraper);
         },
         'should give a Scraper object able to retrieve the title of the page' : function(err,scraper){
            var title = scraper.get('title');
            assertStringNotEmpty(title);
            assert.deepEqual(title,'Blabla.com');
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            var images = scraper.get('images');
            assertArrayNotEmpty(images);
            assert.deepEqual(images, ['http://blabla.com/favicon.ico'])
         }
      }
   }
   
}).export(module)

// Macros

function assertStringNotEmpty(title){
   assert.isNotEmpty(title);
   assert.isString(title);
}

function assertArrayNotEmpty(description){
   assert.isNotEmpty(description);
   assert.isArray(description);
}
