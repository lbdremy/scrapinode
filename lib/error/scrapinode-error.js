/**
 * Expose `ScrapinodeError`
 */
 
module.exports = ScrapinodeError;

/**
 * Create a new `ScrapinodeError`
 * @constructor
 * 
 * @return {ScrapinodeError}
 * @api private
 */
 
function ScrapinodeError(message){
   Error.call(this);
   Error.captureStackTrace(this,arguments.callee);
   this.name = 'ScrapinodeError';
   this.message = message;
}

ScrapinodeError.prototype.__proto__ = Error.prototype;