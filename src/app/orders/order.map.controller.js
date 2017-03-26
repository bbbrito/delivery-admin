(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderMapController', OrderMapController);


  /*@ngInject*/
  function OrderMapController($state, OrderService, MapService) {
    var vm = this;

    vm.googleMapsUrl = MapService.googleMapsUrl;
    vm.zoom = MapService.zoom;
    vm.organization = MapService.organization;
    vm.center = MapService.organization.location;
    vm.shape = MapService.shape;

    OrderService.list({ location: true, size: $state.params.size || 10 })
      .then(function(response) {
        var data = response.data;

        vm.markers = (data.items || [])
          .filter(function(item) {
            return item.shippingAddress.location;
          })
          .map(function(item) {
            return {
              label: item.customer.givenName,
              position: [item.shippingAddress.location.lat, item.shippingAddress.location.lng]
            }
          });
      });

    return vm;
  }

})();
