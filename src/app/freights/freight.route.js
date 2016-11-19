(function() {
  'use strict';

  angular
    .module('app.freights')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.freights', {
      url: '/freights?q?page?',
      controller: 'FreightListController',
      controllerAs: 'vm',
      templateUrl: '/freights/list.html',
      data : {
        title: 'Valores de Frete'
      }
    })
    .state('app.freight', {
      url: '/freight/:id?',
      controller: 'FreightController',
      controllerAs: 'vm',
      templateUrl: '/freights/form.html',
      data : {
        title: 'Cadastro de Frete'
      }
    });
  }
}());
