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

app.get('/',function(req,res){
	req.pipe(filed(__dirname + '/resources/index.html')).pipe(res);
});

app.get('/page-html-redirection.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page-html-redirection.html')).pipe(res);
});

app.listen(3040);

// Test suite

describe('scrapinode#createScraper(url,callback)',function(){
	beforeEach(function(){
		scrapinode.clearRouter();
	});
	describe('when a redirection is indicated in a HTML page',function(){
		it('should follow the redirection',function(done){
			scrapinode.use('localhost:3040','title',function(window){
				return window.$('title').text();
			});
			scrapinode.createScraper('http://localhost:3040/page-html-redirection.html',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title'),'html5 boilerplate: index');
				done();
			});
		});
	});
});