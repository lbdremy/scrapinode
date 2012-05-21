//Modules dependencies
var jsdom = require('jsdom'),
    cheerio = require('cheerio'),
    request = require('request'),
    fs     = require('fs');

// JQuery dependencies
var jqueryExt = fs.readFileSync(__dirname + '/../../deps/jquery-regex-selector.js').toString();
var jquery = fs.readFileSync(__dirname + '/../../deps/jquery-1.6.2.min.js').toString() + jqueryExt;

/**
 * Expose load
 * Load the page and put Jquery in the page
 *
 */

exports.load = function(options,callback){
   var retry = 3; // Retry the request 3 times before to send an error, the request is retried if HTTP error > 5xx
   var refresh = 0;
   if(options.url && options.imageToHTML){
      headRequest();
   }else if(options.url){   
      getRequest();
   }else{
      // mock res expected
      var res = { statusCode : 200};
      onend(null,res,options.html);
   }
   
   function headRequest(){
      request.head({
         uri : options.url,
         timeout : 5000,
         headers : {
            'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1',
         }
      },function(err,res){
         if(err){
            getRequest(options);
         }else{
             var contentType = res.headers ?  res.headers['content-type'] : '';
             if(!contentType.match(/image\//i)){
                getRequest(options);
             }else{
                var body = '<!DOCTYPE html><html><head></head><body><img src="' + options.url + '" /></body></html>';
                onend(null,res,body);
             }
         }
      });
   }
   
   function getRequest(){
      // hack to appear like a user-browser
      var headers = {
         'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1',
         'accept': 'text/html, application/xhtml+xml, application/xml; q=0.9',
         'accept-charset': 'utf-8; q=1.0, ISO-8859-1; q=0.7, *; q=0.3'
      }
      
      // HTTP GET Request
      request.get({
         uri : options.url,
         timeout : 20000,
         headers : headers 
      }, onend);
   }
   
   function onend(err,res,body){
      if(!err && res.statusCode >= 200 && res.statusCode <= 299 && body){
         // Check if a HTTP refresh/redirection is present into the HTML page, if yes refreshes/redirects.
         var matches = body.match(/<meta[ ]*http-equiv="REFRESH"[ ]*content="0;[ ]*URL=(.*?)"[ ]*\/?>/);
         if(matches && matches[1] && refresh === 0){
            options.url = matches[1];
            refresh++;
            getRequest();
         }else if(options.engine === 'jsdom'){
            jsdom.env({
               html: body,
               src : [jquery],
               done : function(err,window){
                   callback(err,window.$);
                   window.close();
               }
            });
         }else if(options.engine === 'cheerio'){
            var $ = cheerio.load(body);
            callback(null,$);
         }
      }else{
         if(res && res.statusCode >= 500 && retry > 0){
            getRequest();
            retry--;
         }else if(!body && !err){
            var err = new Error('Scrapinode: HTTP body is empty.');
            callback(err,null);
         }else{
            var err = err || new Error('Scrapinode: HTTP status code:' + res.statusCode);
            callback(err,null);
         }
      }
   };
}
