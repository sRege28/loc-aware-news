// public/js/app.js
var newsApp = angular.module('newsApp', ['ngRoute', 'ui-leaflet','ngSanitize', 'ui.select', 'ui.bootstrap']);
newsApp.config(function($routeProvider, $httpProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/news.html',
            controller: 'NewsController'
        })
        // news page that will use the NewsController
         .when('/analytics', {
            templateUrl: 'views/analytics.html',
            controller: 'AnalyticsController'
        }) .otherwise({
			redirectTo: '/'
		});

});