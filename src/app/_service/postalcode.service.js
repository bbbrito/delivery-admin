(function() {
  'use strict';

  angular
  .module('app')
  .factory('PostalCodeService', PostalCodeService);

  /*@ngInject*/
  function PostalCodeService(HTTPService, $q) {
    var service = {
      findReferencePoint: function(shippingAddress) {
        var params = {
          postalCode: shippingAddress.postalCode,
          number: shippingAddress.number
        };
        return HTTPService.get('/api/postalcodes/referencePoint', params, { cache: true });
      },
      findByPostalCode: function(postalCode) {
        return HTTPService.get('/api/postalcodes/' + postalCode, {}, { cache: true });
      },

      getLocation: function(shippingAddress) {
        if (Object.keys(shippingAddress).length < 3) {
          return $q.reject();
        }

        var GMAPS_API = 'https://maps.google.com/maps/api/geocode/json?address=';
        var address = shippingAddress.streetAddress + ',' + shippingAddress.district + ',' + shippingAddress.number;

        return HTTPService
          .get(GMAPS_API + address + '&sensor=true', {}, { cache: true })
          .then(HTTPService.handleError)
          .then(function(response) {
            var data = response.data;
            return data.results[0] && data.results[0].geometry.location;
          });
      }
    };

    return service;
  };

})();
