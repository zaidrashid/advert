(function($angular) {
    $angular.module('dashboard').controller('campaignController', function(
        $scope,
        $filter,
        dataService,
        $location,
        $state,
        CHART_TYPE
    ) {
        $scope.startupMessage = 'Please select an advertiser';
        $scope.advertiserName;
        $scope.campaignsData;
        $scope.chartData;
        $scope.reportsData;

        $scope.$on('$locationChangeSuccess', function updatePage() {
            updateData();
        });

        updateData();
        function updateData() {
            var param = $location.search();
            if (!param || !param.id) {
                resetData();
                return;
            }

            refreshData(parseInt(param.id, 10));
        }

        $scope.onRowSelection = function(entity) {
            dataService.getReportData(entity.id).then(function(reports) {
                $scope.reportsData = {
                    tableData: reports,
                    title: 'Reports for ' + entity.name
                };
                $scope.chartData = {
                    configuration: generateReportChart(reports),
                    type: CHART_TYPE.LINE
                };
            });
        };

        function refreshData(advertiserId) {
            resetData();
            dataService.getAdvertiserData(advertiserId).then(function(data) {
                var advertiser = data[0];
                $scope.advertiserName = advertiser.name;
            });

            dataService.getCampaignData(advertiserId).then(function(campaigns) {
                
                $scope.campaignsData = {
                    tableData: campaigns,
                    title: 'Campaign data for ' + $scope.advertiserName
                };
                $scope.chartData = {
                    configuration: generateCampaignChart(campaigns),
                    type: CHART_TYPE.PIE
                };
            });
        }

        function generateCampaignChart(rawData) {
            var perClick = $filter('filter')(rawData, {cost_model: 'per_click'});
            var perInstall = $filter('filter')(rawData, {cost_model: 'per_install'});
            var perImpression = $filter('filter')(rawData, {cost_model: 'per_impression'});

            var labels = [];
            var data = [];
            if (perClick.length) {
                labels.push('Click');
                data.push({meta: 'Per click', value: perClick.length});
            }

            if (perInstall.length) {
                labels.push('Install');
                data.push({meta: 'Per Install', value: perInstall.length});
            }

            if (perImpression.length) {
                labels.push('Impression');
                data.push({meta: 'Per Impression', value: perImpression.length});
            }

            return {
                data: data,
                labels: labels,
                options: {
                    showLabel: true,
                    plugins: [
                        Chartist.plugins.tooltip()
                    ]
                },
            };
        }

        function generateReportChart(rawData) {
            var clicks = [];
            var impressions = [];
            var installs = [];
            var labels = [];

            for (var i = 0; i < rawData.length; i++) {
                var dataSet = rawData[i];
                clicks.push({meta: 'Clicks on ' + dataSet.date, value: dataSet.clicks});
                impressions.push({meta: 'Impressions on ' + dataSet.date, value: dataSet.impressions});
                installs.push({meta: 'Installs on ' + dataSet.date, value: dataSet.installs});
                labels.push(dataSet.date);
            }

            return {
                labels: labels,
                data: [
                    clicks, impressions, installs
                ],
                options: {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    lineSmooth: false,
                    plugins: [
                        Chartist.plugins.tooltip()
                    ]
                }
            };
        }

        function resetData() {
            $scope.campaignsData = undefined;
            $scope.advertiserName = undefined;
            $scope.chartData = undefined;
            $scope.reportsData = undefined;
        }
    });
})(window.angular);
