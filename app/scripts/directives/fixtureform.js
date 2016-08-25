angular.module('teamApp').directive('fixtureForm', function() {

  return {
    restrict: 'E',
    templateUrl: "views/fixture-form.html",
    scope: {
      fixture: '=',
      teams: '=',
      onSubmit: '&',
      submitText: '@'
    },
    link: function(scope) {
        scope.submitText = scope.submitText || 'Submit';
    }
  }
});
