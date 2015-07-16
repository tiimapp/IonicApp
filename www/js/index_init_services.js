/* --------------
 initialization 
  the xdkFilter argument can be set to a function that
   receives the data of the service method and can return alternate data
   thus you can reformat dates or names, remove or add entries, etc.
   -------------- */

var app_q = angular.module('myApp', ['ionic', 'ngResource']).config(['$controllerProvider', '$stateProvider', '$urlRouterProvider', function ($controllerProvider, $stateProvider, $urlRouterProvider) {
    $controllerProvider.allowGlobals();
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('tabs.facts', {
            url: "/facts",
            views: {
                'home-tab': {
                    templateUrl: "templates/facts.html"
                }
            }
        })
        .state('tabs.facts2', {
            url: "/facts2",
            views: {
                'home-tab': {
                    templateUrl: "templates/facts2.html"
                }
            }
        })
        .state('tabs.about', {
            url: "/about",
            views: {
                'about-tab': {
                    templateUrl: "templates/about.html"
                }
            }
        })
        .state('tabs.navstack', {
            url: "/navstack",
            views: {
                'about-tab': {
                    templateUrl: "templates/nav-stack.html"
                }
            }
        })
        .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "templates/contact.html"
                }
            }
        });


    $urlRouterProvider.otherwise("/tab/home");
}]).factory('employeeService', ['$http', function ($http, $scope) {

       
    var employeeService = {};
    employeeService.getEmployees = function ($scope) {

              
        return $http({           
            method: "GET",

                       url: "http://webservices.chnuat.mktest.com/wechat/HelloWorld/Get/tim",

                       headers: {
                'Content-Type': 'application/json'
            }


                   
        }, {
            timeout: 150
        }).success(function (data) {

                    
            $timeout.cancel(timeoutPromise);
            console.log(data);   
            return data;

                       
            //alert('succeed' + data);


                   
        }).error(function (data, status, headers, config) {
            alert('network error');
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })

           
    };
    return employeeService;
}]);

app_q.controller('HomeTabCtrl', ['$scope', '$resource', 'employeeService', function ($scope, $resource, employeeService) {


    $scope.showMessage = function () {

        alert('talking to web service....');
        $scope.m = employeeService.getEmployees();
        $scope.m.then(
            function (answer) {
                $scope.u = answer.data.WelCome;
            },
            function (error) {
                // report something
            },
            function (progress) {
                // report progress
            });
        console.log('m');
        console.log($scope.m);
        //$scope.apply();

    };

    }]);