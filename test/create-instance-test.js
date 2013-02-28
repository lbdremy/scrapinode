/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode');

// Test suite

describe('scrapinode#createInstance()',function(){
	it('should create a new instance of Scrapinode',function(){
		var newScrapinode = scrapinode.createInstance('cheerio');
		assert.equal(newScrapinode.engine,'cheerio');
		assert.ok(newScrapinode.router);
	});
});