angular.module('newsApp').service('NewsService', ['$http', function($http){
	
	 this.getNewsBySearchKey = function(searchKey){
		var myurl = "getNewsBySearchKey";
		 var promise = $http({
		        method : "GET",
		        url : myurl,
		        params: {key:searchKey}
		    }).then(function(response) {
		    	console.log(response.data);
		        return response.data;
		    });
		 
		 return promise;
	}
	
	this.getCountries = function(){
		 var promise = $http({
		        method : "GET",
		        url : "countries.json"
		    }).then(function(response) {
		    	console.log(response.data);
		        return response.data;
		});
		
		return promise;
	}
		
	
}]);