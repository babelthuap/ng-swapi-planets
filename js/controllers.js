'use strict';

var swapiApp = angular.module('swapiApp');

swapiApp.controller('PlanetsCtrl', ['dataSvc', function(dataSvc) {
  this.planets = dataSvc.planets;

  if (this.planets.length === 0) {
    let getPlanets = dataSvc.getPlanets();
    getPlanets.then(
      pages => {
        let arr = pages.reduce(function(a, b) {
          return a.concat( b.data.results );
        }, []); 

        this.planets = arr;
        dataSvc.planets = arr;

        window.location.replace('#');
      },
      err => console.error(err)
    );
  }

  this.residentName = dataSvc.residentName;

  this.extractId = url => url.split('/').slice(-2)[0];
}]);


swapiApp.controller('ResidentCtrl', ['$stateParams', 'dataSvc', function($stateParams, dataSvc) {
  this.id = $stateParams.id;
  this.residents = dataSvc.residents;

  if (this.residents[this.id]) {
    this.character = this.residents[this.id];
  } else {
    let getCharacter = dataSvc.getCharacter(this.id);
    getCharacter.then(res => {
      this.character = res.data;
      this.residents[this.id] = res.data;
    },
    err => console.error(err));
  }
}]);
