(function($angular) {
    $angular.module('dashboard').controller('mainController', function(
        $scope,
        $location
        ) {
            $scope.onAdvertiserChange = function(advertiserId) {
                console.log('location change');
                $location.path('/campaign').search({id: advertiserId});
            };
    });
})(window.angular);
