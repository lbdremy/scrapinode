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
      'to scrap an HTML page thanks to its url' : {
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
            assert.isString(scraper.get('title'));
         },
         'should give a Scraper object able to retrieve a description of the page' : function(err,scraper){
            assert.isArray(scraper.get('description'));
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assert.isArray(scraper.get('images'));
         }
      },
      'to scrap an HTML page thanks to its url using a specific scrapule determined by the domain name of the page' : {
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
            assert.isString(scraper.get('title'));
         },
         'should give a Scraper object able to retrieve a description of the page' : function(err,scraper){
            assert.isArray(scraper.get('description'));
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assert.isArray(scraper.get('images'));
         },
         'should give a Scraper object able to retrieve the price of the product' : function(err,scraper){
            assert.match(scraper.get('price'),/([0-9,]{1,}(\.?[0-9]{1,}))/)
         }
      },
      'to scrap an HTML page created because the resource found with the link given is an image' : {
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
            assert.isArray(scraper.get('images'));
         },
      },
      'to scrap an HTML page with in it a HTTP-REFRESH meta tag' : {
         topic : function(){
            scrapinode.createScraper(urlwithHTTPRefreshMeta,this.callback)
         },
         'should give a Scraper object' : function(err,scraper){
            assert.instanceOf(scraper,Scraper);
         },
         'should give a Scraper object able to retrieve the title of the page' : function(err,scraper){
            assert.isString(scraper.get('title'));
         },
         'should give a Scraper object able to retrieve a description of the page' : function(err,scraper){
            assert.isArray(scraper.get('description'));
         },
         'should give a Scraper object able to retrieve images of the page' : function(err,scraper){
            assert.isArray(scraper.get('images'));
         }
      }
   }
   
}).export(module)
