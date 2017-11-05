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
        'Ronaldo',
        'Rafael',
        'Fernando',
        'Carlos',
        'William'
      ]
    };

    return service;
  };

})();
