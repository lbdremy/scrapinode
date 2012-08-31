// Dependencies
var scrap = require('./helpers/scrap');


// Expose CultBeauty Extractors
module.exports = exports = [
   {
      route : 'price',
      operation : scrap('price')('.price-box>.regular-price>.price')
   },
   {
      route : 'currency',
      operation : scrap('currency')('.price-box>.regular-price>.price')
   },
   {
      route : 'description',
      operation : scrap('description')([ { path : '#tab-product-why-cult>div>div' }])
   }
];

