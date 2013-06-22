/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode');

// Test suite

describe('scrapinode#createScraper(url,callback)',function(){
	describe('when corrupted zipped data is retrieved',function(){
		it('should return an error Object in the callback as first argument',function(done){
			scrapinode.useAll(scrapinode.defaults());
			scrapinode.createScraper('http://www.cavagogo.com/index.cfm',function(err,scraper){
				assert.instanceOf(err,Error);
				assert.isUndefined(scraper);
				done();
			})
		});
	});
});