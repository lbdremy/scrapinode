/**
 * Modules dependencies
 */

var jsdom = require('jsdom'),
    cheerio = require('cheerio'),
    request = new require('superagent').agent(),
    fs = require('fs'),
    ScrapinodeError = require('./error/scrapinode-error');

/**
 * JQuery dependencies
 */

var jqueryExt = fs.readFileSync(__dirname + '/../deps/jquery-regex-selector.js').toString();
var jquery = fs.readFileSync(__dirname + '/../deps/jquery-1.6.2.min.js').toString() + jqueryExt;

/**
 * Build the DOM of the given page found at `options.url` or `options.html`
 *
 * @param {Object} options -
 * @param {Function} callback -
 * @param {Error} callback().err -
 * @param {Object} callback().window -
 */

exports.load = function(options,callback){
    var headers = {
        'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1',
        'accept' : 'text/html, application/xhtml+xml, application/xml; q=0.9',
        'accept-charset' : 'utf-8; q=1.0, ISO-8859-1; q=0.7, *; q=0.3',
        'accept-encoding' : 'gzip, deflate'
    };
    var timeout = 5000;
    var retries = 3;
    var redirects = 5;

    getRequest({
        url : options.url,
        headers : headers,
        timeout : timeout,
        retries : retries,
        redirects : redirects
    },function(err,body){
        if(err) return callback(err);
        buildDOM(body,options.engine,options.url,callback);
    });
}

/**
 * Check if we should follow the redirect `code`.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */

function isRedirect(code) {
  return ~[301, 302, 303, 305, 307].indexOf(code);
}

/**
 * Helpers
 */

function getRequest(options,callback){
    var req = request.get(options.url)
        .set(options.headers)
        .timeout(options.timeout)
        .redirects(options.redirects)
        .buffer(false)
        .end(function(err,res){
            if(err || (res.status >= 400 && res.status <= 599)) {
                if(options.retries--) return getRequest(options,callback);
                return callback(err || new ScrapinodeError('The HTTP request failed 3 times with the status code ' + res.status));
            }
            if(res.status >= 300 && res.status < 399 ){
                return callback(new ScrapinodeError('The HTTP request failed with the status code ' + res.status));
            }
            var body = '';
            res.on('data',function(chunk){
                body += chunk;
            });
            res.on('end',function(){
                // Check if a HTTP refresh/redirection is present into the HTML page, if yes refreshes/redirects.
                var matches = body.match(/<meta[ ]*http-equiv="REFRESH"[ ]*content="0;[ ]*URL=(.*?)"[ ]*\/?>/);
                if(matches && matches[1]){
                    options.url = matches[1];
                    return getRequest(options,callback);
                }
                callback(null,body);
            });
            var contentType = res.headers ?  res.headers['content-type'] : '';
            if(contentType.match(/image\//i)){
                res.destroy();
                body = '<!DOCTYPE html><html><head></head><body><img src="' + options.url + '" /></body></html>';
                return callback(null,body);
            }
        });
}

function buildDOM(body,engine,url,callback){
    if(!body){
        return callback(new ScrapinodeError('The HTTP response contains an empty body: "' + body +'"'));
    }

    if(engine === 'jsdom'){
        jsdom.env({
           html: body,
           src : [jquery],
           done : function(err,window){
               window.location.href = url;
               callback(err,window);
               window.close();
           }
        });
    }else if(engine === 'cheerio'){
        var $ = cheerio.load(body);
        var window = {
            $ : $,
            location : {
                href : url
            }
        };
        callback(null,window);
    }else{
        callback(new ScrapinodeError('The engine "' + engine + '" is not supported. Scrapinode only supports jsdom and cheerio.'));
    }
}


   /*
   var retry = 3; // Retry the request 3 times before to send an error, the request is retried if HTTP error > 5xx
   var refresh = 0;
   if(options.url){
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
                    window.url = options.url;
                   callback(err,window);
                   window.close();
               }
            });
         }else if(options.engine === 'cheerio'){
            var $ = cheerio.load(body);
            var window = {
                $ : $,
                url : options.url
            };
            callback(null,window);
         }
      }else{
         if(res && res.statusCode >= 500 && retry > 0){
            getRequest();
            retry--;
         }else if(!body && !err){
            var err = new ScrapinodeError('HTTP body is empty.');
            callback(err,null);
         }else{
            var err = err || new ScrapinodeError('HTTP status code:' + res.statusCode);
            callback(err,null);
         }
      }
   };

}
*/
