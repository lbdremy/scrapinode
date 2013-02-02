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
	describe('#createScraper(url,callback)',function(){
		it('should create a scraper for the page retrieved at the given url');
	});
	describe('#use({String} path, {String} content, {Function} operation)',function(){
		it('should use the given path,content and operation as a new route');
	});
	describe('#use({RegExp} path, {RegExp} content, {Function} operation)',function(){
		it('should use the given path,content and operation as a new route');
	});
	describe('#use("*", "*", {Function} operation)',function(){
		it('should use the given path "*" ,content "*" and operation as a new route to catch all paths and contents asked');
	});
	describe('#useAll(routes)',function(){
		it('should add all routes given');
	});
	describe('#use() or #useAll()',function(){
		it('should add the routes in the router ensuring the first route added is the first hit when browsering routes to retrieve a content if the path matchs obviously');
	});
	describe('#defaults()',function(){
		it('should return the routes to retrieve generic content from web pages e.g title, descriptions, images and videos');
	});
});