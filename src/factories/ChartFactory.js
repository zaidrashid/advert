(function($angular) {
    $angular.module('dashboard').factory('chartFactory', function(
        CHART_TYPE
    ) {
        function getChart(type) {
            var chart;
            switch (type) {
                case CHART_TYPE.PIE:
                    chart = Chartist.Pie;
                    break;
                case CHART_TYPE.LINE:
                    chart = Chartist.Line;
                    break;
            }

            return chart;
        }

        return {
            getChart: getChart
        };
    });
})(window.angular);
