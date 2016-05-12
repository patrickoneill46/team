angular.module('teamApp').directive('player', function() {

  return {
    restrict: 'E',
    templateUrl: "views/player-list-item.html",
    require: '^ngModel',
    controller: function($scope) {
      console.log($scope);
    }
  }
});
