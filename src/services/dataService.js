(function($angular) {
    $angular.module('dashboard').service('dataService', function(
        $q,
        httpService,
        parserService,
        $filter
    ) {
        var _advertisers = [];
        var _campaigns;
        var _reports;
        var advertisersPromise = $q.defer();
        var campaignPromise = $q.defer();
        var reportsPromise = $q.defer();
        var promises = [
            advertisersPromise.promise,
            campaignPromise.promise,
            reportsPromise.promise
        ];

        this.getAllData = function() {
            var getAllDataPromise = $q.defer();
            $q.all(promises).then(function() {
                getAllDataPromise.resolve({
                    advertisers: _advertisers,
                    campaigns: _campaigns,
                    reports: _reports
                });
            });

            return getAllDataPromise.promise;
        };

        this.getCampaignData = function(advertiserId) {
            var promise = $q.defer();

            $q.all([campaignPromise.promise]).then(function() {
                if (advertiserId) {
                    promise.resolve($filter('filter')(_campaigns, {advertiser_id: advertiserId}, true));
                    return;
                }
                promise.resolve(_campaigns);
            });

            return promise.promise;
        };

        this.getAdvertiserData = function(id) {
            var promise = $q.defer();

            $q.all([advertisersPromise.promise]).then(function() {
                if (id) {
                    promise.resolve($filter('filter')(_advertisers, {id: id}, true));
                    return;
                }
                promise.resolve(_advertisers);
            });

            return promise.promise;
        };

        this.getReportData = function(campaignId) {
            var promise = $q.defer();
            $q.all([reportsPromise.promise]).then(function() {
                if (campaignId) {
                    promise.resolve($filter('filter')(_reports, {campaign_id: campaignId}, true));
                    return;
                }
                promise.resolve(_reports);
            });

            return promise.promise;
        };

        function init() {
            getAdvertisers();
            getCampaigns();
            getReports();
        }

        function getData(url, callback) {
            httpService.httpGet(url).then(callback, function(error) {
                console.log('error! ', error);
            });
        }

        function getAdvertisers() {
            getData('data/advertisers.json', function(data) {
                _advertisers = parserService.parseAdvertisers(data.data);
                advertisersPromise.resolve();
            });
        }

        function getCampaigns() {
            getData('data/campaigns.json', function(data) {
                _campaigns = parserService.parseCampaigns(data.data);
                campaignPromise.resolve();
            });
        }

        function getReports() {
            getData('data/reports.json', function(data) {
                _reports = parserService.parseReports(data.data);
                reportsPromise.resolve();
            });
        }
        init();
    });
})(window.angular);
