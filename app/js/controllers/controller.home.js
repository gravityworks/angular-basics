(function() {
    'use strict';

    angular.module('myApp').controller('homeCtrl', homeController);
    homeController.$inject = ['$log'];

    function homeController($log) {
        var vm = this;
        $log.info('::HomeController');
    }

})();