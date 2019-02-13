(function($angular) {
    $angular.module('dashboard').controller('mainController', function(
        $scope,
        $state,
        $location
        ) {
            $scope.onAdvertiserChange = function(advertiserId) {
                console.log(advertiserId);
                // $state.href('campaign', {id: advertiserId});
                $location.path('/campaign').search({id: advertiserId});
            };
    });
})(window.angular);
