(function() {
    'use strict';

    angular.module('myApp').controller('headerCtrl', headerController);
    headerController.$inject = ['$log'];

    function headerController($log) {
        var vm = this;
        $log.info('::headerController');

        vm.menu = [
            {
                route : 'home',
                label : 'Home',
                icon : null
            }
        ];
    }

})();
