(function(){
	
	"use strict";	
	var app =angular.module("MyApp",["ngRoute","MyCtrls"])
		.controller("AppCtrl",["$scope",function($scope){
			
		}])
		.config(["$routeProvider",function($routeProvider){
			$routeProvider
				.when("/",{
					templateUrl: "app/home/_home.html",
					controller: "HomeCtrl"
				});
	}]);
	
})();
