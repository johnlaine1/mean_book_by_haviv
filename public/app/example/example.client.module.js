(function() {
  'use strict';
  
  angular
    .module('example', [])
    .config(configuration)
    
      configuration.$inject = ['$routeProvider'];
      
      function configuration($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'app/example/views/example.client.view.html'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
})();
