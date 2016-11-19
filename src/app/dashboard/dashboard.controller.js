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

          vm.series = ['Valor','Pedidos'];

          vm.labels = response.data.map(function(i){
            return i._id.replace(/([^T]+).*/, '$1')
          });

          vm.data = [];
          vm.data[0] = response.data.map(function(i){
            return i.paymentTotal
          });
          vm.data[1] = response.data.map(function(i){
            return i.count
          });
        });

      return vm;
    }

})();
