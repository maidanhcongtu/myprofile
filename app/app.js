(function(){
	
	"use strict";	
	var app =angular.module("MyApp",[
			"ngRoute",
			"pascalprecht.translate",
			"ngCookies",
			"MyCtrls"
		])
		.controller("AppCtrl",["$scope",function($scope){

			//create canvas for show level skill
			$scope.loadLevelSkill = function(){
				var c = document.getElementById("phpSkill");
				var ctx = c.getContext("2d");
	        	ctx.beginPath();
				ctx.arc(95, 50, 70, 0, 1.5*Math.PI);
				ctx.stroke();
			}
			
			/*$scope.$on('$includeContentLoaded', function(event, target){
				
	        });*/

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
