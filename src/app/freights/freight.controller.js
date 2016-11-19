(function() {
  'use strict';

  angular
    .module('app.freights')
    .controller('FreightController', FreightController);


  /*@ngInject*/
  function FreightController($state, RestService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'freights';

    vm.freight = {};
    vm.save = save;

    if (id) {
      _byId(id)
    }

    function save(data) {
      RestService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'freight', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.freight = response.data;
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
