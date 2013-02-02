/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode'),
	ScrapinodeError = require(libPath + '/error/scrapinode-error');

// Test suite

describe('scrapinode#createScraper(url,callback)',function(){
	describe('when a the url pointed to an image ressource',function(){
		it('should create a HTML page and build the DOM based on this ressource and so be able to retrieve the url available in the attribute src of the tag img generated.');
	});
});