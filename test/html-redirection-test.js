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
	describe('when a redirection is indicated in a HTML page',function(){
		it('should follow the redirection');
	});
});