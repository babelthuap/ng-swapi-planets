'use strict';

var swapiApp = angular.module('swapiApp');

swapiApp.service('residentSvc', ['$http', function($http) {
  this.residents = {};

  this.getCharacter = function(id) {
    return $http.get('http://swapi.co/api/people/' + id + '/?format=json');
  }
}]);
