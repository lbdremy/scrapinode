/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode'),
	ScrapinodeError = require(libPath + '/error/scrapinode-error');

// Test suite

describe('scrapinode',function(){
	describe('#use()',function(){
		it('should add the given path,content and operation as a new route',function(done){
			// Route that catchs everything
			scrapinode.use('*','*',function(window,next){
				return 'Goooogle it cannot find anything!';
			});
			scrapinode.createScraper('http://google.com',function(err,scraper){
				assert.isNull(err);
				assert.isObject(scraper);
				assert.equal(scraper.get('anything'),'Goooogle it cannot find anything!');
				done();
			});
		});
	});
	describe('#useAll()',function(){
		it('should add all routes given');
	});
	describe('#createScraper()',function(){
		it('should create a scraper for the page reached at the given url');
	});
	describe('#defaults()',function(){
		it('should return the routes to retrieve generic content from web pages like title,descriptions,images, videos');
	});
});