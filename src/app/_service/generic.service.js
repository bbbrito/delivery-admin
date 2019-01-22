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
        'Hercules',
        'Lucas',
        'Rene',
        'Carlos',
        'William'
      ]
    };

    return service;
  };

})();
