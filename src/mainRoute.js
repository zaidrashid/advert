(function($angular) {
    $angular.module('dashboard').config(function(
        $stateProvider,
        $urlRouterProvider
    ) {
        $urlRouterProvider.otherwise('/campaign');
        $stateProvider.state('table', {
            name: 'table',
            url: '/table',
            templateUrl: 'views/table.html',
        }).state('campaign', {
            name: 'campaign',
            url: '/campaign',
            templateUrl: 'views/campaign.html',
        });
    });
})(window.angular);
