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

app.get('/page1.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page1.html')).pipe(res);
});

app.get('/page2.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page2.html')).pipe(res);
});

app.get('/page-empty.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page-empty.html')).pipe(res);
});

app.listen(3030);

// Test suite

describe('scrapinode',function(){
	beforeEach(function(){
		scrapinode.clearRouter();
	});
	describe('#createScraper(url,callback)',function(){
		it('should create a scraper for the page retrieved at the given url',function(done){
			scrapinode.createScraper('http://localhost:3030/',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.isObject(scraper);
				assert.isFunction(scraper.get);
				done();
			});
		});
	});
	describe('#use({String} path, {String} content, {Function} operation)',function(){
		it('should use the given path,content and operation as a new route',function(done){
			scrapinode.use('localhost:3030','title',function(window){
				return window.$('title').text();
			});
			scrapinode.createScraper('http://localhost:3030/',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title'),'html5 boilerplate: index');
				done();
			});
		});
	});
	describe('#use({RegExp} path, {RegExp} content, {Function} operation)',function(){
		it('should use the given path,content and operation as a new route',function(done){
			scrapinode.use(/localhost:3030/,/^title/,function(window){
				return window.$('title').text() + 'es';
			});
			scrapinode.createScraper('http://localhost:3030/',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title1'),'html5 boilerplate: indexes');
				assert.equal(scraper.get('title2'),'html5 boilerplate: indexes');
				assert.equal(scraper.get('title3'),'html5 boilerplate: indexes');
				done();
			});
		});
	});
	describe('#use("*", "*", {Function} operation)',function(){
		it('should use the given path "*" ,content "*" and operation as a new route to catch all paths and contents asked',function(done){
			scrapinode.use('*','*',function(window){
				return window.$('title').text();
			});
			var left = 2;
			scrapinode.createScraper('http://localhost:3030/',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('wep'),'html5 boilerplate: index');
				assert.equal(scraper.get('lol'),'html5 boilerplate: index');
				left--;
				if(!left) done();
			});
			scrapinode.createScraper('http://localhost:3030/page1.html',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('wep'),'html5 boilerplate: page1');
				assert.equal(scraper.get('lol'),'html5 boilerplate: page1');
				left--;
				if(!left) done();
			});
		});
	});
	describe('#useAll(routes)',function(){
		it('should add all routes given',function(done){
			var routes = [
				{
					path : 'localhost',
					content : 'title',
					operation : function(window){
						return window.$('title').text();
					}
				},
				{
					path : 'localhost',
					content : 'description',
					operation : function(window){
						return window.$('meta[name="description"]').attr('content');
					}
				}
			];
			scrapinode.useAll(routes);
			scrapinode.createScraper('http://localhost:3030/',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title'),'html5 boilerplate: index');
				assert.equal(scraper.get('description'),'The web’s most popular front-end template');
				done();
			});
		});
	});
	describe('#use() or #useAll()',function(){
		it('should add the routes in the router ensuring the first route added is the first hit when browsering routes to retrieve a content if the path matchs obviously',function(done){
			scrapinode.use('localhost','title',function(window){
				if(window.location.href === 'http://localhost:3030/page1.html') return null; // pass
				if(window.location.href === 'http://localhost:3030/page2.html') return null; // pass
				return window.$('title').text();
			});
			scrapinode.useAll([{
				path : 'localhost',
				content : 'title',
				operation : function(window){
					if(window.location.href === 'http://localhost:3030/page2.html') return null; // pass
					if(window.location.href === 'http://localhost:3030/') return null; // pass
					return window.$('title').text() + '???';
				}
			}]);
			scrapinode.use('*','title',function(window){
				return window.$('title').text() + '!!!';
			});
			var left = 3;
			scrapinode.createScraper('http://localhost:3030/',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title'),'html5 boilerplate: index');
				if(!--left) done();
			});
			scrapinode.createScraper('http://localhost:3030/page1.html',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title'),'html5 boilerplate: page1???');
				if(!--left) done();
			});
			scrapinode.createScraper('http://localhost:3030/page2.html',function(err,scraper){
				assert.notInstanceOf(err,Error);
				assert.isNull(err);
				assert.equal(scraper.get('title'),'html5 boilerplate: page2!!!');
				if(!--left) done();
			});
		});
	});
	describe('#defaults()',function(){
		it('should return the routes to retrieve generic content from web pages e.g title, descriptions, images and videos',function(){
			var defaults = scrapinode.defaults();
			defaults.forEach(function(route){
				assert.equal(route.path,'*');
				assert.isString(route.content);
				assert.isFunction(route.operation);
			});
		});
	});
	describe('#createScraper({ url : "http://localhost:3030", engine :"mydreamengine"},callback)',function(){
		it('should return a ̀ScrapinodeError` in the callback as first argument',function(done){
			var options = {
				url : 'http://localhost:3030',
				engine : 'mydreamengine'
			}
			scrapinode.createScraper(options,function(err,scraper){
				assert.instanceOf(err,ScrapinodeError);
				assert.equal(err.message,'The engine "mydreamengine" is not supported. Scrapinode only supports jsdom and cheerio.')
				assert.isUndefined(scraper);
				done();
			});
		});
	});
	describe('#createScraper("http://localhost:3030/page-empty.html",callback)',function(){
		it('should return a ̀ScrapinodeError` in the callback as first argument',function(done){
			scrapinode.createScraper('http://localhost:3030/page-empty.html',function(err,scraper){
				assert.instanceOf(err,ScrapinodeError);
				assert.equal(err.message,'The HTTP response contains an empty body: ""')
				assert.isUndefined(scraper);
				done();
			});
		});
	});
});