'use strict';

var swapiApp = angular.module('swapiApp');

swapiApp.service('dataSvc', ['$http', function($http) {
  this.planets = [];
  this.residents = {};

  this.getPlanets = function() {
    return $http.get('http://swapi.co/api/planets/?format=json');
  }

  this.getCharacter = function(id) {
    return $http.get('http://swapi.co/api/people/' + id + '/?format=json');
  }
}]);
