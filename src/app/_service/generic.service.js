(function() {
  'use strict';

  angular
    .module('app.generic')
    .factory('GenericService', GenericService);

  /*@ngInject*/
  function GenericService() {
    var service = {
      couriers: [
        'Daniel',
        'Rafael',
        'Rene',
        'Carlos',
        'William'
      ]
    };

    return service;
  };

})();
