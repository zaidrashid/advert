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
            $ctrl.$onChanges = function() {
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

                var options = chartData.configuration.options;
                var Chart = chartFactory.getChart(chartData.type);
                var chart = new Chart('.ct-chart', {
                    series: configuration.data,
                    labels: configuration.labels
                }, options);


                var seq = 0;
                var delays1percent = 1.1;
                var durations = 100;

                // reset
                chart.on('created', function() {
                    seq = 0;
                });
                chart.on('draw', function(data) {
                    seq++;
                    switch (data.type) {
                        case 'line':
                            data.element.animate({
                                opacity: {
                                    begin: seq * 1.2,
                                    dur: durations,
                                    from: 0,
                                    to: 1
                                }
                            });
                            break;
                        case 'point':
                            data.element.animate({
                                x1: {
                                    begin: seq * delays1percent,
                                    dur: durations,
                                    from: data.x - 10,
                                    to: data.x,
                                    easing: 'easeOutQuart'
                                },
                                x2: {
                                    begin: seq * delays1percent,
                                    dur: durations,
                                    from: data.x - 10,
                                    to: data.x,
                                    easing: 'easeOutQuart'
                                },
                                opacity: {
                                    begin: seq * delays1percent,
                                    dur: durations,
                                    from: 0,
                                    to: 1,
                                    easing: 'easeOutQuart'
                                }
                            });
                            break;
                    }
                });
            }
        }
    });
})(window.angular);
