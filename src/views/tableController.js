(function($angular) {
    $angular.module('dashboard').controller('tableController', function(
        $scope,
        dataService
    ) {
        dataService.getAllData().then(function(data) {
            $scope.advertisers = data.advertisers;
            $scope.campaigns = data.campaigns;
            $scope.reports = data.reports;
        });
    });
})(window.angular);
