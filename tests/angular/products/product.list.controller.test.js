'use strict';

describe('product.list.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $httpBackend, $controller;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
  }));

  it('#init', function() {
    var stateMock = {
      params: { q: 'some search' }
    };

    $httpBackend
      .when('GET', '/api/products?q=some+search')
      .respond(200, {});


    var controller = $controller('ProductListController', { $scope: $scope, $state: stateMock });
    $httpBackend.flush();
    expect(controller).toBeDefined();
    expect(controller.q).toBe('some search');
  });

  it('#remove not confirmed should do nothing', function() {
    $httpBackend
      .when('GET', '/api/products')
      .respond(200, {});

    var controller = $controller('ProductListController', { $scope: $scope });
    var result = controller.remove(EVENT);
    $httpBackend.flush();

    expect(result).toBe(false);
  });

  it('#remove', function() {
    $httpBackend
      .when('GET', /\/api\/products/)
      .respond(200, { items: [PRODUCT] });
    $httpBackend
      .when('DELETE', '/api/products/42')
      .respond(204, '');

    var $windowMock = {
      confirm: function() { return true }
    };

    var controller = $controller('ProductListController', { $scope: $scope, $window: $windowMock });
    var result = controller.remove(EVENT, { _id: 42 });
    $httpBackend.flush();

    expect(controller.data.items[0]).toEqual(PRODUCT);
  });
}); //describe
