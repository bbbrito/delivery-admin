(function() {
  'use strict';

  angular
    .module('app.orders')
    .factory('MapService', MapService);

  /*@ngInject*/
  function MapService() {
    var service = {
      googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB7BimdwO2vhjoXDyKWKkWyuzrQsA4TwgM',
      zoom: 15,
      organization: {
        location: '-23.6024185,-46.7881249',
        icon: '/assets/images/organization-marker-image.png'
      },
      shape: {
        coords: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
      },
      getMarker: function(label, location) {
        return {
          label: label,
          position: [location.lat, location.lng]
        }
      }
    };


    return service;
  };

})();
