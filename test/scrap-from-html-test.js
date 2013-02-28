/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode');

// Test suite

describe('scrapinode#createScraper({url : "...", html : "..."},callback)',function(){
	describe('when the property "html" is given in the "options" parameters',function(){
		it('should use the value of the property "html" as the content of the given "url"',function(done){
			scrapinode.use('nimportequoi.fr','title',function(window){
				return window.$('title').text();
			});
			var options = {
				url : 'http://nimportequoi.fr',
				html : '<!DOCTYPE html><html><head><title>Raw HTML page</title></head><body></body></html>'
			};
			scrapinode.createScraper(options,function(err,scraper){
				assert.isNull(err);
				assert.equal(scraper.get('title'),'Raw HTML page');
				done();
			});
		});
	});
});