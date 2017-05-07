(function() {
  'use strict';

  angular
    .module('app.generic')
    .factory('GenericService', GenericService);

  /*@ngInject*/
  function GenericService() {
    var service = {
      couriers: [
        'Eduardo',
        'Fernando',
        'Edson',
        'Carlos',
        'William',
        'Juliana'
      ]
    };

    return service;
  };

})();
