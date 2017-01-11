(function() {
    'use strict';

    var myApp = angular.module('myApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch', 'ui.router']);

    myApp.config(function ($stateProvider, $urlRouterProvider, $logProvider) {
        $logProvider.debugEnabled(true);
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
            url : '/home',
            templateUrl : './views/home.html',
            controller : 'homeCtrl as ctrl',
            data : { pageTitle : 'Home' }
        });
    }).directive('format', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue)
                });

                elem.bind('blur', function (event) {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber));
                });
            }
        };
    }]).filter('tel', function () {
        return function (tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });

    myApp.run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.$on('$stageChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $log.info('$stateChangeStart:', toState);
        });

        $rootScope.$on('$stageChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $log.info('$stateChangeSuccess:', toState);
            $rootScope.$state = toState;
        });
    });

})();
