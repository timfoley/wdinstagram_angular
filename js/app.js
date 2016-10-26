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
  .factory("GramFactory", [
    "$resource",
    GramFactoryFunction
  ])
  .controller("GramIndexController", [
    "GramFactory",
    "$state",
    GramIndexControllerFunction
  ])
  .controller("GramShowController", [
    "GramFactory",
    "$stateParams",
    "$state",
    GramShowControllerFunction
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

  function GramIndexControllerFunction( GramFactory, $state ){
    this.grams = GramFactory.query();
    this.newGram = new GramFactory();
    this.create = function() {
      this.newGram.$save()
      this.newGram = {}
      $state.go("gramIndex", {}, {reload: true})
    }
  }

  function GramShowControllerFunction( GramFactory, $stateParams, $state ){
    this.gram = GramFactory.get({id: $stateParams.id})
    this.update = function(){
      this.gram.$update({id: $stateParams.id})
    }
    this.destroy = function(){
      this.gram.$delete({id: $stateParams.id})
      $state.go("gramIndex", {}, {reload: true})
    }
  }

  function GramFactoryFunction( $resource ){
    //    return $resource( "http://localhost:3000/grumbles/:id", {}, {
    //     update: { method: "PUT" }
    // });
    return $resource( "http://localhost:3000/entries/:id", {}, {
      update: {method: "PUT"}
    } );
  }

})();
