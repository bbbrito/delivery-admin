(function() {
  'use strict';

  angular
    .module('app.generic')
    .controller('GenericListController', GenericListController);


  /*@ngInject*/
  function GenericListController($state, $window, vm, service, NotificationService) {
    vm.q = $state.params.q;

    vm.remove = remove;

    _fetch({ q: vm.q, page: $state.params.page, size: $state.params.size });

    /**
     * private
     */
    function _fetch(query) {
      service.list(query)
        .then(function(response) {
          vm.data = response.data;
        })
        .catch(NotificationService.error);
    }

    function remove($event, data) {
      $event.stopPropagation();

      if(!$window.confirm('Deseja excluir?')) {
        return false;
      }

      service.remove(data._id)
        .then(_fetch)
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
