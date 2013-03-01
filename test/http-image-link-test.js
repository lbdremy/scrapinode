/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode'),
	ScrapinodeError = require(libPath + '/error/scrapinode-error'),
	express = require('express'),
	filed = require('filed');

// Web server
var app = express();

app.get('/inspectocat.jpg',function(req,res){
	req.pipe(filed(__dirname + '/resources/inspectocat.jpg')).pipe(res);
});

app.listen(3050);

// Test suite

describe('scrapinode#createScraper(url,callback)',function(){
	beforeEach(function(){
		scrapinode.clearRouter();
	});
	describe('when a the url pointed to an image ressource',function(){
		it('should create a HTML page and build the DOM based on this ressource and so be able to retrieve the url available in the attribute src of the tag img generated.',function(done){
			scrapinode.use('localhost:3050','image',function(window){
				return window.$('img:first').attr('src');
			});
			scrapinode.createScraper('http://localhost:3050/inspectocat.jpg',function(err,scraper){
				assert.isNull(err);
				assert.equal(scraper.get('image'),'http://localhost:3050/inspectocat.jpg');
				done();
			})
		});
	});
});