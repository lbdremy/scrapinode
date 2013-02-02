/**
 * Module dependencies
 */

var url = require('url'),
   domains = require('./domains');

/**
 * Expose all `utils`
 */

exports.isURL = isURL;
exports.toURL = toURL;
exports.inline = inline;
exports.getWebsiteName = getWebsiteName;

/**
 *
 * @param {String} path -
 *
 * @return {Boolean}
 */

function isURL(path) {
   var regex = /(https?:)?\/\/([\-\w\.]+)+/i;
   return regex.test(path);
}

/**
 *
 * @param {String} path -
 * @param {String} uri -
 *
 * @return {String}
 * @api private
 */

function toURL(path,uri){
   var absolutePath = path;
   if(!isURL(path)){
      var explodeURL = url.parse(uri);
      // 2 cases: absolute path and relative path to the current pathname
      if( path.charAt(0) === '/'){
         absolutePath = explodeURL.protocol + '//' + explodeURL.host + path;
      }else{
         var explodePathname = explodeURL.pathname.split('/');
         var pathname = explodePathname.slice(0,explodePathname.length - 1).join('/');
         absolutePath = explodeURL.protocol + '//' + (explodeURL.host + '/' +pathname + '/' + path).replace('\/\/','/','g');
      }
   }
   return absolutePath;
}

/**
 * Inline the text without /n and ' ' (space)
 *
 * @param {String} text -
 *
 * @return {String}
 * @api private
 */

function inline(text){
   var explode = text.split('\n').join('').split(' ');
   var size = explode.length;
   for(var i=0; i < size ; i++){
      if(!explode[i]){
         explode.splice(i,1);
         i--;
         size--;
      }
   }
   return explode.join(' ').trim();
}



/**
 * Get the name of the website from an uri
 *
 * @param {String} uri
 *
 * @return {String} - name of the website
 */

function getWebsiteName(uri){
   var hostname = url.parse(uri).hostname;
   var name = '';
   if(hostname){
      var subdomains = domains;
      var components = hostname.split('.');
      for(var i = components.length -1 ; i >=  0; i-- ){
         if(subdomains[components[i]]){
            subdomains = subdomains[components[i]];
         }else{
            name = components[i];
            break;
         }
      }
   }
   return name;
}