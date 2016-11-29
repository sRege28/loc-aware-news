angular.module('newsApp').service('NewsService', ['$http', function($http){
	
	 this.getNewsBySearchKey = function(searchKey){
		 var promise = $http({
		        method : "GET",
		        url : "/getNewsAndTweetsByKeyword",
		        params: {keyword:searchKey}
		    }).then(function(response) {
		        return response.data;
		    });
		 
		 return promise;
	}
	
	this.getCountries = function(){
		 var promise = $http({
		        method : "GET",
		        url : "/getCountries"
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}
	
	this.getNewsForCountry = function(geo){
		
		 var promise = $http({
		        method : "POST",
		        url : "/getNewsAndTweetsInCountry",
				params: {geometry:geo}
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}
	
	this.getTrendingNews = function(){
		 var promise = $http({
		        method : "GET",
		        url : "/getTrendingNewsAndTweets"
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}	
	
}]);