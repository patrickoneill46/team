describe('Fixture Controller', function() {

  beforeEach(module('teamApp'));

  var $controller,
    $routeParams,
    fixtureId = 'testFixture',
    mockFixtureService,
    mockPlayerService,
    mockTeamService,
    fixture = {
        _id: "571cd62f1b7e302f0d715d9c",
        date: "2016-04-13T23:00:00.000Z",
        kickoff: "2016-04-06T23:00:00.000Z",
        location: "sadsa",
        mapsLink: "asdsad",
        meetTime: null,
        description: "test description wmsad asdasd",
        teamId: "571bee3e6b79d37203d01637",
        opposition: "Kilburn RFC",
        squad: [],
        teamName:"First Team"
    };

  beforeEach(inject(function (_$controller_, _$routeParams_) {
    $controller = _$controller_;
    $routeParams = _$routeParams_;
    $routeParams.fixtureId = fixtureId;
    mockFixtureService = {
        getOne: function(params, cb) {
            fixture._id = params.fixtureId;
            cb({fixture: fixture});
        },
        updateSelection: function(params, selection, cb) {
            cb({fixture: fixture})
        },
        updateFixture: function(params, selection, cb) {
            cb({fixture: fixture})
        },
    };
    sinon.spy(mockFixtureService, 'getOne');
    sinon.spy(mockFixtureService, 'updateSelection');
    sinon.spy(mockFixtureService, 'updateFixture');

  }));

    it('name is Fixture', function() {

        var $scope = {};
        controller = $controller('FixtureCtrl', {
            $scope: $scope,
            $routeParams: $routeParams,
            fixturesService: mockFixtureService
        });

        chai.assert.equal($scope.name, 'Fixture');
    });

    it('gets fixture details', function () {

        var $scope = {};
        controller = $controller('FixtureCtrl', {
            $scope: $scope,
            fixturesService: mockFixtureService
        });

        sinon.assert.called(mockFixtureService.getOne);
        sinon.assert.calledWith(mockFixtureService.getOne, {fixtureId: fixtureId}, sinon.match.func);
        chai.assert.equal($scope.fixture._id, fixture._id);
    });

    it('calls the update selection service when saving a team selection', function() {

        var selectedPlayers = ['player 1', 'player 2'];
        var $scope = {};
        controller = $controller('FixtureCtrl', {
            $scope: $scope,
            $routeParams: $routeParams,
            fixturesService: mockFixtureService
        });
        $scope.selectionChanged = true;
        $scope.selectedPlayers = selectedPlayers;
        $scope.updateSelection();
        sinon.assert.calledWith(mockFixtureService.updateSelection, {fixtureId: fixtureId}, {selection: selectedPlayers}, sinon.match.func);
    });

    it('calls the update fixture service when updating fixture details', function() {

        var $scope = {};
        controller = $controller('FixtureCtrl', {
            $scope: $scope,
            $routeParams: $routeParams,
            fixturesService: mockFixtureService
        });

        $scope.updateFixture();
        sinon.assert.calledWith(mockFixtureService.updateFixture, {fixtureId: fixtureId}, sinon.match.object, sinon.match.func);
    });
});