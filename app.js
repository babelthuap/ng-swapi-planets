'use strict';

var swapiApp = angular.module('swapiApp', ["ui.router"])

swapiApp.controller('IndexCtrl', function($state, $stateParams, $http) {
  this.id = $stateParams.id;

  $http.get('http://swapi.co/api/people/' + this.id + '/?format=json')
  .then(res => this.character = res.data,
        err => console.log('GET ERROR:', err));

  this.doSomething = function() {
    console.log('something');
    this.character.name += '+';
  }
});

swapiApp.controller('PlanetsCtrl', function($http) {
  $http.get('http://swapi.co/api/planets/?format=json')
  .then(res => this.list = res.data.results,
        err => console.log('GET ERROR:', err));

  this.extractId = url => url.split('/').slice(-2)[0];
});

swapiApp.controller('ResidentCtrl', function($state, $stateParams, $http) {
  this.id = $stateParams.id;

  $http.get('http://swapi.co/api/people/' + this.id + '/?format=json')
  .then(res => this.character = res.data,
        err => console.log('GET ERROR:', err));
});

// swapiApp.service();

swapiApp.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, send to /planets
  $urlRouterProvider.otherwise("/planets")
  
  $stateProvider
    .state('planets', {
      url: "/planets",
      templateUrl: "planets.html",
      controller: "PlanetsCtrl as p"
    })
    .state('resident', {
      url: "/resident/:id",
      templateUrl: 'resident.html',
      controller: 'ResidentCtrl as r'
    })

    .state('whocares', {
      url: "",
      template: "42"
    })
    .state('users', {
      url: "/user/:id",
      templateUrl: "42.html",
      controller: "IndexCtrl as i" // alias the controller
    })

    .state('route1', {
      url: "/route1",
      templateUrl: "route1.html"
    })
      .state('route1.list', {
        url: "/list",
        templateUrl: "route1.list.html",
        controller: function($scope) {
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })
      
    .state('route2', {
      url: "/route2",
      templateUrl: "route2.html"
    })
      .state('route2.list', {
        url: "/list",
        templateUrl: "route2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Different", "List"];
        }
      })
})
