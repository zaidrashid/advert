(function($angular) {
    $angular.module('dashboard').controller('mainController', function(
        $scope,
        $location
        ) {
            $scope.onAdvertiserChange = function(advertiserId) {
                $location.path('/campaign').search({id: advertiserId});
            };
    });
})(window.angular);
