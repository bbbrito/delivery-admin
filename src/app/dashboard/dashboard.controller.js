(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

    /*@ngInject*/
    function DashboardController($rootScope, HTTPService) {
      var vm = this;

      HTTPService.get('/api/reports/sales')
        .then(function(response) {

          vm.series = ['Total'];

          vm.labels = response.data.map(function(i){
            return i._id.replace(/([^T]+).*/, '$1')
          });

          vm.data = response.data.map(function(i){
            return i.paymentTotal
          });

          console.log(vm.data, vm.labels, response.data);
        })

      return vm;
    }

})();
