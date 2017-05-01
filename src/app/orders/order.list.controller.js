(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderListController', OrderListController);


  /*@ngInject*/
  function OrderListController($state, $controller, RestService, NotificationService) {
    var vm = this;


    vm.save = save;
    RestService.endpoint = 'orders';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    vm.couriers = [
      'Eduardo',
      'Edson',
      'Carlos',
      'William',
      'Juliana'
    ];

    function save(order, payed) {
      order.payment.payedAt = payed ? new Date() : null;

      RestService.save(order)
        .then(function(response) {
          var data = response.data;

          NotificationService.success({ title: 'order', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }


    return vm;
  }

})();
