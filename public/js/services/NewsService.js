angular.module('newsApp').service('NewsService', ['$http', function($http){
	
	 this.getNewsBySearchKey = function(searchKey){
		 var promise = $http({
		        method : "GET",
		        url : "/getNewsByKeyword",
		        params: {keyword:searchKey}
		    }).then(function(response) {
		    	console.log(response.data);
		        return response.data;
		    });
		 
		 return promise;
	}
	
	this.getCountries = function(){
		 var promise = $http({
		        method : "GET",
		        url : "/getCountries"
		    }).then(function(response) {
		    	console.log(response.data);
		        return response.data;
		});
		
		return promise;
	}
	
	this.getNewsForCountry = function(geo){
		
		 var promise = $http({
		        method : "POST",
		        url : "/getNewsInCountry",
				params: {geometry:geo}
		    }).then(function(response) {
		    	console.log(response.data);
		        return response.data;
		});
		
		return promise;
	}
		
	
}]);