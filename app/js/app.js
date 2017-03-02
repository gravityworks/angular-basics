(function() {
    'use strict';

    var myApp = angular.module('myApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch', 'ui.router', 'ui.mask']);

    myApp.config(function ($stateProvider, $urlRouterProvider, $logProvider) {
        $logProvider.debugEnabled(false);
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
            url : '/home',
            templateUrl : './views/home.html',
            controller : 'homeCtrl as ctrl',
            data : { pageTitle : 'Home' }
        }).state('form', {
            url : '/form',
            templateUrl : './views/form.html',
            controller : 'formCtrl as ctrl',

            data : { pageTitle : 'Form Example' }
        });
    }).constant('CONST', {
        CONFIG : {
            STATES: [
                {
                    value : null,
                    label : 'Select One...'
                }, {
                    value : 'AL',
                    label : 'Alabama'
                }, {
                    value : 'AK',
                    label : 'Alaska'
                }, {
                    value : 'AZ',
                    label : 'Arizona'
                }, {
                    value : 'CA',
                    label : 'California'
                }, {
                    value : 'CO',
                    label : 'Colorado'
                }, {
                    value : 'CT',
                    label : 'Connecticut'
                }, {
                    value : 'DE',
                    label : 'Delaware'
                }, {
                    value : 'FL',
                    label : 'Florida'
                }, {
                    value : 'GA',
                    label : 'Gerogia'
                }, {
                    value : 'HI',
                    label : 'Hawaii'
                }, {
                    value : 'ID',
                    label : 'Idaho'
                }, {
                    value : 'IL',
                    label : 'Illinois'
                }, {
                    value : 'IN',
                    label : 'Indiana'
                }, {
                    value : 'IA',
                    label : 'Iowa'
                }, {
                    value : 'KS',
                    label : 'Kansas'
                }, {
                    value : 'KY',
                    label : 'Kentucky'
                }, {
                    value : 'LA',
                    label : 'Louisiana'
                }, {
                    value : 'ME',
                    label : 'Maine'
                }, {
                    value : 'MD',
                    label : 'Maryland'
                }, {
                    value : 'MA',
                    label : 'Massachusetts'
                }, {
                    value : 'MI',
                    label : 'Michigan'
                }, {
                    value : 'MN',
                    label : 'Minnesota'
                }, {
                    value : 'MS',
                    label : 'Mississipps'
                }, {
                    value : 'MO',
                    label : 'Missouri'
                }, {
                    value : 'MT',
                    label : 'Montana'
                }, {
                    value : 'NE',
                    label : 'Nebrasks'
                }, {
                    value : 'NV',
                    label : 'Nevada'
                }, {
                    value : 'NH',
                    label : 'New Hampshire'
                }, {
                    value : 'NJ',
                    label : 'New Jersey'
                }, {
                    value : 'NM',
                    label : 'New Mexico'
                }, {
                    value : 'NY',
                    label : 'New York'
                }, {
                    value : 'NC',
                    label : 'North Carolina'
                }, {
                    value : 'ND',
                    label : 'North Dakota'
                }, {
                    value : 'OH',
                    label : 'Ohio'
                }, {
                    value : 'OK',
                    label : 'Oklahoma'
                }, {
                    value : 'OR',
                    label : 'Oregon'
                }, {
                    value : 'PA',
                    label : 'Pennsylvania'
                }, {
                    value : 'RI',
                    label : 'Rhode Island'
                }, {
                    value : 'SC',
                    label : 'South Carolina'
                }, {
                    value : 'SD',
                    label : 'South Dakota'
                }, {
                    value : 'TN',
                    label : 'Tennessee'
                }, {
                    value : 'TX',
                    label : 'Texas'
                }, {
                    value : 'UT',
                    label : 'Utah'
                }, {
                    value : 'VT',
                    label : 'Vermont'
                }, {
                    value : 'VA',
                    label : 'Virginia'
                }, {
                    value : 'WA',
                    label : 'Washington'
                }, {
                    value : 'WV',
                    label : 'West Virginia'
                }, {
                    value : 'WI',
                    label : 'Wisconsin'
                }, {
                    value : 'WY',
                    label : 'Wyoming'
                }
            ],
            CONTACT_METHOD : [
                {
                    value : null,
                    label : 'Select One...'
                }, {
                    value : 'email',
                    label : 'Email'
                }, {
                    value : 'phone',
                    label : 'Phone'
                }, {
                    value : 'mail',
                    label : 'US Mail'
                }, {
                    value : 'smoke',
                    label : 'Smoke Signals'
                }
            ]
        }
    }).directive('format', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link : function (scope, elem, attrs, ctrl) {
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

        $rootScope.dummyData = {
            name : 'John Smith',
            email : 'john.smith@email.com',
            phone : '5174812218',
            address1 : '1132 N. Washington',
            address2 : '',
            city : 'Lansing',
            state : 'MI',
            zip : 48906,
            preferredMethod : 'email'
        };

        $rootScope.contacts = [{
            name : 'Scott Engemann',
            email : 'scott.engemann@gravityworksdesign.com',
            phone : '6169149293',
            address1 : '1780 Pinnacle Dr SW',
            address2 : '',
            city: 'Wyoming',
            state : 'MI',
            zip : 49519,
            preferredMethod : 'smoke'
        }];

        $rootScope.$on('$stageChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $log.info('$stateChangeStart:', toState);
        });

        $rootScope.$on('$stageChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $log.info('$stateChangeSuccess:', toState);
            $rootScope.$state = toState;
        });
    });

})();
