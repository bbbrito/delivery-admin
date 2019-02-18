(function() {
  'use strict';

  angular
    .module('app.couriers')
    .controller('CourierController', CourierController);


  /*@ngInject*/
  function CourierController($state, RestService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'couriers';

    vm.data = {};
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

          NotificationService.success({ title: 'courier', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.data = response.data;
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
