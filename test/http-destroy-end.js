/**
 * Module dependencies
 */

var express = require('express'),
	filed = require('filed'),
	http = require('http');

// Web server

var app = express();

app.get('/inspectocat.jpg',function(req,res){
	req.pipe(filed(__dirname + '/resources/inspectocat.jpg')).pipe(res);
});

var server = http.createServer(app);
server.listen(3000,function(err){
	if(err) return console.error(err);
	console.log('listening on port 3000');
});

// Test

http.get('http://localhost:3000/inspectocat.jpg',function(res){
	var body = '';
	res.destroy(new Error('Fucking error'));
	res.on('data',function(chunk){
		body += chunk;
		console.log('length of the body ' + body.length + ' bytes');
	});
	res.on('end',function(){
		console.log('END');
	})
	res.on('close',function(){
		console.log('CLOSE');
	});
	res.on('error',function(err){
		console.log('ERROR RESPONSE');
		console.error(err);
	});
})
.on('error',function(err){
	console.log('ERROR')
	console.error(err);
});