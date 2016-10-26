"use strict";

(function(){
  angular.module("wdinstagram", [
    "ngResource",
    "ui.router"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("GramIndexController", [
    "GramFactory",
    GramIndexControllerFunction
  ])
  .controller("GramShowController", [
    "GramFactory",
    "$stateParams",
    GramShowControllerFunction
  ])
  .factory("GramFactory", [
    "$resource",
    GramFactoryFunction
  ])




  function RouterFunction($stateProvider){
    $stateProvider
    .state("gramIndex", {
      url: "/",
      templateUrl: "js/ng-views/index.html",
      controller: "GramIndexController",
      controllerAs: "vm"
    })
    .state("gramShow", {
      url: "/photos/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "GramShowController",
      controllerAs: "vm"
    })

  }

  function GramIndexControllerFunction( GramFactory ){
    this.grams = GramFactory.query();
  }

  function GramShowControllerFunction( GramFactory, $stateParams ){
    this.gram = GramFactory.get({id: $stateParams.id})
  }

  function GramFactoryFunction( $resource ){
    return $resource( "http://localhost:3000/entries/:id" );
  }

})();
