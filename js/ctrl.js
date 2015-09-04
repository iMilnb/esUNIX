var esUNIX = angular.module('esUNIX', ["ngSanitize"]);

esUNIX.controller('contentCtrl', function($scope, $parse, $http, $rootScope) {

    $http.get('content/index_' + $scope.lang + '.yaml')
    .success(function(response) {
        angular.forEach(jsyaml.load(response), function(v, k) {
            if (k.startsWith('md_') == true) {
                $parse('md.' + k.substring(3)).assign($scope, marked(v));
            } else {
                $parse(k).assign($scope, v);
            }
            if (k == 'title') {
                $rootScope.pageTitle = v;
            }
        });
    });
})
