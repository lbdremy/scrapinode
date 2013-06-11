/**
 * Modules dependencies
 */

var jsdom = require('jsdom'),
    cheerio = require('cheerio'),
    request = new require('superagent').agent(),
    fs = require('fs'),
    ScrapinodeError = require('./error/scrapinode-error'),
    HTTPError = require('httperror');

/**
 * jQuery dependencies
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
 * @api private
 */

exports.load = function(options,callback){

    if(options.html){
        return process.nextTick(function(){
            buildDOM(options.html,options.engine,options.url,callback);
        });
    }

    getRequest(options,function(err,body){
        if(err) return callback(err);
        buildDOM(body,options.engine,options.url,callback);
    });
};

/**
 * Send an HTTP GET request to `options.url`
 *
 * @param {Object} options - configuration of the HTTP GET request
 * @param {String} options.headers - set of headers
 * @param {Number} options.timeout - timeout
 * @param {Number} options.redirects - number of times the request will follow redirection instructions
 * @param {Number} options.retries - number of times the request will be resend if the request failed
 * @param {Function} callback -
 * @api private
 */

function getRequest(options,callback){
    var destroyed = false;
    var req = request.get(options.url)
        .set(options.headers)
        .timeout(options.timeout)
        .redirects(options.redirects)
        .buffer(false)
        .end(function(err,res){
            if(err) return onError(err);

            // Check HTTP status code
            var isHTTPError = isRedirect(res.status) || isClientError(res.status) || isServerError(res.status);
            if(isHTTPError) return onError(new HTTPError(res.status));

            // Attach event handlers and build the body
            var body = '';
            res.on('data',function(chunk){
                body += chunk;
            });
            res.on('end',function(){
                if(destroyed) return;
                // Check if a HTTP refresh/redirection is present into the HTML page, if yes refreshes/redirects.
                var matches = body.match(/<meta[ ]*http-equiv="REFRESH"[ ]*content="[0-9]{1,};[ ]*URL=(.*?)"[ ]*\/?>/i);
                if(matches && matches[1]){
                    options.url = matches[1];
                    return getRequest(options,callback);
                }
                callback(null,body);
            });
            res.on('error',onError);

            // Check if content-type is an image, if yes destroy the response and build a HTML page with the image in it
            if(isImage(res.headers)){
                res.destroy();
                destroyed = true;
                body = '<!DOCTYPE html><html><head></head><body><img src="' + options.url + '" /></body></html>';
                return callback(null,body);
            }
        });

    // Error event handler
    function onError(err){
        if(options.retries--) return getRequest(options,callback);
        callback(err);
    }
}

/**
 * Build a DOM representation of the given HTML `body`
 *
 * @param {String} body - html page
 * @param {String} engine - name of the engine used to generate the DOM
 * @param {String} url - url of the page containing the given `body`
 * @param {Function} callback -
 * @api private
 */

function buildDOM(body,engine,url,callback){
    if(!body){
        return callback(new ScrapinodeError('The HTTP response contains an empty body: "' + body +'"'));
    }

    if(engine === 'jsdom'){
        try{
            jsdom.env({
               html: body,
               src : [jquery],
               done : function(err,window){
                   if(err) return callback(err);
                   if(!window) return callback(new ScrapinodeError('The "window" provides by JSDOM is falsy: ' + window));
                   window.location.href = url;
                   callback(err,window);
                   window.close();
               }
            });
        }catch(err){
            callback(err);
        }
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

/**
 * Check if the `code` is a HTTP redirection status.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */

function isRedirect(code) {
  return (code >= 300 && code < 399);
}

/**
 * Check if the `code` is a HTTP client error status.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */

function isClientError(code){
    return (code >= 400 && code < 499);
}

/**
 * Check if the `code` is a HTTP server error status.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */

function isServerError(code){
    return (code >= 500 && code < 599);
}

/**
 * Check if the content of the HTTP body is an image
 *
 * @param {Object} headers -
 * @return {Boolean}
 * @api private
 */

function isImage(headers){
    var regexImage = /image\//i;
    var contentType = headers ?  headers['content-type'] : '';
    return regexImage.test(contentType);
}