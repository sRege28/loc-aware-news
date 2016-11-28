angular.module('newsApp').controller('AnalyticsController', [ '$scope','AnalyticsService', function($scope, AService) {

	function init(){
		AService.getCountryVsNewsCount().then(function(res) {
				if (res != null) {
				   console.log(res);
				} else {
					console.log("Error");
				}
		});
	}
	init();


}]);

/*
google.load('visualization', '1', {
  packages: ['corechart','bar']
});
*/