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
