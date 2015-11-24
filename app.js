'use strict';

var swapiApp = angular.module('swapiApp', ["ui.router"])

swapiApp.controller('PlanetsCtrl', ['$http', function($http) {
  $http.get('http://swapi.co/api/planets/?format=json')
  .then(res => this.list = res.data.results,
        err => console.log('GET ERROR:', err));

  this.extractId = url => url.split('/').slice(-2)[0];
}]);

swapiApp.controller('ResidentCtrl', ['$state', '$stateParams', '$http', function($state, $stateParams, $http) {
  this.id = $stateParams.id;

  $http.get('http://swapi.co/api/people/' + this.id + '/?format=json')
  .then(res => this.character = res.data,
        err => console.log('GET ERROR:', err));
}]);

// swapiApp.service();

swapiApp.config(function($stateProvider, $urlRouterProvider) {
  
  // for any unmatched url, send to /planets
  $urlRouterProvider.otherwise("/planets")
  
  $stateProvider
    .state('planets', {
      url: "/planets",
      templateUrl: "templates/planets.html",
      controller: "PlanetsCtrl as p"
    })
    .state('resident', {
      url: "/resident/:id",
      templateUrl: 'templates/resident.html',
      controller: 'ResidentCtrl as r'
    })

})
