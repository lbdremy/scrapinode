/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode'),
	ScrapinodeError = require(libPath + '/error/scrapinode-error');

// Test suite

['jsdom','cheerio'].forEach(runTestSuite);

function runTestSuite(engine){
	describe('scraper using the default operators thanks to ' + engine,function(){
		describe('and scraping by following the Open Graph protocol',function(){
			describe('#get("title")',function(){
				it('should retrieve the text representating the title');
			});
			describe('#get("descriptions")',function(){
				it('should retrieve a list of text representating the descriptions');
			});
			describe('#get("images")',function(){
				it('should retrieve a list of images url');
			});
			describe('#get("videos")',function(){
				it('should retrieve a list of videos [urls or html representations of the videos]');
			});
		});
		describe('and scraping by following the Schema.org specifications',function(){
			describe('#get("title")',function(){
				it('should retrieve the text representating the title');
			});
			describe('#get("descriptions")',function(){
				it('should retrieve a list of text representating the descriptions');
			});
			describe('#get("images")',function(){
				it('should retrieve a list of images url');
			});
		});
		describe('and scraping by searching the generic html tags',function(){
			describe('#get("title")',function(){
				it('should retrieve the text representating the title');
			});
			describe('#get("descriptions")',function(){
				it('should retrieve a list of text representating the descriptions');
			});
			describe('#get("images")',function(){
				it('should retrieve a list of images url');
			});
			describe('#get("videos")',function(){
				it('should retrieve a list of videos [urls or html representations of the videos]');
			});
		});
	});
}
