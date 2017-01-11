(function() {
    'use strict';

    angular.module('myApp').controller('formCtrl', FormController);
    FormController.$inject = ['$rootScope', 'CONST', '$log'];

    function FormController($rootScope, CONST, $log) {
        var vm = this;
        vm.contacts = [];
        vm.contact = null;
        vm.states = CONST.CONFIG.STATES;
        vm.contactMethod = CONST.CONFIG.CONTACT_METHOD;

        //TODO: Add form var to initialize

        $log.info('::FormController');

        vm.createNewContact = function() {
            vm.contact = {}
        };

        vm.addNewContact = function() {
            //TODO: Store New Contact
        };

        vm.getAllContacts = function() {
            vm.contacts = $rootScope.contacts;
        };

        vm.onContactClick = function(row) {
            vm.contact = row;
        };

        // Get all the contacts
        vm.getAllContacts();
    }

})();
