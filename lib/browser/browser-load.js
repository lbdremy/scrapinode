//Modules dependencies
var jsdom = require('jsdom'),
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

exports.load = function(url,callback){
   // hack to appear like a user-browser
   var headers = {
      'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1'
   }
   var retry = 3; // Retry the request 3 times before to send an error, the request is retried if HTTP error > 5xx
   var options = {
      uri : url,
      timeout : 20000,
      headers : headers 
   };
   
   // HTTP GET Request
   request.get(options, onend);
   
   function onend(err,res,body){
      if(!err && res.statusCode === 200){
         jsdom.env({
            html: body,
            src : [jquery],
            done : function(err,window){
                callback(err,window.$);
            }
         });
      }else{
         if(res.statusCode >= 500 && retry > 0){
            console.log('HTTP Status code: ' + res.statusCode);
            request.get(options,onend);
            retry--;
         }else{
            var err = err || res.statusCode;
            callback(err,null);
         }
      }
   };
}
