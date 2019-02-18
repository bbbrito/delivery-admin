(function() {
  'use strict';

  angular
    .module('app.couriers')
    .controller('CourierListController', CourierListController);


  /*@ngInject*/
  function CourierListController($state, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'couriers';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    return vm;
  }

})();
