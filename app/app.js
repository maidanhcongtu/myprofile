(function(){
	
	"use strict";	
	var app =angular.module("MyApp",[
			"ngRoute",
			"pascalprecht.translate",
			"ngCookies",
			"MyCtrls"
		])
		.controller("AppCtrl",["$scope",function($scope){
			
		}])
		.config(["$routeProvider",function($routeProvider){
			$routeProvider
				.when("/",{
					templateUrl: "app/views/home/_home.html",
					controller: "HomeCtrl"
				});
		}])
		.config(["$translateProvider", function($translateProvider){
			
			$translateProvider.useStaticFilesLoader({
				prefix:"app/asserts/languages/",
				suffix:".json"
			})
			
			$translateProvider.preferredLanguage("en");
			$translateProvider.useLocalStorage();
			
		}]);
		
})();
