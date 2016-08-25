angular.module('teamApp').directive('player', function() {

  return {
    restrict: 'E',
    templateUrl: "views/player-list-item.html",
    require: '^ngModel',
    scope: {
      player: '='
    }
  }
});
