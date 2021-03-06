'use strict';

var swapiApp = angular.module('swapiApp');

swapiApp.service('dataSvc', ['$http', function($http) {
  const NUM_PAGES = 7;

  this.planets = [];
  this.residents = {};

  this.getPlanets = function() {
    let pages = [];
    for (let i = 1; i <= NUM_PAGES; i++) {
      pages.push( $http.get('http://swapi.co/api/planets/?format=json&page=' + i) );
    }
    return Promise.all(pages);
  }

  this.getCharacter = function(id) {
    return $http.get('http://swapi.co/api/people/' + id + '/?format=json');
  }

  this.residentName = (id, i) => {
    return this.residents[id] ? this.residents[id].name : 'resident ' + i;
  }
}]);
