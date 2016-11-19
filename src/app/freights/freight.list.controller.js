(function() {
  'use strict';

  angular
    .module('app.freights')
    .controller('FreightListController', FreightListController);


  /*@ngInject*/
  function FreightListController($state, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'freights';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    return vm;
  }

})();
