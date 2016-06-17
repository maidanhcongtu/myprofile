(function(){
	
	"use strict";	
	var app =angular.module("MyApp",[
			"ngRoute",
			"pascalprecht.translate",
			"ngCookies",
			"MyCtrls"
		])
		.controller("AppCtrl",["$scope","$interval","$timeout",function($scope, $interval, $timeout){

			//create canvas for show level skill
			$scope.loadLevelSkill = function(){
				
				runLevel();

				function runLevel() {
					levelJava();
					levelPHP();
					levelCSS();
				}

				function levelJava() {
					drawProgress("javaSkill");
				};

				function levelPHP() {
					drawProgress("phpSkill");
				};

				function levelCSS() {
					drawProgress("cssSkill");
				};

				function drawProgress(idCanvas) {
					var percent = parseInt(angular.element("#" + idCanvas).attr("data-percent"));
					var process = 0.1;
					var c = document.getElementById(idCanvas);
					var ctx = c.getContext("2d");
					
					//ctx.beginPath();
					ctx.arc(114, 114, 100, 0, 2*Math.PI);
					ctx.lineWidth = 28;
					ctx.strokeStyle = "rgba(40, 40, 40, 0.5)";
					ctx.stroke();

					var stop = $interval(function(){
						process+=0.03;
						//process = 2 -> 100%
						//currently= process*50
						var realPercent = Math.round(process*50*100)/100;
						angular.element("#" + idCanvas).parent().find(".value-percent").text(realPercent);

			        	ctx.beginPath();
						ctx.lineWidth = 24;
						ctx.strokeStyle = "#ff675f";
						ctx.lineCap = "round";
						ctx.shadowBlur = 1.5;
						ctx.shadowColor = "#ff675f";
						ctx.arc(114, 114, 100, 1.5*Math.PI, 1.5*Math.PI + process*Math.PI);
						ctx.stroke();
						if(process >= 2*(percent/100)) {
							$interval.cancel(stop);
							stop = undefined;
						}
					}, 10)

				}
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
