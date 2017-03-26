'use strict';

describe('dashboard.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $httpBackend, $controller;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  it('#init', function() {
    $httpBackend.when('GET', '/api/reports/sales').respond(200, [SALES_REPORT]);
    $httpBackend.when('GET', '/api/reports/total').respond(200, TOTAL_REPORT);
    $httpBackend.when('GET', '/api/reports/byProduct').respond(200, []);
    var controller = $controller('DashboardController', { $scope: $scope });

    $httpBackend.flush();

    expect(controller).toBeDefined();
    expect(controller.data).toEqual([[10],[2]]);
    expect(controller.labels).toEqual(['2016-11-19']);
    expect(controller.series).toEqual(['Valor','Pedidos']);
  });
}); //describe
