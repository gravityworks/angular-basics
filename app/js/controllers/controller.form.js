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
            vm.contact = {
                state : vm.states[0],
                preferredMethod : vm.contactMethod[0]
            };
        };

        vm.addNewContact = function() {
            //TODO: Store New Contact
            vm.contact.preferredMethod = vm.contact.preferredMethod.value;
            vm.contact.state = vm.contact.state.value;
            $rootScope.contacts.push(vm.contact);
            vm.contact = null;
        };

        vm.getAllContacts = function() {
            vm.contacts = $rootScope.contacts;
        };

        vm.displayContactMethod = function(val) {
            return _.find(vm.contactMethod, { value : val }).label;
        };

        vm.onContactClick = function(row) {
            vm.contact = angular.copy(row);
            vm.contact.state = _.find(vm.states, { value : row.state });
            vm.contact.preferredMethod = _.find(vm.contactMethod, { value : row.preferredMethod });
        };

        // Get all the contacts
        vm.getAllContacts();
    }

})();
