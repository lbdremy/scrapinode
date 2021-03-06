/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode'),
	ScrapinodeError = require(libPath + '/error/scrapinode-error'),
	express = require('express'),
	filed = require('filed'),
	HTTPError = require('httperror');

// Web server
var app = express();

app.get('/',function(req,res){
	res.send(500, { error: 'something blew up' });
});

app.listen(3051);

// Test suite

describe('scrapinode#createScraper(url,callback)',function(){
	describe('when something blew up on the server',function(){
		it('should return an HTTPError on the callback',function(done){
			scrapinode.createScraper('http://localhost:3051/',function(err,scraper){
				var fakeReq = {
					headers : {},
					uri : { host : 'localhost:3051', path : '', protocol : 'http:'},
					method : 'GET'
				};
				var fakeRes = {
					headers : {},
					statusCode : 500,
					body : {}
				};
				var httpError500 = new HTTPError(fakeReq, fakeRes);
				assert.instanceOf(err,HTTPError);
				assert.equal(err.name,httpError500.name);
				assert.isUndefined(scraper);
				done();
			})
		});
	});
});