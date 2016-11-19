(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderController', OrderController);


  /*@ngInject*/
  function OrderController($state, $window, RestService, ProductService, NotificationService, CustomerService, OrderService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'orders';

    vm.order = {};
    vm.print = print;

    if (id) {
      _byId(id);
    }

    vm.dateOptions = OrderService.getDateOptions();

    function print() {
      $window.print();
    }
    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.order = response.data;

          if (vm.order.delivery && vm.order.delivery.date) {
            vm.order.delivery.date = OrderService.normalizeDeliveryDate(vm.order.delivery.date);
          }
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
