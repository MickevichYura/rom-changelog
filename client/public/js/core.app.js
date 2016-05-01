var app = angular.module('coreApp', ['ui.bootstrap.datetimepicker']);

app.controller('sidebarController', function ($scope, $http) {
    var url = '/devices';

    $scope.getDevices = function () {
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            $scope.devices = response.data.sort(function (device1, device2) {
                device1.codeName.localeCompare(device2.codeName);
            });
        });
    };
});

app.controller('mainController', function ($scope, $location, $http) {
    //Handle url changing
    $scope.$watch(function () {
        return $location.path();
    }, function (state) {
        $scope.isRootPage = state === '';
        $scope.getCommitsPackages();
    });

    //Set default date
    $scope.selectedDate = new Date();

    $scope.getCommitsPackages = function() {
        var codeName = $location.url().substr(1);
        var dateString = moment($scope.selectedDate).format('YYYY-MM-DD');

        if(codeName !== '') {
            var url = '/commits?codeName=' + codeName + '&date=' + dateString;

            $http({
                method: 'GET',
                url: url
            }).then(function (response) {
                $scope.commitsPackages = response.data;
                checkForChanges(response.data);
            });
        }
    };

    $scope.hasChanges = false;
    function checkForChanges(commitsPackages) {
        commitsPackages.forEach(function (commitPackage){
            if(commitPackage.commits !== undefined && commitPackage.commits.length !== 0) {
                $scope.hasChanges = true;
            }
        });
    }
});
