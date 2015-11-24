var swapiApp = angular.module('swapiApp');

swapiApp.controller('PlanetsCtrl', ['$http', function($http) {
  $http.get('http://swapi.co/api/planets/?format=json')
  .then(res => this.list = res.data.results,
        err => console.log('GET ERROR:', err));

  this.extractId = url => url.split('/').slice(-2)[0];
}]);

swapiApp.controller('ResidentCtrl', ['$state', '$stateParams', 'residentSvc',
  function($state, $stateParams, residentSvc) {
    this.id = $stateParams.id;
    this.residents = residentSvc.residents;

    if (this.residents[this.id]) {
      this.character = this.residents[this.id];
    } else {
      var getCharacter = residentSvc.getCharacter(this.id);

      getCharacter.then(res => {
                          this.character = res.data;
                          this.residents[this.id] = res.data;
                        },
                        err => console.log('GET ERROR:', err));
    }
  }
]);
