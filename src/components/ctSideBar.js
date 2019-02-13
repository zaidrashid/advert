(function($angular) {
    $angular.module('dashboard').component('ctSideBar', {
        bindings: {
            onAdvertiserChange: '&'
        },
        templateUrl: 'components/ctSideBar.html',
        controller: function(
            dataService,
            $location
        ) {
            var $ctrl = this;
            dataService.getAdvertiserData().then(function(data) {
                console.log(data);
                $ctrl.advertisers = data;
            });

            $ctrl.onSelect = function(s) {
                console.log('select', s);
                $ctrl.onAdvertiserChange({id:s});
            };

            $ctrl.onReset = function() {
                $location.path('/');
            };
        }
    });
})(window.angular);
