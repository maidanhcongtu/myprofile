(function(){
	
	"use strict";	
	var app =angular.module("MyApp",[
			"ngRoute",
			"pascalprecht.translate",
			"ngCookies",
			"MyCtrls"
		])
		// .run(["$http",function($http){
		// 	$http.defaults.headers.post = {
		// 		"Content-type":"application/x-www-form-urlencoded"
		// 	}
		// }])
		.controller("AppCtrl",["$scope","$interval","$timeout","$location","$anchorScroll","$http",function($scope, $interval, $timeout, $location, $anchorScroll, $http){

			$scope.version = new Date().getTime();
			$scope.templateHeaderUrl = "app/views/partials/header/_header.html?v=" + $scope.version;
			$scope.templateInfoPersonUrl = "app/views/partials/info-person/_info-person.html?v=" + $scope.version;
			$scope.templateAboutMeUrl = "app/views/partials/about-me/_about-me.html?v=" + $scope.version;
			$scope.templateSkillLevelUrl = "app/views/partials/skill-level/_skill-level.html?v=" + $scope.version;
			$scope.templateResumeUrl = "app/views/partials/resume/_resume.html?v=" + $scope.version;
			$scope.templateProjectUrl = "app/views/partials/project/_project.html?v=" + $scope.version;
			$scope.templateContactUrl = "app/views/partials/contact/_contact.html?v=" + $scope.version;

			//create object contact
		  	$scope.contact = {};

		  	//flag clicked on submit
		  	$scope.submited = false;
		  	//first clicked
		  	$scope.clicked = false;

		  	$scope.sendContact = function(frm) {
		  		if(frm.$valid) {
		  			$scope.submited = true;
		  			//make a http request to send email
		  			$http.post("http://localhost/servermyprofile/index.php?XDEBUG_SESSION_START=sublime.xdebug", $.param($scope.contact)
		  				//,
		  				 //{headers:{"Content-type":"application/x-www-form-urlencoded"}}
		  				 )
		  				.then(function(data){
		  					console.log(data);
		  					$scope.clicked = false;
		  				}, function(){
		  					console.log("ok biet luon");
		  					$scope.clicked = false;
		  				})

		  				//php
		  		// 		<?php 
						// 	header('Access-Control-Allow-Origin: *'); 
						// 	header("Access-Control-Allow-Headers: accept, content-type");
						// 	if(isset($_POST['name'])) {
						// 		echo json_encode("you already post data");
						// 	} else {
						// 		echo json_encode("bo tay roi do nhe");
						// 	}
						// ?>
		  		}
		  	}

		  	$scope.$on('$viewContentLoaded', function(){

		  	});
			$scope.$on('$includeContentLoaded', function(){
				var locationHash = $location.hash();
			    if(locationHash !== "" ) {
			    	if(angular.element("#" + locationHash).length>0){
						goToElement("#" + locationHash);
			    	}
				}
		  	});
			

			$scope.goto = function(where){
				goToElement("#"+where);				
				$location.hash(where);
				//$anchorScroll();
			}

			function goToElement(id) {
				angular.element("html, body").animate({
					scrollTop: angular.element(id).offset().top
				},500);
			}

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
						process+=0.1;
						//process = 2 -> 100%
						//currently= process*50
						var realPercent = Math.round(process*50*100)/100;
						angular.element("#" + idCanvas).parent().find(".value-percent").text(realPercent+"%");

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
					}, 1)

				}
			}

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
			
		}])
		.config(["$httpProvider",function($httpProvider){
			$httpProvider.defaults.headers.post = {
				"Content-type":"application/x-www-form-urlencoded"
			}
		}])
		
})();
