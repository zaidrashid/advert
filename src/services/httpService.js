(function($angular) {
    $angular.module('dashboard').factory('httpService', function(
        $http,
        $q
    ) {
        function httpGet(url) {
            var promise = $q.defer();
            $http({
                method: 'GET',
                url: url
            }).then(function(data) {
                promise.resolve(data);
            }, function(err) {
                promise.reject(err);
            });

            return promise.promise;
        }

        return {
            httpGet: httpGet
        };
    });
})(window.angular);
