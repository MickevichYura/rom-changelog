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
        $scope.$emit('LOADING_STARTED');

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
                $scope.$emit('LOADING_FINISHED');
            });
        }
    };

    function checkForChanges(commitsPackages) {
        commitsPackages.forEach(function (commitPackage){
            $scope.hasChanges = commitPackage.commits !== undefined && commitPackage.commits.length !== 0;
        });
    }

    $scope.$on('LOADING_STARTED', function () {
        $scope.loading = true;
    });

    $scope.$on('LOADING_FINISHED', function () {
        $scope.loading = false;
    });

});

app.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        var result = '';

        var tokens = input.split(splitChar);
        if(splitIndex >= 0 && splitIndex < tokens.length) {
            result = tokens[splitIndex];
        }

        return result;
    }
});
