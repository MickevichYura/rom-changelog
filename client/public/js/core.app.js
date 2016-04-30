var app = angular.module('coreApp', []);

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

app.controller('mainController', function ($scope, $location) {
    $scope.$watch(function () {
        return $location.path();
    }, function (state) {
        $scope.isRootPage = state === '';
    });
});

app.controller('dateController', function ($scope) {
    
});

app.controller('commitsController', function ($scope) {

});
