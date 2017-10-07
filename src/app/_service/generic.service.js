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
        'Carlos',
        'William',
        'Juliana'
      ]
    };

    return service;
  };

})();
