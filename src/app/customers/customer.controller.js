(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerController', CustomerController);


  /*@ngInject*/
  function CustomerController($state, RestService, PostalCodeService, NotificationService, CustomerService, OrderService, ProductService, HTTPService, $window) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'customers';

    vm.customer = {
      address: { addressRegion: 'SP' }
    };
    vm.saveCustomer = saveCustomer;
    vm.saveOrder = saveOrder;
    vm.findByPostalCode = findByPostalCode;
    vm.findReferencePoint = findReferencePoint;
    vm.changePaymentType = changePaymentType;

    vm.dateOptions = CustomerService.getDateOptions();
    vm.deliveryDateOptions = OrderService.getDateOptions();

    if (id) {
      _byId(id)
        .then(function(customer) {
          if (!customer || !customer.address) {
            return false;
          }

          var locality = _concatLocality(customer.address);
          _fetchFreight(locality)
        });
    }
    _fetchProducts();
    vm.order = {
      delivery: OrderService.getDeliveryTime()
    }

    function saveCustomer(customer) {
      RestService.save(customer)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'customer', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    function saveOrder(customer, order, items, gifts) {
      OrderService.createOrder(customer, order, items, gifts)
        .then(function(response) {
          var data = response.data;

          NotificationService.success({ title: 'order', message: 'form.saved' });

          $window.print();
        })
        .catch(NotificationService.error);
    }
    function changePaymentType(payment) {
      if (payment.type === 'MONEY') {
        payment.moneyTotal = payment.total;
      } else {
        payment.moneyTotal = 0;
        payment.change = 0;
      }
    }
    function findReferencePoint(shippingAddress) {
      if (!shippingAddress.postalCode || shippingAddress.postalCode.length < 8 || !shippingAddress.number) {
        return false;
      }
      PostalCodeService.getLocation(shippingAddress)
        .then(function(location) {
          vm.customer.address.location = location;
        });

      PostalCodeService.findReferencePoint(shippingAddress)
        .then(function(response) {
          var data = response.data;
          vm.customer.address = vm.customer.address || {};
          vm.customer.address.referencePoint = data.referencePoint;
        })
    }

    function findByPostalCode(postalCode) {
      if (!postalCode || postalCode.length < 8) {
        vm.disableAddressFields = false;
        return false;
      }
      PostalCodeService.findByPostalCode(postalCode)
        .then(function(response) {
          var data = response.data;

          vm.customer.address = angular.extend(vm.customer.address, data);
          vm.customer.address.postalCode = postalCode;
          vm.disableAddressFields = !!data.streetAddress;

          return vm.customer.address;
        })
        .then(function(address) {
          _fetchFreight(_concatLocality(address))
        })
        .catch(function() {
          vm.disableAddressFields = false;
        });
    }
    /**
     * private
     */
    function _concatLocality(address) {
      var result = []

      if (address.addressLocality)
        result = result.concat(address.addressLocality)
      if (address.district)
        result = result.concat(address.district);

      return result.join(',');
    }

    function _byId(id) {
      return RestService.byId(id)
        .then(function(response) {
          vm.customer = response.data;
          vm.customer.birthDate = CustomerService.normalizeBirthDate(vm.customer.birthDate);
          vm.disableAddressFields = !!(vm.customer.address && vm.customer.address.streetAddress);

          return vm.customer;
        })
        .catch(NotificationService.error);
    }

    function _fetchProducts() {
      return ProductService.list({ attr: 'items', size: 30 })
        .then(function(response) {
          var data = response.data;
          vm.items = data;
          vm.gifts = angular.copy(data);
        })
        .catch(NotificationService.error)
    }

    function _fetchFreight(locality) {
      if (!locality) {
        return false;
      }

      return HTTPService.get('/api/freights/search', { locality: locality })
        .then(HTTPService.handleError)
        .then(function(response) {
          var data = response.data;

          vm.order.delivery.price = data.price;
        });
    }

    return vm;
  }

})();
