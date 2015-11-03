(function() {
  'use strict';
  
  angular
    .module('users')
    .factory('Authenticate', Authenticate);
  
  //Authenticate.$inject = [];
    
  function Authenticate() {
    this.user = window.user;
    
    return {
      user: this.user
    };
  }
})();