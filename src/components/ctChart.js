(function($angular) {
    $angular.module('dashboard').component('ctChart', {
        bindings: {
            chartData: '<',
        },
        templateUrl: 'components/ctChart.html',
        controller: function(
            chartFactory
        ) {
            var $ctrl = this;
            $ctrl.$onChanges = function(changes) {
                updateChart($ctrl.chartData);
            };

            function updateChart(chartData) {
                if (!chartData || !chartData.type) {
                    return;
                }

                var configuration = chartData.configuration;
                if (!configuration.data || !configuration.labels) {
                    return;
                }

                var options = chartData.configuration.option;
                var Chart = chartFactory.getChart(chartData.type);
                new Chart('.ct-chart', {
                    series: configuration.data,
                    labels: configuration.labels
                }, options);
            }
        }
    });
})(window.angular);
