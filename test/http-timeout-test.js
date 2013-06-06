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
	setTimeout(function(){
		req.pipe(filed(__dirname + '/resources/index.html')).pipe(res);
	},1000);
});

app.listen(3040);

// Test suite

describe('scrapinode#createScraper(options,callback)',function(){
	beforeEach(function(){
		scrapinode.clearRouter();
	});
	describe('when the options.timeout is defined and the timeout is reached',function(){
		it('should return an error Object in the callback as first argument',function(done){
			scrapinode.use('localhost:3040','title',function(window){
				return window.$('title').text();
			});
			var options = {
				url : 'http://localhost:3040/',
				timeout : 200,
				retries : 0
			};
			scrapinode.createScraper(options,function(err,scraper){
				assert.instanceOf(err,Error);
				done();
			});
		});
	});
});