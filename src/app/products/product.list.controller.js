(function() {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductListController', ProductListController);


  /*@ngInject*/
  function ProductListController($state, $window, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'products';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, $window: $window, service: RestService
      })
    );

    return vm;
  }

})();
