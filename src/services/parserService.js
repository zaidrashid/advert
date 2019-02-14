(function ($angular) {
    $angular.module('dashboard').factory('parserService', function (
    ) {
        function parseAdvertisers(rawData) {
            var data = [];

            if (!isValidData(rawData)) {
                return data;
            }

            for (var i = 0; i < rawData.length; i++) {
                var temp = rawData[i];
                data.push({
                    id: parseInt(temp.id, 10),
                    name: temp.name
                });
            }

            return data;
        }

        function parseReports(rawData) {
            if (!isValidData(rawData)) {
                return data;
            }

            var data = [];

            for (var i = 0; i < rawData.length; i++) {
                var temp = rawData[i];
                data.push({
                    advertiser_id: parseInt(temp.advertiser_id, 10),
                    campaign_id: parseInt(temp.campaign_id, 10),
                    date: temp.date,
                    impressions: parseInt(temp.impressions, 10),
                    clicks: parseInt(temp.clicks, 10),
                    installs: parseInt(temp.installs, 10),
                    cost_micros: parseInt(temp.cost_micros, 10) / 1000000
                });
            }

            return data;
        }

        function parseCampaigns(rawData) {
            if (!isValidData(rawData)) {
                return data;
            }

            var data = [];
            for (var i = 0; i < rawData.length; i++) {
                var temp = rawData[i];
                data.push({
                    id: parseInt(temp.id, 10),
                    advertiser_id: parseInt(temp.advertiser_id, 10),
                    name: temp.name,
                    start_date: temp.start_date,
                    end_date: temp.end_date,
                    cost: temp.cost,
                    cost_model: temp.cost_model
                });
            }

            return data;
        }

        function isValidData(data) {
            return Array.isArray(data);
        }


        return {
            parseAdvertisers: parseAdvertisers,
            parseReports: parseReports,
            parseCampaigns: parseCampaigns
        };
    });
})(window.angular);
