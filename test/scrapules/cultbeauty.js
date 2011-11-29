// Dependencies
var scrap = require('./helpers/scrap');


// Expose CultBeauty Extractors
module.exports = exports = [
   {
      route : 'price',
      operation : scrap('price')('p#price')
   },
   {
      route : 'currency',
      operation : scrap('currency')('p#price')
   },
   {
      route : 'description',
      operation : scrap('description')([ { path : '.product_text>#text_1>p', each : true }])
   }
];

