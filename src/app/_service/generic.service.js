(function() {
  'use strict';

  angular
    .module('app.generic')
    .factory('GenericService', GenericService);

  /*@ngInject*/
  function GenericService() {
    var service = {
      couriers: [
        'Hercules',
        'Lucas',
        'Carlos',
        'William',
        'Catarina'
      ]
    };

    return service;
  };

})();
