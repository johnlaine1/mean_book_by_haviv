(function() {
  'use strict';
  
  angular
    .module('articles')
    .controller('ArticlesController');
    
  ArticlesController.$inject = ['$scope', '$routeparams', '$location', 'Authentication', 'Articles'];
  
  function ArticlesController($scope, $routeparams, $location, Authentication, Articles) {
    var vm = this;
    
    vm.authentication = Authentication;
    vm.create = create;
    
    ///////////////
    
    function create() {
      var article = new Articles({
        title: this.title,
        content: this.content
      });
      
    }
  }
});