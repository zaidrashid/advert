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
                $ctrl.advertisers = data;
                var param = $location.search();

                if (!param || !param.id) {
                    return;
                }
                $ctrl.selected = param.id;
            });

            $ctrl.onSelect = function(s) {
                $ctrl.onAdvertiserChange({id: s});
            };

            $ctrl.onReset = function() {
                $location.path('/');
                $ctrl.selected = undefined;
            };
        }
    });
})(window.angular);
