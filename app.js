'use strict';

angular.module('swapiApp', ["ui.router"])
.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

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
  }
]);
