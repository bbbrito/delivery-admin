(function() {
  'use strict';

  angular
    .module('app.generic')
    .factory('GenericService', GenericService);

  /*@ngInject*/
  function GenericService() {
    var service = {
      couriers: [
        'Ronaldo',
        'Fernando',
        'Edson',
        'Eduardo',
        'Carlos',
        'William',
        'Juliana'
      ]
    };

    return service;
  };

})();
