(function() {
  'use strict';

  angular
    .module('mean', [
      'ngResource',
      'ngRoute',
      'users',
      'example',
      'articles'
      ])
      
    .config(configuration);
    
    configuration.$inject = ['$locationProvider'];
    
    if (window.location.hash === '#_=_') {
      window.location.hash = '#!';
    }
    
    function configuration($locationProvider) {
      $locationProvider.hashPrefix('!');
    }
    
    
})();


