/**
 * Module dependencies
 */

var util = require('util');

/**
 * Expose `ScrapinodeError`
 */

module.exports = ScrapinodeError;

/**
 * Create a new `ScrapinodeError`
 *
 * @constructor
 * @inherit {Error}
 * @api private
 */

function ScrapinodeError(message){
   Error.call(this);
   Error.captureStackTrace(this,arguments.callee);
   this.name = 'ScrapinodeError';
   this.message = message;
}

util.inherits(ScrapinodeError,Error);