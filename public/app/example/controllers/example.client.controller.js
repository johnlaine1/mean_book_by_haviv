(function() {
  'use strict';
  
  angular
    .module('example')
    .controller('ExampleController', ExampleController);
    
    ExampleController.$inject = ['$scope', 'Authenticate'];
    
    function ExampleController($scope, Authenticate) {
      var vm = this;
      
      vm.name = (Authenticate.user) ? ('Welcome ' + Authenticate.user.fullName) : ('Please Login to my MEAN application');
    }
    
})();