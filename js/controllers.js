'use strict';

var swapiApp = angular.module('swapiApp');

swapiApp.controller('PlanetsCtrl', ['dataSvc', function(dataSvc) {
  this.planets = dataSvc.planets;

  if (this.planets.length === 0) {
    let getPlanets = dataSvc.getPlanets();
    getPlanets.then(pages => {
      // Here, I'm trying to fetch all the planet pages at once (using Promise.all
      // in dataSvc.getPlanets). The ajax calls work, but the view never updates. I
      // haven't been able to figure out why.

      // The deployed version, which only fetches the first page, works flawlessly:
      // this.planets = pages.data.results;
      // dataSvc.planets = pages.data.results;

      let arr = pages.reduce(function(a, b) {
        return a.concat( b.data.results );
      }, []); 

      this.planets = arr;
      dataSvc.planets = arr;

      // crap! this works, but it's a silly workaround
      window.location.replace('#');
    },
    err => console.error(err));
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
