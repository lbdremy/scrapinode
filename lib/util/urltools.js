// Dependencies
var url = require('url'),
    fs = require('fs');

// Domain tree
var domains = JSON.parse(
   fs.readFileSync( __dirname + '/domains.json')
);

// Expose
exports.webname = extractWebname ;
exports.extension = extractExtension;
exports.toURL = toURL;
exports.isURL = isURL;
exports.parse = url.parse;

/**
 * Extract the name of the website from an uri
 * 
 * @param {String} uri
 *
 * @return {String} - name of the website
 */
 
function extractWebname(uri){   
   var hostname = url.parse(uri).hostname;
   if(hostname){
      var subdomains = domains; 
      var components = hostname.split('.');
      for(var i = components.length -1 ; i >=  0; i-- ){
         if(subdomains[components[i]]){
            subdomains = subdomains[components[i]]
         }else{
            var name = components[i];
            break;
         }
      }
   }
   return name || '';
}

function extractExtension(uri){
   var pathname = url.parse(uri).pathname;
   if(pathname){
      var explode = pathname.split('.');
      var extension = explode[explode.length - 1].toLowerCase();
   }
   return extension || '';
}

/**
 * Check if the path is accessible through the network. A path is considered accessible through the network if it begin by // or http:// or https:// equivalent to [protocol://] below.
 * and verified current pattern of an url [protocol://][hostname].[domain]
 * 
 * @param {String} - path
 *
 * @return {Boolean}
 */
 
function isURL(path) {
   var regex = /(https?:)?\/\/([-\w\.]+)+/i;
   var absolute = regex.test(path) ? true : false;
   return absolute;
}

function toURL(path,uri){
   var absolutePath = path;
   if(!isURL(path)){
      var explodeURL = url.parse(uri);
      // 2 cases: absolute path and relative path to the current pathname
      if( path.charAt(0) === '/'){
         absolutePath = explodeURL.protocol + '//' + explodeURL.host + path;
      }else{
         var explodePathname = explodeURL.pathname.split('/')
         var pathname = explodePathname.slice(0,explodePathname.length - 1).join('/');
         absolutePath = explodeURL.protocol + '//' + (explodeURL.host + '/' +pathname + '/' + path).replace('\/\/','/','g');
      }
      
   }
   return absolutePath;
}
