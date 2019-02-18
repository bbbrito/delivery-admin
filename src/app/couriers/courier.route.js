(function() {
  'use strict';

  angular
    .module('app.couriers')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.couriers', {
      url: '/couriers?q?page?',
      controller: 'CourierListController',
      controllerAs: 'vm',
      templateUrl: '/couriers/list.html',
      data : {
        title: 'Lista de Entregadores'
      }
    })
    .state('app.courier', {
      url: '/courier/:id?',
      controller: 'CourierController',
      controllerAs: 'vm',
      templateUrl: '/couriers/form.html',
      data : {
        title: 'Cadastro de Entregador'
      }
    });
  }
}());
